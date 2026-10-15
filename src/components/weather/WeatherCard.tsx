import React from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  CloudRain,
  CheckCircle,
  XCircle,
  Calendar,
  Sparkles,
  RefreshCw,
  Sun
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useWeather } from '../../hooks/useWeather';
import { AudioPlayerButton } from '../common/AudioPlayerButton';

interface WeatherCardProps {
  selectedState: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ selectedState }) => {
  const { t } = useTranslation();
  const { data: weather, isLoading, isError, refetch } = useWeather(selectedState);

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm text-center space-y-3">
        <div className="w-10 h-10 rounded-full border-3 border-emerald-600 border-t-transparent animate-spin mx-auto" />
        <p className="font-bold text-stone-800 text-sm">
          Fetching Agro-Meteorological Data for {selectedState} State...
        </p>
      </div>
    );
  }

  if (isError || !weather) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-stone-200 text-center space-y-3">
        <p className="text-stone-700 text-sm font-semibold">
          Unable to update meteorological data.
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 mx-auto cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Weather Forecast</span>
        </button>
      </div>
    );
  }

  const audioSummary = `Weather advisory for ${weather.state} State. Current temperature is ${weather.tempC} degrees Celsius, ${weather.condition}. Rain chance is ${weather.rainChancePercent} percent. Spraying pesticides: ${weather.farmingSuitability.spraying.suitable ? 'Safe today' : 'Not recommended'}. Planting: ${weather.farmingSuitability.planting.suitable ? 'Recommended' : 'Wait for better soil conditions'}. Sun-drying harvest: ${weather.farmingSuitability.harvestAndDrying.suitable ? 'Good sunlight' : 'Keep harvest covered'}.`;

  return (
    <div className="space-y-5">
      {/* Current Conditions Card */}
      <div className="bg-[#132E1E] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden border border-[#D5EEDC]">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[#F3A83B] text-xs font-bold uppercase tracking-wider">
              <span>{weather.zone}</span>
              <span>•</span>
              <span>{weather.town}</span>
            </div>
            <h2 className="text-3xl font-serif font-black mt-1 tracking-tight text-white">
              {weather.state} State
            </h2>
            <p className="text-emerald-200 text-xs mt-0.5 font-medium">
              {weather.condition}
            </p>
          </div>

          <div className="text-right">
            <span className="text-4xl sm:text-5xl font-black font-mono tracking-tighter">
              {weather.tempC}°C
            </span>
            <span className="text-stone-300 text-[11px] block">
              Feels like {weather.feelsLikeC}°C
            </span>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-emerald-700/60">
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-300 text-[10px] uppercase font-bold">
              <Droplets className="w-3.5 h-3.5" />
              <span>{t('weather.humidity')}</span>
            </div>
            <span className="text-sm sm:text-base font-extrabold font-mono text-white mt-0.5 block">
              {weather.humidityPercent}%
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-300 text-[10px] uppercase font-bold">
              <CloudRain className="w-3.5 h-3.5" />
              <span>{t('weather.rainChance')}</span>
            </div>
            <span className="text-sm sm:text-base font-extrabold font-mono text-white mt-0.5 block">
              {weather.rainChancePercent}%
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-300 text-[10px] uppercase font-bold">
              <Wind className="w-3.5 h-3.5" />
              <span>{t('weather.wind')}</span>
            </div>
            <span className="text-sm sm:text-base font-extrabold font-mono text-white mt-0.5 block">
              {weather.windSpeedKmh} km/h
            </span>
          </div>
        </div>

        {/* Listen Narration Button */}
        <div className="mt-4 pt-3 border-t border-emerald-700/40 flex items-center justify-between">
          <AudioPlayerButton
            text={audioSummary}
            label="Listen to Weather Advisory"
            variant="secondary"
            className="w-full sm:w-auto"
          />
        </div>
      </div>

      {/* 4 Practical Farm Activity Suitability Cards */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 px-1">
          Field Operations Suitability Check
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Spraying */}
          <div
            className={`p-4 rounded-2xl border-2 transition-all ${
              weather.farmingSuitability.spraying.suitable
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                : 'bg-rose-50/80 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-extrabold text-xs uppercase tracking-wide">
                {t('weather.spraySuitability')}
              </span>
              {weather.farmingSuitability.spraying.suitable ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" /> Safe
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                  <XCircle className="w-3.5 h-3.5" /> Avoid
                </span>
              )}
            </div>
            <p className="text-xs leading-relaxed font-medium">
              {weather.farmingSuitability.spraying.note}
            </p>
          </div>

          {/* Planting */}
          <div
            className={`p-4 rounded-2xl border-2 transition-all ${
              weather.farmingSuitability.planting.suitable
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                : 'bg-amber-50/80 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-extrabold text-xs uppercase tracking-wide">
                {t('weather.plantSuitability')}
              </span>
              {weather.farmingSuitability.planting.suitable ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" /> Good
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  <XCircle className="w-3.5 h-3.5" /> Caution
                </span>
              )}
            </div>
            <p className="text-xs leading-relaxed font-medium">
              {weather.farmingSuitability.planting.note}
            </p>
          </div>

          {/* Harvesting & Drying */}
          <div
            className={`p-4 rounded-2xl border-2 transition-all ${
              weather.farmingSuitability.harvestAndDrying.suitable
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                : 'bg-stone-50 border-stone-300 text-stone-900'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-extrabold text-xs uppercase tracking-wide">
                {t('weather.harvestSuitability')}
              </span>
              {weather.farmingSuitability.harvestAndDrying.suitable ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <Sun className="w-3.5 h-3.5" /> Sunny
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-stone-600 bg-stone-200 px-2 py-0.5 rounded-full">
                  <CloudSun className="w-3.5 h-3.5" /> Cover
                </span>
              )}
            </div>
            <p className="text-xs leading-relaxed font-medium">
              {weather.farmingSuitability.harvestAndDrying.note}
            </p>
          </div>

          {/* Fertilizer Application */}
          <div
            className={`p-4 rounded-2xl border-2 transition-all ${
              weather.farmingSuitability.fertilizerApplication.suitable
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                : 'bg-rose-50/80 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-extrabold text-xs uppercase tracking-wide">
                {t('weather.fertilizerSuitability')}
              </span>
              {weather.farmingSuitability.fertilizerApplication.suitable ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" /> Apply
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                  <XCircle className="w-3.5 h-3.5" /> Wait
                </span>
              )}
            </div>
            <p className="text-xs leading-relaxed font-medium">
              {weather.farmingSuitability.fertilizerApplication.note}
            </p>
          </div>
        </div>
      </div>

      {/* Seasonal Cycle Note */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-amber-900">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{t('weather.seasonalStage')}</span>
        </div>
        <p className="font-semibold">{weather.seasonalCalendarNote}</p>
      </div>

      {/* 7-Day Agricultural Outlook */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm text-stone-900 pb-2 border-b border-stone-100">
          <Calendar className="w-4 h-4 text-emerald-700" />
          <span>{t('weather.sevenDayForecast')}</span>
        </div>

        <div className="space-y-2">
          {weather.weeklyForecast.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50/40 transition border border-stone-100 text-xs gap-3"
            >
              <div className="w-12 font-bold text-stone-800">{item.day}</div>
              <div className="w-16 font-mono font-bold text-stone-900">{item.tempC}°C</div>
              <div className="w-24 text-stone-600 flex items-center gap-1">
                <CloudRain className="w-3 h-3 text-blue-500" />
                <span>{item.rainChancePercent}% rain</span>
              </div>
              <div className="flex-1 text-[11px] text-stone-600 line-clamp-1 italic">
                {item.advice}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
