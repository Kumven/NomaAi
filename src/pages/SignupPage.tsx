import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  MapPin,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { PLATEAU_STATE, requestBrowserLocation } from '../services/locationService';
import { LocationRequestModal } from '../components/common/LocationRequestModal';

export const SignupPage: React.FC = () => {
  type SignupStep = 'plan' | 'account' | 'payment';
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, user, activeLga, setActiveState, setUserLocation } = useAppStore();
  const redirectPath =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/';

  const [fullName, setFullName] = useState('Aminu Bello');
  const [phoneNumber, setPhoneNumber] = useState('08031234567');
  const [countryCode, setCountryCode] = useState('+234');
  const [email, setEmail] = useState('aminu.bello@example.com');
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('free');
  const [step, setStep] = useState<SignupStep>('plan');
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
        selectedPlan,
        createdAt: new Date().toISOString()
      });
      setIsLoading(false);
      if (selectedPlan === 'premium') {
        setStep('payment');
      } else {
        navigate(redirectPath, { replace: true });
      }
    }, 700);
  };

  return (
    <div className={`min-h-screen bg-[#EDF7EF] py-4 px-3 sm:px-4 flex flex-col justify-between w-full ${
      step === 'plan' ? 'max-w-2xl' : 'max-w-md'
    } mx-auto`}>
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
              {step === 'plan' ? 'Choose your plan' : step === 'account' ? 'Create your account' : 'Premium checkout'}
            </h1>
            <p className="text-xs text-[#526056] leading-relaxed">
              {step === 'plan'
                ? 'Choose Free or Premium to continue.'
                : step === 'account'
                  ? 'Create your Plateau farmer account.'
                  : 'Your account is created. Review the Premium payment step below.'}
            </p>
          </div>

          {step === 'plan' && (
            <div className="flex flex-col sm:flex-row gap-3">
              <section className="flex-1 flex flex-col p-4 rounded-2xl border border-[#D5EEDC] bg-white">
                <div className="text-sm font-extrabold text-[#132E1E]">Free</div>
                <div className="mt-0.5 text-xs font-semibold text-[#2D6A4F]">₦0 — Free to use</div>
                <p className="mt-2 text-xs text-[#526056]">For farmers who need basic farming advice.</p>
                <ul className="mt-3 flex-1 space-y-1.5 text-xs text-[#1B4332]">
                  <li>• Upload a sick-plant photo to check what may be wrong</li>
                  <li>• Check local weather and available weather alerts</li>
                  <li>• Get basic crop-care advice</li>
                  <li>• Proposed limit: 3 crop checks per month</li>
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlan('free');
                    setStep('account');
                  }}
                  className="w-full mt-4 min-h-11 rounded-xl border border-[#2D6A4F] text-[#1B4332] text-xs font-bold hover:bg-[#EAF7EE] transition"
                >
                  Choose Free
                </button>
              </section>

              <section className="flex-1 flex flex-col p-4 rounded-2xl border border-[#D5EEDC] bg-white">
                <div className="flex items-center gap-1.5 text-sm font-extrabold text-[#132E1E]">
                  <Sparkles className="w-4 h-4 text-[#EFA131]" />
                  Premium
                </div>
                <div className="mt-0.5 text-xs font-semibold text-[#2D6A4F]">Paid monthly subscription</div>
                <p className="mt-2 text-xs text-[#526056]">For farmers who need more detailed advice and support.</p>
                <ul className="mt-3 flex-1 space-y-1.5 text-xs text-[#1B4332]">
                  <li>• Everything in Free, plus more plant disease checks</li>
                  <li>• Detailed crop and farm-condition advice</li>
                  <li>• Personalized weather and crop-risk alerts</li>
                  <li>• Expert support for difficult cases</li>
                  <li>• Records of past plant problems and advice</li>
                  <li>• Faster customer support</li>
                </ul>
                <p className="mt-3 text-[11px] leading-relaxed text-amber-900">
                  Price and usage limits are being tested; they are not set yet.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlan('premium');
                    setStep('account');
                  }}
                  className="w-full mt-3 min-h-11 btn-golden rounded-xl text-xs font-bold"
                >
                  Choose Premium
                </button>
              </section>
            </div>
          )}

          {/* Form */}
          {step === 'account' && (
          <>
          <div className="flex items-center justify-between rounded-xl bg-[#F4FAF5] px-3 py-2 text-xs">
            <span className="font-semibold text-[#1B4332]">
              Selected plan: <strong>{selectedPlan === 'free' ? 'Free (₦0)' : 'Premium (monthly)'}</strong>
            </span>
            <button type="button" onClick={() => setStep('plan')} className="font-bold text-[#2D6A4F] underline">
              Change
            </button>
          </div>
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
                  <span>{selectedPlan === 'free' ? 'Create Free Account' : 'Create Account & Continue to Payment'}</span>
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
          </>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#D5EEDC] bg-[#F4FAF5] p-4 space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#132E1E]">
                  <ShieldCheck className="w-5 h-5 text-[#2D6A4F]" />
                  Account created
                </div>
                <p className="text-xs text-[#526056]">
                  Your Premium plan is selected. Complete checkout to activate Premium features.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 space-y-2">
                <h2 className="text-sm font-bold text-amber-950">Payment setup is not available yet</h2>
                <p className="text-xs leading-relaxed text-amber-900">
                  Premium pricing and usage limits are still being tested. This preview does not collect payment or activate Premium access.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (user) setUser({ ...user, selectedPlan: 'free' });
                  navigate(redirectPath, { replace: true });
                }}
                className="w-full min-h-11 btn-golden rounded-xl text-xs font-bold"
              >
                Switch to Free and continue
              </button>
            </div>
          )}
        </div>
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
