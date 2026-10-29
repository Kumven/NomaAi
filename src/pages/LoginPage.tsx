import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { login, requestOtp } from '../services/api';
import { useTranslation } from 'react-i18next';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAppStore();
  const redirectPath =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/';

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    (location.state as { resetComplete?: boolean } | null)?.resetComplete
      ? t('auth.passwordResetComplete')
      : ''
  );

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const digits = phone.replace(/\D/g, '');
    const localPhone = digits.replace(/^(234|0)/, '');
    if (!/^[789]\d{9}$/.test(localPhone)) {
      setErrorMessage(t('auth.invalidPhone'));
      setIsLoading(false);
      return;
    }

    try {
      const authenticatedUser = await login(`+234${localPhone}`, password);
      setUser(authenticatedUser);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('auth.signinFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const digits = phone.replace(/\D/g, '');
    const localPhone = digits.replace(/^(234|0)/, '');
    if (!/^[789]\d{9}$/.test(localPhone)) {
      setErrorMessage(t('auth.enterPhoneForReset'));
      return;
    }

    setIsRequestingOtp(true);
    setErrorMessage('');
    setStatusMessage('');
    const normalizedPhone = `+234${localPhone}`;
    try {
      await requestOtp({ phone: normalizedPhone, purpose: 'password_reset' });
      navigate('/otp', {
        state: {
          phone: normalizedPhone,
          purpose: 'password_reset',
          from: { pathname: redirectPath },
          resetRequested: true
        }
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('auth.otpFailed'));
    } finally {
      setIsRequestingOtp(false);
    }
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
            {statusMessage && (
              <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                {statusMessage}
              </p>
            )}
            {errorMessage && (
              <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800">
                {errorMessage}
              </p>
            )}
            {/* Nigerian phone */}
            <div className="space-y-1.5">
              <label htmlFor="login-phone" className="text-xs font-bold text-[#132E1E]">
                {t('auth.phone')}
              </label>
              <div className="flex gap-2">
                <span className="inline-flex h-11 items-center rounded-2xl border border-[#D5EEDC] bg-[#F4FAF5] px-3 text-xs font-bold text-[#132E1E]">
                  🇳🇬 +234
                </span>
                <input
                  id="login-phone"
                  type="tel"
                  autoComplete="tel-national"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t('auth.phoneExample')}
                  required
                  className="h-11 flex-1 rounded-2xl border border-[#D5EEDC] bg-[#F4FAF5] px-3.5 text-xs text-[#132E1E] placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#132E1E]">Password</label>
                <button
                  type="button"
                  onClick={() => void handleForgotPassword()}
                  disabled={isLoading || isRequestingOtp}
                  className="text-xs font-bold text-[#2D6A4F] hover:underline cursor-pointer"
                >
                  {isRequestingOtp ? t('auth.sendingOtp') : t('auth.forgotPassword')}
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
                <span>{t('auth.signingIn')}</span>
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
            onClick={() => setErrorMessage('Google sign-in is not configured yet.')}
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

    </div>
  );
};
