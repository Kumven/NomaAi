import React from 'react';
import { CloudSun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import { WeatherCard } from '../components/weather/WeatherCard';

export const WeatherPage: React.FC = () => {
  const { t } = useTranslation();
  const { activeState } = useAppStore();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-serif font-black text-[#132E1E] tracking-tight flex items-center gap-2">
          <CloudSun className="w-6 h-6 text-[#2D6A4F]" />
          <span>{t('weather.title')}</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#526056] leading-relaxed">
          {t('weather.subtitle')}
        </p>
      </div>

      {/* Weather Advisory Card */}
      <WeatherCard selectedState={activeState} />
    </div>
  );
};
