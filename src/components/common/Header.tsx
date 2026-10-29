import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, MapPin, WifiOff, Type, ChevronDown, User, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { languageOptions } from '../../i18n/config';
import type { SupportedLanguage } from '../../types';
import { LocationRequestModal } from './LocationRequestModal';
import { CreditBadge } from '../wallet/CreditBadge';
import { useWalletStore } from '../../store/useWalletStore';

export const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const {
    language,
    setLanguage,
    activeState,
    isOffline,
    setIsOffline,
    fontSize,
    setFontSize,
    user,
    isAuthenticated,
    logout
  } = useAppStore();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const clearWallet = useWalletStore((state) => state.clearWallet);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setIsOffline]);

  const handleLanguageChange = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsLangOpen(false);
  };

  const currentLangObj = languageOptions.find((l) => l.code === (language || i18n.language)) || languageOptions[0];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#D5EEDC] shadow-xs">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
          {/* Brand Logo - Matches Figma Top Bar */}
          <Link to="/home" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-[#132E1E] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <span className="text-base">🌱</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-black text-sm tracking-tight text-[#132E1E] leading-tight">
                NomaAI
              </span>
              <span className="text-[8px] font-extrabold tracking-widest uppercase text-[#2D6A4F] leading-tight">
                CROP DOCTOR
              </span>
            </div>
          </Link>

          {/* Controls: Location, Language, Auth (Sign In / Sign Up) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <CreditBadge />
            {/* Offline badge */}
            {isOffline && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-100 text-rose-800 text-[11px] font-medium">
                <WifiOff className="w-3 h-3" />
                <span className="hidden sm:inline">Offline</span>
              </div>
            )}

            {/* Location Pill - Clicking requests / changes location */}
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-[#D5EEDC] hover:border-[#2D6A4F] bg-[#F4FAF5] text-[#132E1E] text-xs font-bold hover:bg-white transition cursor-pointer"
              title="Change Farm Location"
            >
              <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span className="max-w-[70px] sm:max-w-none truncate">{activeState}</span>
            </button>

            {/* Language dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsLangOpen(!isLangOpen);
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center gap-1 px-2 py-1.5 rounded-xl border border-[#D5EEDC] bg-[#F4FAF5] text-[#132E1E] text-xs font-semibold hover:bg-white transition cursor-pointer"
                title="Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span className="text-[11px]">{currentLangObj.code.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-[#D5EEDC] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                    Harshe / Language
                  </div>
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => handleLanguageChange(opt.code)}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#EAF7EE] cursor-pointer ${
                        currentLangObj.code === opt.code
                          ? 'font-bold text-[#132E1E] bg-[#EAF7EE]/60'
                          : 'text-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{opt.flag}</span>
                        <span>{opt.native}</span>
                      </div>
                      {currentLangObj.code === opt.code && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Font Accessibility Toggle */}
            <button
              type="button"
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className={`p-1.5 rounded-xl border border-[#D5EEDC] text-[#132E1E] text-xs font-semibold hover:bg-[#EAF7EE] transition cursor-pointer hidden xs:flex ${
                fontSize === 'large' ? 'bg-[#EAF7EE] text-[#132E1E] border-[#2D6A4F]' : 'bg-[#F4FAF5]'
              }`}
              title="Toggle Text Size"
              aria-label="Toggle text size"
            >
              <Type className="w-4 h-4" />
            </button>

            {/* Auth Buttons matching Figma Top Bar */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 pl-1.5 pr-2 py-1 rounded-full bg-[#132E1E] text-white text-xs font-bold shadow-xs cursor-pointer hover:bg-[#1a3d28]"
                >
                  <div className="w-6 h-6 rounded-full bg-[#F3A83B] text-[#161513] flex items-center justify-center font-black text-[11px]">
                    {user.fullName.charAt(0)}
                  </div>
                  <span className="max-w-[70px] truncate hidden sm:inline">{user.fullName.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-stone-300" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-2xl shadow-xl border border-[#D5EEDC] py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3.5 py-1.5 border-b border-stone-100">
                      <p className="text-xs font-bold text-[#132E1E] truncate">{user.fullName}</p>
                      <p className="text-[10px] text-stone-500 truncate">{user.farmState} State</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsLocationModalOpen(true);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-[#132E1E] hover:bg-[#EAF7EE] flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span>Change Farm State</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        clearWallet();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-rose-700 hover:bg-rose-50 flex items-center gap-2 cursor-pointer font-bold border-t border-stone-100"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  to="/login"
                  className="text-xs font-bold text-[#132E1E] hover:text-[#2D6A4F] px-1.5 sm:px-2 py-1.5 transition cursor-pointer"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-3 sm:px-4 py-1.5 rounded-full bg-[#132E1E] hover:bg-[#1d412b] text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <User className="w-3 h-3 text-[#F3A83B]" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Location Request Modal */}
      <LocationRequestModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
};
