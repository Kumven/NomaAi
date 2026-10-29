import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useWalletStore } from '../../store/useWalletStore';
import { useAppStore } from '../../store/useAppStore';

export const TopUpModal: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isTopUpModalOpen, closeTopUpModal } = useWalletStore();
  const isOffline = useAppStore((state) => state.isOffline);

  if (!isTopUpModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#132E1E]/60 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="top-up-title"
        className="w-full max-w-sm space-y-4 rounded-3xl border border-[#D5EEDC] bg-white p-6 shadow-2xl"
      >
        <h2 id="top-up-title" className="text-lg font-bold text-[#132E1E]">
          {t('wallet.lowBalanceTitle')}
        </h2>
        <p className="text-sm text-[#526056]">{t(isOffline ? 'wallet.offline' : 'wallet.lowBalanceBody')}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={closeTopUpModal}
            className="flex-1 rounded-xl border border-[#D5EEDC] px-3 py-2 text-sm font-bold text-[#132E1E]"
          >
            {t('common.cancel')}
          </button>
          <button
            type="button"
            disabled={isOffline}
            onClick={() => {
              closeTopUpModal();
              navigate('/wallet');
            }}
            className="flex-1 rounded-xl bg-[#F3A83B] px-3 py-2 text-sm font-bold text-[#161513] disabled:opacity-50"
          >
            {t('wallet.topUp')}
          </button>
        </div>
      </div>
    </div>
  );
};
