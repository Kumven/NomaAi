import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SupportedLanguage } from '../types';
import i18n from '../i18n/config';

interface AppState {
  language: SupportedLanguage;
  activeState: string;
  isOffline: boolean;
  isMockActive: boolean;
  fontSize: 'normal' | 'large';
  setLanguage: (lang: SupportedLanguage) => void;
  setActiveState: (state: string) => void;
  setIsOffline: (status: boolean) => void;
  toggleMockMode: () => void;
  setFontSize: (size: 'normal' | 'large') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: (localStorage.getItem('nomaai_language') as SupportedLanguage) || 'en',
      activeState: 'Kano',
      isOffline: !navigator.onLine,
      isMockActive: true,
      fontSize: 'normal',
      setLanguage: (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('nomaai_language', lang);
        set({ language: lang });
      },
      setActiveState: (state) => set({ activeState: state }),
      setIsOffline: (status) => set({ isOffline: status }),
      toggleMockMode: () => set((state) => ({ isMockActive: !state.isMockActive })),
      setFontSize: (size) => set({ fontSize: size })
    }),
    {
      name: 'nomaai_app_settings'
    }
  )
);
