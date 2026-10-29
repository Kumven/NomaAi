import React, { useState } from 'react';
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
  ArrowRight,
  MapPin,
  AlertTriangle,
  Leaf,
  FlaskConical
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import { useHistoryStore } from '../store/useHistoryStore';
import { useWeather } from '../hooks/useWeather';
import { LocationRequestModal } from '../components/common/LocationRequestModal';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { activeState, user } = useAppStore();
  const { diagnoses } = useHistoryStore();
  const { data: weather } = useWeather(activeState);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const activeCasesCount = diagnoses.filter((d) => d.status === 'active' || d.status === 'monitoring').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Figma Screen 1: Instant Disease Detection Hero */}
      <div className="text-center space-y-4 pt-1">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7EE] text-[#1B4332] text-xs font-bold border border-[#D5EEDC]">
            <Sparkles className="w-3.5 h-3.5 text-[#EFA131]" />
            <span>AI Crop Doctor for Nigerian Farmers</span>
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#132E1E] tracking-tight">
            Instant  <br /> disease detection
          </h1>

          <p className="text-xs sm:text-sm text-[#526056] max-w-sm mx-auto">
            Point camera at affected maize, cassava, or tomato leaves for immediate treatment guidance.
          </p>
        </div>

        {/* Viewfinder Mockup with Overlays (Exact match to Figma Screen 1) */}
        <div className="relative mx-auto max-w-xs sm:max-w-sm rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#132E1E] aspect-3/4">
          {/* Leaf image background */}
          <img
            src="https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80"
            alt="Field Crop Leaf"
            className="w-full h-full object-cover brightness-95"
          />

          {/* Scanner corner crosshairs */}
          <div className="absolute inset-4 pointer-events-none border border-white/20 rounded-2xl flex flex-col justify-between p-2">
            <div className="flex justify-between">
              <span className="w-4 h-4 border-t-2 border-l-2 border-white rounded-tl-sm" />
              <span className="w-4 h-4 border-t-2 border-r-2 border-white rounded-tr-sm" />
            </div>
            <div className="flex justify-between">
              <span className="w-4 h-4 border-b-2 border-l-2 border-white rounded-bl-sm" />
              <span className="w-4 h-4 border-b-2 border-r-2 border-white rounded-br-sm" />
            </div>
          </div>

          {/* Target Focal Reticle */}
          <div className="absolute top-[38%] left-[55%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-10 h-10 rounded-full border-2 border-[#F3A83B] animate-ping opacity-75" />
            <div className="w-3 h-3 rounded-full bg-[#F3A83B] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ring-2 ring-white" />
          </div>

          {/* Connected floating pills matching Figma */}
          <div className="absolute top-3 left-3 right-3 space-y-1.5 pointer-events-none">
            {/* Pill 1: Disease Name */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 px-3 shadow-md border border-[#D5EEDC] flex items-center justify-between animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#EFA131] shrink-0" />
                <span className="font-extrabold text-xs text-[#132E1E]">Northern Leaf Blight</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#F3A83B]" />
            </div>

            {/* Pill 2: Symptoms */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 px-3 shadow-md border border-[#D5EEDC] text-left text-[11px] animate-in fade-in slide-in-from-left-2">
              <div className="flex items-center gap-1 font-bold text-[#132E1E]">
                <Leaf className="w-3 h-3 text-[#2D6A4F]" />
                <span>Symptoms:</span>
              </div>
              <p className="text-[10px] text-stone-600 line-clamp-1">
                Elongated grayish-tan cigar lesions on foliage
              </p>
            </div>

            {/* Pill 3: Treatment */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 px-3 shadow-md border border-[#D5EEDC] text-left text-[11px] animate-in fade-in slide-in-from-left-3">
              <div className="flex items-center gap-1 font-bold text-[#132E1E]">
                <FlaskConical className="w-3 h-3 text-[#EFA131]" />
                <span>Treatment:</span>
              </div>
              <p className="text-[10px] text-stone-600 line-clamp-1">
                Foliar fungicide & isolate infected foliage
              </p>
            </div>
          </div>

          {/* Shutter Circle Button overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <Link
              to="/diagnose"
              className="w-14 h-14 rounded-full border-4 border-white bg-white/30 backdrop-blur-xs flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            >
              <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#132E1E]">
                <Camera className="w-5 h-5 text-[#2D6A4F]" />
              </div>
            </Link>
          </div>
        </div>

        {/* Big Golden Action Button - Exactly as Figma Screen 1 */}
        <div className="space-y-1 pt-1 max-w-xs sm:max-w-sm mx-auto">
          <Link
            to="/diagnose"
            className="w-full h-13 btn-golden rounded-2xl text-base font-bold shadow-md flex items-center justify-center gap-2 hover:bg-[#E59828] active:scale-[0.99] transition cursor-pointer"
          >
            <Camera className="w-5 h-5 text-[#161513]" />
            <span>Scan Your Crop</span>
          </Link>
          <p className="text-[11px] text-[#526056] font-medium">
            Instant AI diagnosis • 2G/3G optimized
          </p>
        </div>
      </div>

      {/* Farm Location Notification Bar */}
      <div className="bg-white rounded-3xl p-4 border border-[#D5EEDC] shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-[#EAF7EE] text-[#2D6A4F]">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#132E1E]">Active Farm Location:</span>
              <span className="text-xs font-black text-[#2D6A4F]">{activeState} State</span>
            </div>
            <p className="text-[11px] text-[#526056]">
              {user ? `Registered to ${user.fullName}` : 'GPS auto-detected for regional pest forecasts'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsLocationModalOpen(true)}
          className="text-xs font-bold text-[#132E1E] bg-[#EAF7EE] hover:bg-[#D5EEDC] px-3 py-1.5 rounded-xl border border-[#D5EEDC] transition cursor-pointer shrink-0"
        >
          Change
        </button>
      </div>

      {/* 2 Feature Cards: Ask Malam Noma & Farm Weather */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Ask Malam Noma AI */}
        <Link
          to="/advisory"
          className="bg-white rounded-3xl p-5 border border-[#D5EEDC] hover:border-[#2D6A4F] shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4 cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7EE] flex items-center justify-center text-[#2D6A4F] group-hover:scale-110 transition-transform">
              <MessageSquareText className="w-6 h-6" />
            </div>
            <span className="p-2 rounded-full bg-[#F4FAF5] text-[#132E1E] group-hover:bg-[#EAF7EE] transition">
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#132E1E]">
              Ask Malam Noma AI
            </h2>
            <p className="text-xs text-[#526056] leading-relaxed">
              Speak or type questions on planting times, NPK fertilizer rates, and market prices in 5 languages.
            </p>
          </div>

          <div className="pt-2 border-t border-[#EDF7EF] flex items-center justify-between text-xs font-bold text-[#2D6A4F]">
            <span>Voice & Audio Narration</span>
            <span className="font-mono text-[10px] bg-[#EAF7EE] px-2 py-0.5 rounded-md text-[#132E1E]">24/7 Agro-AI</span>
          </div>
        </Link>

        {/* Today's Farm Weather Advisory */}
        <Link
          to="/weather"
          className="bg-white rounded-3xl p-5 border border-[#D5EEDC] hover:border-[#2D6A4F] shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4 cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7EE] flex items-center justify-center text-[#2D6A4F] group-hover:scale-110 transition-transform">
              <CloudSun className="w-6 h-6" />
            </div>
            <span className="p-2 rounded-full bg-[#F4FAF5] text-[#132E1E] group-hover:bg-[#EAF7EE] transition">
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#132E1E]">
              Field Weather & Spraying
            </h2>
            <p className="text-xs text-[#526056] leading-relaxed">
              Suitability checks for pesticide spraying, planting readiness, and harvest drying in {activeState} State.
            </p>
          </div>

          {weather ? (
            <div className="pt-2 border-t border-[#EDF7EF] flex items-center justify-between text-xs font-bold text-[#132E1E]">
              <span>{weather.tempC}°C • {weather.condition}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-md ${weather.farmingSuitability.spraying.suitable ? 'bg-[#EAF7EE] text-[#2D6A4F]' : 'bg-rose-50 text-rose-700'}`}>
                {weather.farmingSuitability.spraying.suitable ? '✓ Spraying Safe' : '✗ Avoid Spraying'}
              </span>
            </div>
          ) : (
            <div className="text-xs text-stone-400">Loading agro-weather...</div>
          )}
        </Link>
      </div>

      {/* Secondary Cards: My Farm Records & Extension Directory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          to="/history"
          className="bg-white rounded-3xl p-5 border border-[#D5EEDC] hover:border-[#2D6A4F] shadow-xs hover:shadow-sm transition flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#EAF7EE] text-[#2D6A4F] rounded-2xl">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#132E1E]">{t('home.recentAdvice')}</h4>
              <p className="text-xs text-[#526056]">
                {activeCasesCount > 0 ? `${activeCasesCount} active farm case(s) saved` : 'Saved offline on your device'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-stone-400" />
        </Link>

        <Link
          to="/directory"
          className="bg-white rounded-3xl p-5 border border-[#D5EEDC] hover:border-[#2D6A4F] shadow-xs hover:shadow-sm transition flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#EAF7EE] text-[#2D6A4F] rounded-2xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#132E1E]">{t('home.findHelp')}</h4>
              <p className="text-xs text-[#526056]">
                ADP extension officers & grain markets
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-stone-400" />
        </Link>
      </div>

      {/* Trust Badges */}
      <div className="p-4 rounded-2xl bg-[#EAF7EE]/80 border border-[#D5EEDC] flex flex-wrap items-center justify-around gap-2 text-center text-[#2D6A4F]">
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
          <span>24+ Nigerian Crop Pathologies</span>
        </div>
        <div className="text-[#D5EEDC]">•</div>
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
          <span>All 36 States & Abuja</span>
        </div>
        <div className="text-[#D5EEDC]">•</div>
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
          <span>Zero-Network Offline Memory</span>
        </div>
      </div>

      <LocationRequestModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </div>
  );
};
