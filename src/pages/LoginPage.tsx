import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, ShieldCheck, Check } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAppStore();
  const redirectPath =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/';

  const [identifier, setIdentifier] = useState('08031234567');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+234');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setUser({
        id: 'usr-1',
        fullName: 'Aminu Bello',
        phone: `${countryCode} ${identifier}`,
        email: identifier.includes('@') ? identifier : 'aminu.bello@farm.ng',
        farmState: 'Plateau',
        farmLga: 'Jos North',
        createdAt: new Date().toISOString()
      });
      setIsLoading(false);
      navigate(redirectPath, { replace: true });
    }, 700);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        id: 'usr-google',
        fullName: 'Aminu Bello',
        phone: '+234 803 123 4567',
        email: 'aminu.bello@gmail.com',
        farmState: 'Plateau',
        farmLga: 'Jos North',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        createdAt: new Date().toISOString()
      });
      setIsLoading(false);
      navigate(redirectPath, { replace: true });
    }, 600);
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

          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Card Container matching Figma Screen 2 */}
        <div className="bg-white rounded-3xl border border-[#D5EEDC] p-6 shadow-sm space-y-5">
          {/* Segmented Switcher: Sign In vs Create Account */}
          <div className="bg-[#EAF7EE] p-1 rounded-2xl flex items-center gap-1 border border-[#D5EEDC]">
            <button
              type="button"
              className="flex-1 py-2 px-3 rounded-xl bg-white text-[#132E1E] text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 text-[#2D6A4F] stroke-[3]" />
              <span>Sign in</span>
            </button>
            <Link
              to="/signup"
              state={location.state}
              className="flex-1 py-2 px-3 rounded-xl text-[#526056] hover:text-[#132E1E] text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition"
            >
              <span>+ Create account</span>
            </Link>
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#132E1E] tracking-tight">
              Welcome back to NomaAI
            </h1>
            <p className="text-xs text-[#526056] leading-relaxed">
              Keep your farm diagnostics, scouting photos, and local outbreak warnings in one pocket tool.
            </p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email or Phone with country code & SMS badge */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#132E1E]">
                  Email or phone number
                </label>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2D6A4F] bg-[#EAF7EE] px-2 py-0.5 rounded-full border border-[#D5EEDC]">
                  <ShieldCheck className="w-3 h-3 text-[#2D6A4F]" />
                  <span>SMS verified</span>
                </span>
              </div>

              <div className="flex gap-2">
                <div className="relative">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="h-11 px-2.5 bg-[#F4FAF5] rounded-2xl border border-[#D5EEDC] text-xs font-bold text-[#132E1E] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] cursor-pointer"
                  >
                    <option value="+234">🇳🇬 +234 (NG)</option>
                    <option value="+233">🇬🇭 +233 (GH)</option>
                    <option value="+254">🇰🇪 +254 (KE)</option>
                  </select>
                </div>

                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. 0801 234 5678 or farmer@..."
                  required
                  className="flex-1 h-11 px-3.5 bg-[#F4FAF5] rounded-2xl border border-[#D5EEDC] text-xs text-[#132E1E] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#132E1E]">Password</label>
                <button
                  type="button"
                  onClick={() => alert('Password reset SMS will be sent to your registered Nigerian phone number.')}
                  className="text-xs font-bold text-[#2D6A4F] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full h-11 pl-3.5 pr-10 bg-[#F4FAF5] rounded-2xl border border-[#D5EEDC] text-xs text-[#132E1E] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white transition"
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

            {/* Primary Golden Button: Sign In -> */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 btn-golden rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="text-base font-bold">→</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-1">
            <div className="border-t border-[#D5EEDC] w-full" />
            <span className="bg-white px-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest absolute">
              OR CONTINUE WITH
            </span>
          </div>

          {/* Secondary Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full h-11 bg-[#E2F5E7] hover:bg-[#D5EEDC] text-[#132E1E] rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer border border-[#CDE8D4]"
          >
            {/* Google colored G logo */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.26-2.09 3.67-5.17 3.67-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.28v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.24A7.18 7.18 0 0 1 4.89 12c0-.78.14-1.54.38-2.24V6.61H1.28A11.97 11.97 0 0 0 0 12c0 1.92.45 3.74 1.28 5.39l3.99-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.28 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* Create account link */}
          <p className="text-center text-xs text-[#526056]">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-[#2D6A4F] underline">
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* Footer Hotline matching Figma */}
      <div className="py-4 text-center">
        <p className="text-[11px] font-medium text-[#526056] flex items-center justify-center gap-1.5">
          <span>📞 Farmer Hotline:</span>
          <a href="tel:+2348000000000" className="font-bold text-[#132E1E] underline">
            +234 800 000 0000 [Toll-Free]
          </a>
        </p>
      </div>
    </div>
  );
};
