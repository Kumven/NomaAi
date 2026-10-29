import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { requestOtp, resetPassword, verifySignupOtp, type OtpPurpose } from '../services/api';
import { useAppStore } from '../store/useAppStore';

interface OtpRouteState {
  phone?: string;
  purpose?: OtpPurpose;
  from?: { pathname?: string };
  resetRequested?: boolean;
  requestOnMount?: boolean;
}

export const OtpPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state || {}) as OtpRouteState;
  const phone = state.phone || '';
  const purpose = state.purpose || 'signup';
  const setUser = useAppStore((store) => store.setUser);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(Boolean(state.requestOnMount));
  const [message, setMessage] = useState(
    state.resetRequested ? t('auth.otpSent') : ''
  );
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (!phone || !state.requestOnMount) return;
    let cancelled = false;
    void requestOtp({ phone, purpose })
      .then(() => {
        if (!cancelled) setMessage(t('auth.otpSent'));
      })
      .catch((requestError: unknown) => {
        if (!cancelled) {
          setError(requestError instanceof Error ? requestError.message : t('auth.otpFailed'));
        }
      })
      .finally(() => {
        if (!cancelled) setIsResending(false);
      });
    return () => {
      cancelled = true;
    };
  }, [phone, purpose, state.requestOnMount, t]);

  if (!phone) {
    return <NavigateToLogin />;
  }

  const handleVerify = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');
    try {
      if (purpose === 'signup') {
        const user = await verifySignupOtp({ phone, code, purpose });
        setUser(user);
        navigate(state.from?.pathname || '/', { replace: true });
      } else {
        await resetPassword({ phone, code, purpose, newPassword });
        navigate('/login', {
          replace: true,
          state: { from: state.from, resetComplete: true }
        });
      }
    } catch (verificationError) {
      setError(
        verificationError instanceof Error
          ? verificationError.message
          : t('auth.otpFailed')
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError('');
    setMessage('');
    try {
      await requestOtp({ phone, purpose });
      setMessage(t('auth.otpSent'));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : t('auth.otpFailed'));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8">
      <div className="space-y-5 rounded-3xl border border-[#D5EEDC] bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#132E1E]">{t('auth.otpTitle')}</h1>
          <p className="mt-2 text-sm text-[#526056]">
            {t(purpose === 'signup' ? 'auth.otpSignupHelp' : 'auth.otpResetHelp', { phone })}
          </p>
        </div>
        {message && <p role="status" className="rounded-xl bg-[#EAF7EE] p-3 text-sm text-[#1B4332]">{message}</p>}
        {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
        <form onSubmit={handleVerify} className="space-y-4">
          <label className="block space-y-1 text-sm font-bold text-[#132E1E]">
            <span>{t('auth.otpCode')}</span>
            <input
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
              pattern="[0-9]{6}"
              minLength={6}
              maxLength={6}
              required
              className="h-11 w-full rounded-xl border border-[#D5EEDC] bg-[#F4FAF5] px-3 text-sm"
            />
          </label>
          {purpose === 'password_reset' && (
            <label className="block space-y-1 text-sm font-bold text-[#132E1E]">
              <span>{t('auth.newPassword')}</span>
              <input
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                minLength={8}
                required
                className="h-11 w-full rounded-xl border border-[#D5EEDC] bg-[#F4FAF5] px-3 text-sm"
              />
            </label>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-[#F3A83B] px-4 py-3 text-sm font-bold text-[#161513] disabled:opacity-50"
          >
            {isLoading ? t('auth.verifying') : t(purpose === 'signup' ? 'auth.verify' : 'auth.resetPassword')}
          </button>
        </form>
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending || isLoading}
          className="w-full text-center text-sm font-bold text-[#2D6A4F] underline disabled:opacity-50"
        >
          {isResending ? t('auth.resendingOtp') : t('auth.resendOtp')}
        </button>
        <Link to="/login" className="block text-center text-sm text-[#526056] underline">
          {t('auth.backToLogin')}
        </Link>
      </div>
    </div>
  );
};

const NavigateToLogin: React.FC = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    void navigate('/login', { replace: true });
  }, [navigate]);
  return null;
};
