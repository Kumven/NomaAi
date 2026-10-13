import React, { useState, useEffect } from 'react';
import { Sprout, Globe, MapPin, WifiOff, Type, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { languageOptions } from '../../i18n/config';
import { getAllSupportedStates } from '../../services/weatherService';
import type { SupportedLanguage } from '../../types';

export const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const {
    language,
    setLanguage,
    activeState,
    setActiveState,
    isOffline,
    setIsOffline,
    fontSize,
    setFontSize
  } = useAppStore();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);

  const supportedStates = getAllSupportedStates();

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

  const handleStateChange = (stateName: string) => {
    setActiveState(stateName);
    setIsStateOpen(false);
  };

  const currentLangObj = languageOptions.find((l) => l.code === (language || i18n.language)) || languageOptions[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 flex items-center justify-center text-white shadow-sm ring-2 ring-emerald-600/20">
            <Sprout className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-emerald-950">NomaAi</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Nigeria
              </span>
            </div>
            <p className="text-[11px] font-medium text-stone-500 line-clamp-1">
              AI Agricultural Advisory
            </p>
          </div>
        </div>

        {/* Action Controls: State, Lang, Font */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Offline warning badge if offline */}
          {isOffline && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-100 text-rose-800 text-xs font-medium">
              <WifiOff className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Offline</span>
            </div>
          )}

          {/* State selector dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsStateOpen(!isStateOpen);
                setIsLangOpen(false);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-stone-200 hover:border-emerald-500 bg-stone-50 text-stone-700 text-xs font-semibold hover:bg-white transition cursor-pointer"
              title="Select State"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{activeState}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {isStateOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                  Select Farm State
                </div>
                {supportedStates.map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStateChange(st)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 cursor-pointer ${
                      activeState === st ? 'font-bold text-emerald-800 bg-emerald-50/60' : 'text-stone-700'
                    }`}
                  >
                    <span>{st} State</span>
                    {activeState === st && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsStateOpen(false);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-stone-200 hover:border-emerald-500 bg-stone-50 text-stone-700 text-xs font-semibold hover:bg-white transition cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>{currentLangObj.code.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                  Harshe / Language
                </div>
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => handleLanguageChange(opt.code)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 cursor-pointer ${
                      currentLangObj.code === opt.code
                        ? 'font-bold text-emerald-800 bg-emerald-50/60'
                        : 'text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{opt.flag}</span>
                      <span>{opt.native}</span>
                    </div>
                    {currentLangObj.code === opt.code && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Font Size Toggle for farmers with visual needs */}
          <button
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className={`p-1.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition cursor-pointer ${
              fontSize === 'large' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-stone-50'
            }`}
            title="Toggle Text Size for Reading"
            aria-label="Toggle text size"
          >
            <Type className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
