import React from 'react';
import { CloudSun, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import { WeatherCard } from '../components/weather/WeatherCard';
import { getAllSupportedStates } from '../services/weatherService';

export const WeatherPage: React.FC = () => {
  const { t } = useTranslation();
  const { activeState, setActiveState } = useAppStore();
  const states = getAllSupportedStates();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2">
          <CloudSun className="w-6 h-6 text-emerald-700" />
          <span>{t('weather.title')}</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          {t('weather.subtitle')}
        </p>
      </div>

      {/* State Switcher Bar */}
      <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5 text-emerald-700" />
          <span>{t('weather.selectLocation')}</span>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {states.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setActiveState(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                activeState === st
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              {st} State
            </button>
          ))}
        </div>
      </div>

      {/* Weather Advisory Card */}
      <WeatherCard selectedState={activeState} />
    </div>
  );
};
