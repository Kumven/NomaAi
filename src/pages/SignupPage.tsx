import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  MapPin
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { PLATEAU_STATE, requestBrowserLocation } from '../services/locationService';
import { LocationRequestModal } from '../components/common/LocationRequestModal';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, activeLga, setActiveState, setUserLocation } = useAppStore();
  const redirectPath =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/';

  const [fullName, setFullName] = useState('Aminu Bello');
  const [phoneNumber, setPhoneNumber] = useState('08031234567');
  const [countryCode, setCountryCode] = useState('+234');
  const [email, setEmail] = useState('aminu.bello@example.com');
  const [farmLga, setFarmLga] = useState(
    PLATEAU_STATE.lgas.includes(activeLga || '') ? activeLga || '' : ''
  );
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const handleGpsDetect = async () => {
    setIsDetectingGps(true);
    try {
      const res = await requestBrowserLocation();
      setUserLocation(res);
      setActiveState(PLATEAU_STATE.state, farmLga);
    } catch (e) {
      console.warn('GPS detection:', e);
      setIsLocationModalOpen(true);
    } finally {
      setIsDetectingGps(false);
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setUser({
        id: `usr-${Date.now()}`,
        fullName,
        phone: `${countryCode} ${phoneNumber}`,
        email,
        farmState: PLATEAU_STATE.state,
        farmLga,
        createdAt: new Date().toISOString()
      });
      setIsLoading(false);
      navigate(redirectPath, { replace: true });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#EDF7EF] py-4 px-3 sm:px-4 flex flex-col justify-between max-w-md mx-auto">
      {/* Top Bar with Back Arrow and Brand */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-white border border-[#D5EEDC] flex items-center justify-center text-[#132E1E] hover:bg-[#EAF7EE] transition cursor-pointer shadow-xs"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Figma Logo Brand Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-[#D5EEDC] shadow-xs">
            <div className="w-6 h-6 rounded-lg bg-[#132E1E] flex items-center justify-center text-white text-xs font-bold">
              🌱
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-xs tracking-tight text-[#132E1E] leading-none">NomaAI</span>
              <span className="text-[8px] font-bold tracking-wider uppercase text-[#2D6A4F] leading-none">CROP DOCTOR</span>
            </div>
          </div>

          <div className="w-10" />
        </div>

        {/* Card Container matching Figma Screen 3 */}
        <div className="bg-white rounded-3xl border border-[#D5EEDC] p-6 shadow-sm space-y-5">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7EE] text-[#1B4332] text-xs font-bold border border-[#D5EEDC]">
            <span>🌾</span>
            <span>AI Diagnostics for Plateau Farms</span>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#132E1E] tracking-tight">
              Create your account
            </h1>
            <p className="text-xs text-[#526056] leading-relaxed">
              Start detecting crop diseases instantly on your farm.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUp} className="space-y-3.5">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#132E1E]">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Aminu Bello"
                required
                className="w-full h-11 px-3.5 bg-[#F4FAF5] rounded-2xl border border-[#D5EEDC] text-xs text-[#132E1E] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white transition"
              />
            </div>

            {/* Phone Number with SMS confirmation badge */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#132E1E]">Phone number</label>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2D6A4F] bg-[#EAF7EE] px-2 py-0.5 rounded-full border border-[#D5EEDC]">
                  <ShieldCheck className="w-3 h-3 text-[#2D6A4F]" />
                  <span>SMS confirmation</span>
                </span>
              </div>

              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="h-11 px-2.5 bg-[#F4FAF5] rounded-2xl border border-[#D5EEDC] text-xs font-bold text-[#132E1E] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] cursor-pointer"
                >
                  <option value="+234">🇳🇬 +234</option>
                  <option value="+233">🇬🇭 +233</option>
                  <option value="+254">🇰🇪 +254</option>
                </select>

                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. 0803 123 4567"
                  required
                  className="flex-1 h-11 px-3.5 bg-[#F4FAF5] rounded-2xl border border-[#D5EEDC] text-xs text-[#132E1E] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#132E1E]">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. aminu.bello@example.com"
                required
                className="w-full h-11 px-3.5 bg-[#F4FAF5] rounded-2xl border border-[#D5EEDC] text-xs text-[#132E1E] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white transition"
              />
            </div>

            {/* Farm Location / State with GPS Auto-detection */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#132E1E]">Farm Location / State</label>
                <button
                  type="button"
                  onClick={handleGpsDetect}
                  disabled={isDetectingGps}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2D6A4F] hover:text-[#132E1E] cursor-pointer"
                >
                  <Navigation className="w-3 h-3 text-[#EFA131]" />
                  <span>{isDetectingGps ? 'Detecting GPS...' : '📍 Auto-detect GPS'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center gap-2 h-11 px-3.5 bg-[#F4FAF5] rounded-2xl border border-[#D5EEDC] text-xs font-semibold text-[#132E1E]">
                  <MapPin className="w-4 h-4 text-[#2D6A4F]" />
                  Plateau State
                </div>
                <select
                  value={farmLga}
                  onChange={(e) => {
                    setFarmLga(e.target.value);
                    setActiveState(PLATEAU_STATE.state, e.target.value);
                  }}
                  required
                  className="flex-1 h-11 px-3 bg-[#F4FAF5] rounded-2xl border border-[#D5EEDC] text-xs font-semibold text-[#132E1E] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] cursor-pointer"
                >
                  <option value="" disabled>Select LGA</option>
                  {PLATEAU_STATE.lgas.map((lga) => (
                    <option key={lga} value={lga}>{lga}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Create Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#132E1E]">Create Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  required
                  className="w-full h-11 pl-3.5 pr-10 bg-[#F4FAF5] rounded-2xl border border-[#D5EEDC] text-xs text-[#132E1E] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Primary Golden Button: Create Account -> */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 btn-golden rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer mt-1"
            >
              {isLoading ? (
                <span>Creating account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <span className="text-base font-bold">→</span>
                </>
              )}
            </button>
          </form>

          {/* Benefits Card matching Figma Screen 3 */}
          <div className="p-4 rounded-2xl bg-[#EAF7EE] border border-[#D5EEDC] space-y-2 text-xs text-[#1B4332]">
            <span className="font-bold text-[#132E1E] block">
              Included with your NomaAI farmer account:
            </span>
            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                <span>Instant AI disease diagnostics from leaf photos</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                <span>Crop disease & pest outbreak alerts for Plateau State</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                <span>Save your maize, cassava & tomato scan records</span>
              </div>
            </div>
          </div>

          {/* Already have an account */}
          <p className="text-center text-xs text-[#526056]">
            Already have an account?{' '}
            <Link
              to="/login"
              state={location.state}
              className="font-bold text-[#2D6A4F] underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Footer Hotline */}
      <div className="py-4 text-center">
        <p className="text-[11px] font-medium text-[#526056] flex items-center justify-center gap-1.5">
          <span>📞 Farmer Hotline:</span>
          <a href="tel:+2348000000000" className="font-bold text-[#132E1E] underline">
            +234 800 000 0000 [Toll-Free]
          </a>
        </p>
      </div>

      <LocationRequestModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSelected={(_state, lga) => {
          if (lga) setFarmLga(lga);
        }}
      />
    </div>
  );
};
