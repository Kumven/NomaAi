import { create } from 'zustand';
import { getWallet, type WalletResponse } from '../services/api';

type WalletStatus = 'idle' | 'loading' | 'ready' | 'error';

interface WalletState {
  balance: number | null;
  status: WalletStatus;
  error: string | null;
  isTopUpModalOpen: boolean;
  fetchWallet: () => Promise<WalletResponse | null>;
  clearWallet: () => void;
  openTopUpModal: () => void;
  closeTopUpModal: () => void;
}

let walletRequest: Promise<WalletResponse | null> | null = null;
let walletRequestGeneration = 0;

export const useWalletStore = create<WalletState>((set) => ({
  balance: null,
  status: 'idle',
  error: null,
  isTopUpModalOpen: false,
  fetchWallet: () => {
    if (walletRequest) return walletRequest;
    set({ status: 'loading', error: null });
    const generation = ++walletRequestGeneration;
    const request = getWallet()
      .then((wallet) => {
        if (generation !== walletRequestGeneration) return null;
        set({ balance: wallet.balance, status: 'ready', error: null });
        return wallet;
      })
      .catch((error: unknown) => {
        if (generation !== walletRequestGeneration) return null;
        const message = error instanceof Error ? error.message : 'Unable to load wallet.';
        set({ status: 'error', error: message });
        return null;
      })
      .finally(() => {
        if (walletRequest === request) walletRequest = null;
      });
    walletRequest = request;
    return request;
  },
  clearWallet: () => {
    walletRequestGeneration += 1;
    walletRequest = null;
    set({ balance: null, status: 'idle', error: null });
  },
  openTopUpModal: () => set({ isTopUpModalOpen: true }),
  closeTopUpModal: () => set({ isTopUpModalOpen: false })
}));
