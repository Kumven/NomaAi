import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Coins, RefreshCw } from 'lucide-react';
import { initializePayment, getWalletTransactions, type WalletTransaction } from '../services/api';
import { MINIMUM_TOP_UP_NAIRA, PLACEHOLDER_TOP_UP_BUNDLES } from '../config/pricing';
import { useWalletStore } from '../store/useWalletStore';
import { useAppStore } from '../store/useAppStore';

interface PaystackWindow extends Window {
  PaystackPop?: {
    setup: (options: {
      key: string;
      email: string;
      amount: number;
      ref: string;
      currency: string;
      onClose: () => void;
      callback: (response: { reference: string }) => void;
    }) => { openIframe: () => void };
  };
}

type PaymentState = 'idle' | 'initializing' | 'confirming' | 'confirmed' | 'timeout' | 'error';
let paystackScriptPromise: Promise<void> | null = null;

export const WalletPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const accountEmail = useAppStore((store) => store.user?.email || '');
  const { balance, status, error, fetchWallet } = useWalletStore();
  const isOffline = useAppStore((store) => store.isOffline);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [transactionsError, setTransactionsError] = useState('');
  const [amount, setAmount] = useState<number>(MINIMUM_TOP_UP_NAIRA);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentEmail, setPaymentEmail] = useState(accountEmail);
  const [paymentState, setPaymentState] = useState<PaymentState>('idle');
  const [paymentError, setPaymentError] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  const baselineBalance = useRef<number | null>(null);
  const confirmationStarted = useRef(false);
  const pollingGeneration = useRef(0);

  const loadTransactions = useCallback(async () => {
    setTransactionsError('');
    try {
      const result = await getWalletTransactions();
      setTransactions(result.transactions);
    } catch (loadError) {
      setTransactionsError(loadError instanceof Error ? loadError.message : t('wallet.transactionsError'));
    }
  }, [t]);

  const refreshWalletAndTransactions = useCallback(async () => {
    await fetchWallet();
    await loadTransactions();
  }, [fetchWallet, loadTransactions]);

  const confirmPayment = useCallback(async (reference: string) => {
    if (confirmationStarted.current) return;
    confirmationStarted.current = true;
    const generation = pollingGeneration.current + 1;
    pollingGeneration.current = generation;
    setPaymentReference(reference);
    setPaymentState('confirming');
    setPaymentError('');

    const initialBalance = baselineBalance.current ?? useWalletStore.getState().balance;
    if (baselineBalance.current === null) {
      baselineBalance.current = initialBalance;
    }

    for (let attempt = 0; attempt < 40; attempt += 1) {
      const wallet = await fetchWallet();
      if (pollingGeneration.current !== generation) return;
      if (wallet && initialBalance !== null && wallet.balance > initialBalance) {
        setPaymentState('confirmed');
        await loadTransactions();
        return;
      }

      try {
        const result = await getWalletTransactions();
        if (pollingGeneration.current !== generation) return;
        setTransactions(result.transactions);
        const confirmedTransaction = result.transactions.find(
          (transaction) => Boolean(reference) &&
            transaction.reference === reference &&
            transaction.status === 'completed'
        );
        if (confirmedTransaction && wallet) {
          setPaymentState('confirmed');
          return;
        }
      } catch {
        setTransactionsError(t('wallet.transactionsError'));
      }

      await new Promise((resolve) => window.setTimeout(resolve, 3000));
      if (pollingGeneration.current !== generation) return;
    }

    setPaymentState('timeout');
    confirmationStarted.current = false;
  }, [fetchWallet, loadTransactions, t]);

  useEffect(() => {
    window.setTimeout(() => void refreshWalletAndTransactions(), 0);
  }, [refreshWalletAndTransactions]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const reference = params.get('reference') || params.get('trxref');
    if (reference) window.setTimeout(() => void confirmPayment(reference), 0);
  }, [confirmPayment, location.search]);

  useEffect(() => () => {
    pollingGeneration.current += 1;
  }, []);

  const startPayment = async (requestedAmount: number) => {
    if (
      !Number.isFinite(requestedAmount) ||
      !Number.isInteger(requestedAmount) ||
      requestedAmount < MINIMUM_TOP_UP_NAIRA
    ) {
      setPaymentError(t('wallet.minimumError', { minimum: MINIMUM_TOP_UP_NAIRA }));
      return;
    }
    if (isOffline) {
      setPaymentError(t('wallet.offline'));
      return;
    }

    setPaymentError('');
    setPaymentState('initializing');
    baselineBalance.current = balance;
    try {
      const checkout = await initializePayment({
        amountNaira: requestedAmount,
        ...(paymentEmail.trim() ? { email: paymentEmail.trim() } : {})
      });
      if (checkout.checkoutUrl) {
        const checkoutWindow = window.open(checkout.checkoutUrl, '_blank');
        if (!checkoutWindow) {
          window.location.assign(checkout.checkoutUrl);
          return;
        }
        checkoutWindow.opener = null;
        setPaymentState('confirming');
        confirmationStarted.current = false;
        void confirmPayment(checkout.reference || '');
        return;
      }

      if (!checkout.reference) {
        throw new Error(t('wallet.checkoutMissing'));
      }
      const paystackWindow = window as PaystackWindow;
      const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string | undefined;
      if (!publicKey) {
        throw new Error(t('wallet.paystackUnavailable'));
      }
      if (!paystackWindow.PaystackPop) await loadPaystackScript();
      if (!paystackWindow.PaystackPop) throw new Error(t('wallet.paystackUnavailable'));
      const checkoutEmail = checkout.email || paymentEmail.trim();
      if (!checkoutEmail) {
        throw new Error(t('wallet.paymentEmailRequired'));
      }
      paystackWindow.PaystackPop.setup({
        key: publicKey,
        email: checkoutEmail,
        amount: checkout.amountKobo || requestedAmount * 100,
        ref: checkout.reference,
        currency: checkout.currency || 'NGN',
        onClose: () => setPaymentState('idle'),
        callback: (response) => {
          void confirmPayment(response.reference);
        }
      }).openIframe();
      setPaymentState('confirming');
    } catch (checkoutError) {
      setPaymentState('error');
      setPaymentError(checkoutError instanceof Error ? checkoutError.message : t('wallet.paymentError'));
    }
  };

  const retryWallet = async () => {
    await refreshWalletAndTransactions();
    if (paymentState === 'timeout' && paymentReference) {
      confirmationStarted.current = false;
      void confirmPayment(paymentReference);
    }
  };

  return (
    <div className="space-y-5 pb-12">
      <div className="space-y-1">
        <h1 className="flex items-center gap-2 text-2xl font-black text-[#132E1E]">
          <Coins className="h-6 w-6 text-[#EFA131]" />
          {t('wallet.title')}
        </h1>
        <p className="text-sm text-[#526056]">{t('wallet.subtitle')}</p>
      </div>

      <section className="space-y-3 rounded-3xl border border-[#D5EEDC] bg-white p-5">
        {isOffline && (
          <p role="status" className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">{t('wallet.offline')}</p>
        )}
        <div>
          <p className="text-xs font-bold uppercase text-[#526056]">{t('wallet.currentBalance')}</p>
          <p className="mt-1 text-3xl font-black text-[#132E1E]">
            {status === 'ready' && balance !== null ? t('wallet.creditCount', { count: balance }) : '—'}
          </p>
        </div>
        {(status === 'error' || error) && (
          <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800">{error}</p>
        )}
        {paymentState === 'confirming' && (
          <p role="status" className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
            {t('wallet.confirming', { reference: paymentReference })}
          </p>
        )}
        {paymentState === 'confirmed' && (
          <p role="status" className="rounded-xl bg-[#EAF7EE] p-3 text-sm text-[#1B4332]">{t('wallet.paymentConfirmed')}</p>
        )}
        {paymentState === 'timeout' && (
          <p role="status" className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">{t('wallet.confirmationTimeout')}</p>
        )}
        {(paymentError || paymentState === 'error') && (
          <div className="space-y-2">
            <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800">
              {paymentError || t('wallet.paymentError')}
            </p>
            <button
              type="button"
              onClick={() => void startPayment(customAmount ? Number(customAmount) : amount)}
              className="text-sm font-bold text-[#2D6A4F] underline"
            >
              {t('wallet.retryPayment')}
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => void retryWallet()}
          disabled={status === 'loading'}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D5EEDC] px-3 py-2 text-xs font-bold text-[#132E1E] disabled:opacity-50"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          {t('wallet.retry')}
        </button>
      </section>

      <section className="space-y-4 rounded-3xl border border-[#D5EEDC] bg-white p-5">
        <div>
          <h2 className="font-bold text-[#132E1E]">{t('wallet.topUp')}</h2>
          <p className="text-xs text-[#526056]">
            {t('wallet.minimum', { amount: MINIMUM_TOP_UP_NAIRA })}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {PLACEHOLDER_TOP_UP_BUNDLES.map((bundle) => (
            <button
              key={bundle}
              type="button"
              onClick={() => {
                setAmount(bundle);
                setCustomAmount('');
              }}
              className={`rounded-xl border px-2 py-3 text-sm font-bold ${
                amount === bundle && !customAmount
                  ? 'border-[#2D6A4F] bg-[#EAF7EE] text-[#132E1E]'
                  : 'border-[#D5EEDC] text-[#526056]'
              }`}
            >
              ₦{bundle}
            </button>
          ))}
        </div>
        <label className="block space-y-1 text-xs font-bold text-[#132E1E]">
          <span>{t('wallet.customAmount')}</span>
          <input
            type="number"
            min={MINIMUM_TOP_UP_NAIRA}
            value={customAmount}
            onChange={(event) => {
              setCustomAmount(event.target.value);
              if (event.target.value) setAmount(Number(event.target.value));
            }}
            className="h-11 w-full rounded-xl border border-[#D5EEDC] bg-[#F4FAF5] px-3 text-sm"
          />
        </label>
        <label className="block space-y-1 text-xs font-bold text-[#132E1E]">
          <span>{t('wallet.paymentEmail')}</span>
          <input
            type="email"
            autoComplete="email"
            value={paymentEmail}
            onChange={(event) => setPaymentEmail(event.target.value)}
            className="h-11 w-full rounded-xl border border-[#D5EEDC] bg-[#F4FAF5] px-3 text-sm"
          />
        </label>
        <button
          type="button"
          onClick={() => void startPayment(customAmount ? Number(customAmount) : amount)}
          disabled={isOffline || paymentState === 'initializing' || paymentState === 'confirming'}
          className="w-full rounded-xl bg-[#F3A83B] px-4 py-3 text-sm font-bold text-[#161513] disabled:opacity-50"
        >
          {paymentState === 'initializing' ? t('wallet.initializing') : t('wallet.continuePayment')}
        </button>
        <p className="text-[11px] leading-relaxed text-[#526056]">{t('wallet.premiumSoon')}</p>
      </section>

      <section className="space-y-3 rounded-3xl border border-[#D5EEDC] bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-[#132E1E]">{t('wallet.transactions')}</h2>
          <button
            type="button"
            onClick={() => void loadTransactions()}
            className="text-xs font-bold text-[#2D6A4F] underline"
          >
            {t('wallet.retry')}
          </button>
        </div>
        {transactionsError && <p role="alert" className="text-sm text-rose-800">{transactionsError}</p>}
        {transactions.length === 0 ? (
          <p className="text-sm text-[#526056]">{t('wallet.noTransactions')}</p>
        ) : (
          <ul className="divide-y divide-[#EDF7EF]">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                <div>
                  <p className="font-semibold text-[#132E1E]">{transaction.description}</p>
                  <p className="text-xs text-[#526056]">{new Date(transaction.createdAt).toLocaleString()}</p>
                </div>
                <span className="shrink-0 font-bold text-[#132E1E]">
                  {transaction.type === 'credit' ? '+' : '−'}{transaction.credits}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

function loadPaystackScript(): Promise<void> {
  const paystackWindow = window as PaystackWindow;
  if (paystackWindow.PaystackPop) return Promise.resolve();
  if (paystackScriptPromise) return paystackScriptPromise;
  paystackScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.dataset.paystackInline = 'true';
    script.onload = () => resolve();
    script.onerror = () => {
      paystackScriptPromise = null;
      script.remove();
      reject(new Error('Paystack checkout script failed to load.'));
    };
    document.body.appendChild(script);
  });
  return paystackScriptPromise;
}
