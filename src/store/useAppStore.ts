import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SupportedLanguage, UserProfile, LocationCoordinates } from '../types';
import i18n from '../i18n/config';
import { PLATEAU_STATE } from '../services/locationService';

interface AppState {
  language: SupportedLanguage;
  activeState: string;
  activeLga?: string;
  isOffline: boolean;
  isMockActive: boolean;
  fontSize: 'normal' | 'large';
  user: UserProfile | null;
  isAuthenticated: boolean;
  userLocation: LocationCoordinates | null;
  isLocationModalOpen: boolean;
  hasLocationPrompted: boolean;
  
  // Actions
  setLanguage: (lang: SupportedLanguage) => void;
  setActiveState: (state: string, lga?: string) => void;
  setIsOffline: (status: boolean) => void;
  toggleMockMode: () => void;
  setFontSize: (size: 'normal' | 'large') => void;
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
  setUserLocation: (coords: LocationCoordinates | null) => void;
  setIsLocationModalOpen: (open: boolean) => void;
  setHasLocationPrompted: (prompted: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: (localStorage.getItem('nomaai_language') as SupportedLanguage) || 'en',
      activeState: PLATEAU_STATE.state,
      activeLga: '',
      isOffline: !navigator.onLine,
      isMockActive: true,
      fontSize: 'normal',
      user: null,
      isAuthenticated: false,
      userLocation: null,
      isLocationModalOpen: false,
      hasLocationPrompted: false,

      setLanguage: (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('nomaai_language', lang);
        set({ language: lang });
      },
      setActiveState: (_state, lga) => set({
        activeState: PLATEAU_STATE.state,
        activeLga: PLATEAU_STATE.lgas.includes(lga || '') ? lga : ''
      }),
      setIsOffline: (status) => set({ isOffline: status }),
      toggleMockMode: () => set((state) => ({ isMockActive: !state.isMockActive })),
      setFontSize: (size) => set({ fontSize: size }),
      setUser: (user) => {
        const plateauUser: UserProfile | null = user
          ? {
              ...user,
              farmState: PLATEAU_STATE.state,
              farmLga: PLATEAU_STATE.lgas.includes(user.farmLga || '') ? user.farmLga : '',
              selectedPlan: user.selectedPlan === 'premium' ? 'premium' : 'free'
            }
          : null;
        set({
          user: plateauUser,
          isAuthenticated: !!plateauUser,
          activeState: PLATEAU_STATE.state,
          activeLga: plateauUser?.farmLga || ''
        });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      setUserLocation: (coords) => set({ userLocation: coords }),
      setIsLocationModalOpen: (open) => set({ isLocationModalOpen: open }),
      setHasLocationPrompted: (prompted) => set({ hasLocationPrompted: prompted })
    }),
    {
      name: 'nomaai_app_settings',
      merge: (persistedState, currentState) => {
        const persisted = persistedState && typeof persistedState === 'object'
          ? persistedState as Partial<AppState>
          : {};
        const user: UserProfile | null = persisted.user
          ? {
              ...persisted.user,
              farmState: PLATEAU_STATE.state,
              farmLga: PLATEAU_STATE.lgas.includes(persisted.user.farmLga || '')
                ? persisted.user.farmLga
                : '',
              selectedPlan: persisted.user.selectedPlan === 'premium' ? 'premium' : 'free'
            }
          : null;
        const activeLga = PLATEAU_STATE.lgas.includes(persisted.activeLga || '')
          ? persisted.activeLga
          : user?.farmLga || '';

        return {
          ...currentState,
          ...persisted,
          activeState: PLATEAU_STATE.state,
          activeLga,
          user
        };
      }
    }
  )
);
