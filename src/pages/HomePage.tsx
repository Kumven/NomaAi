import React from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  MessageSquareText,
  CloudSun,
  Users,
  History,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import { useHistoryStore } from '../store/useHistoryStore';
import { useWeather } from '../hooks/useWeather';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { activeState } = useAppStore();
  const { diagnoses } = useHistoryStore();
  const { data: weather } = useWeather(activeState);

  const activeCasesCount = diagnoses.filter((d) => d.status === 'active' || d.status === 'monitoring').length;

  return (
    <div className="space-y-5 pb-8">
      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-stone-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-bold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>NomaAi • Nigerian Agro-Advisory</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {t('home.greeting')}
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 max-w-md leading-relaxed font-normal">
            {t('home.subheading')}
          </p>
        </div>

        {/* Ambient watermark pattern */}
        <div className="absolute -right-6 -bottom-8 opacity-10 text-white text-9xl pointer-events-none select-none">
          🌾
        </div>
      </div>

      {/* 2 Big Primary Farmer Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Diagnose Sick Crop */}
        <Link
          to="/diagnose"
          className="group bg-emerald-700 hover:bg-emerald-800 text-white rounded-3xl p-5 shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="w-13 h-13 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Camera className="w-7 h-7 stroke-[2.2]" />
            </div>
            <span className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition">
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black tracking-tight text-white">
              {t('home.quickDiagnose')}
            </h2>
            <p className="text-xs text-emerald-100 leading-relaxed">
              {t('home.quickDiagnoseDesc')}
            </p>
          </div>

          <div className="pt-2 border-t border-emerald-600/60 flex items-center justify-between text-xs font-bold text-emerald-200">
            <span>Built-in Photo Compression</span>
            <span className="font-mono text-[11px] bg-emerald-800/80 px-2 py-0.5 rounded-md">2G/3G Ready</span>
          </div>
        </Link>

        {/* Ask Malam Noma AI */}
        <Link
          to="/advisory"
          className="group bg-stone-900 hover:bg-stone-950 text-white rounded-3xl p-5 shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="w-13 h-13 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <MessageSquareText className="w-7 h-7 stroke-[2.2]" />
            </div>
            <span className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition">
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black tracking-tight text-white">
              {t('home.askDoctor')}
            </h2>
            <p className="text-xs text-stone-300 leading-relaxed">
              {t('home.askDoctorDesc')}
            </p>
          </div>

          <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs font-bold text-stone-300">
            <span>Voice & Text in 5 Languages</span>
            <span className="font-mono text-[11px] bg-stone-800 px-2 py-0.5 rounded-md">24/7 Agro-AI</span>
          </div>
        </Link>
      </div>

      {/* Today's Field Weather Quick Strip */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900">{t('home.weatherTitle')}</h3>
              <p className="text-[11px] text-stone-500">{activeState} State Agricultural Zone</p>
            </div>
          </div>
          <Link
            to="/weather"
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
          >
            <span>Full Forecast</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {weather ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Temp</span>
              <span className="text-base font-extrabold text-stone-900 font-mono">{weather.tempC}°C</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Rain Risk</span>
              <span className="text-base font-extrabold text-stone-900 font-mono">{weather.rainChancePercent}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Spraying</span>
              <span className={`text-xs font-bold block mt-1 ${weather.farmingSuitability.spraying.suitable ? 'text-emerald-700' : 'text-rose-700'}`}>
                {weather.farmingSuitability.spraying.suitable ? '✓ Safe' : '✗ Avoid'}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Sun Drying</span>
              <span className={`text-xs font-bold block mt-1 ${weather.farmingSuitability.harvestAndDrying.suitable ? 'text-emerald-700' : 'text-stone-600'}`}>
                {weather.farmingSuitability.harvestAndDrying.suitable ? '✓ Good' : '✗ Cover'}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-3 text-center text-xs text-stone-500">Loading agro-weather...</div>
        )}
      </div>

      {/* Secondary Cards: Saved History & Extension Directory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Saved Advice Logs */}
        <Link
          to="/history"
          className="bg-white rounded-3xl p-5 border border-stone-200 hover:border-emerald-500 shadow-2xs hover:shadow-sm transition flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-800 rounded-2xl">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900">{t('home.recentAdvice')}</h4>
              <p className="text-xs text-stone-500">
                {activeCasesCount > 0
                  ? `${activeCasesCount} active farm case(s) saved`
                  : 'Cached offline on your phone'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-stone-400" />
        </Link>

        {/* Find Agro-Dealers & ADPs */}
        <Link
          to="/directory"
          className="bg-white rounded-3xl p-5 border border-stone-200 hover:border-emerald-500 shadow-2xs hover:shadow-sm transition flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900">{t('home.findHelp')}</h4>
              <p className="text-xs text-stone-500">
                Extension officers & grain input markets
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-stone-400" />
        </Link>
      </div>

      {/* Value Badges Ribbon */}
      <div className="p-4 rounded-2xl bg-stone-100/70 border border-stone-200 flex flex-wrap items-center justify-around gap-2 text-center text-stone-600">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>{t('home.statsDiseases')}</span>
        </div>
        <div className="text-stone-300">•</div>
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>{t('home.statsStates')}</span>
        </div>
        <div className="text-stone-300">•</div>
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>{t('home.statsOffline')}</span>
        </div>
      </div>
    </div>
  );
};
