import React, { useEffect } from 'react';
import { Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWalletStore } from '../../store/useWalletStore';
import { useAppStore } from '../../store/useAppStore';

export const CreditBadge: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userId = useAppStore((state) => state.user?.id);
  const { balance, status, fetchWallet } = useWalletStore();

  useEffect(() => {
    if (userId && status === 'idle') void fetchWallet();
  }, [fetchWallet, status, userId]);

  return (
    <button
      type="button"
      onClick={() => navigate('/wallet')}
      className="inline-flex items-center gap-1 rounded-xl border border-[#D5EEDC] bg-[#F4FAF5] px-2 py-1.5 text-xs font-bold text-[#132E1E] hover:bg-white"
      aria-label={t('wallet.open')}
      title={t('wallet.open')}
    >
      <Coins className="h-3.5 w-3.5 text-[#EFA131]" />
      {userId && status === 'ready' && balance !== null ? balance : '—'}
    </button>
  );
};
