import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { MockDataBadge } from './components/common/MockDataBadge';
import { LandingPage } from './pages/LandingPage';
import { TeamPage } from './pages/TeamPage';
import { HomePage } from './pages/HomePage';
import { DiagnosePage } from './pages/DiagnosePage';
import { AdvisoryPage } from './pages/AdvisoryPage';
import { WeatherPage } from './pages/WeatherPage';
import { HistoryPage } from './pages/HistoryPage';
import { DirectoryPage } from './pages/DirectoryPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { OtpPage } from './pages/OtpPage';
import { WalletPage } from './pages/WalletPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { TopUpModal } from './components/wallet/TopUpModal';
import { useAppStore } from './store/useAppStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10
    }
  }
});

const AppLayout: React.FC = () => {
  const { fontSize } = useAppStore();
  const location = useLocation();

  const isAuthPage = ['/login', '/signup', '/otp'].includes(location.pathname);
  const isLandingOrTeamPage = ['/', '/landing', '/team'].includes(location.pathname);

  // Clean layout for standalone Landing Page and Team Page
  if (isLandingOrTeamPage) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    );
  }

  // Clean layout for authentication screens (login, signup, OTP)
  if (isAuthPage) {
    return (
      <div
        className={`min-h-screen bg-[#EDF7EF] flex flex-col text-[#1A261D] ${
          fontSize === 'large' ? 'text-base font-medium' : 'text-sm'
        }`}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/otp" element={<OtpPage />} />
        </Routes>
      </div>
    );
  }

  // Core NomaAI Farmer Application Shell (Header + Content + Bottom Navigation)
  return (
    <div
      className={`min-h-screen bg-[#EDF7EF] flex flex-col text-[#1A261D] ${
        fontSize === 'large' ? 'text-base font-medium' : 'text-sm'
      }`}
    >
      {/* Simulation Mode Notice Banner */}
      <MockDataBadge />

      {/* Mobile Top Header */}
      <Header />

      {/* Main Viewport */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-3 sm:px-4 pt-3 pb-24">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/app" element={<HomePage />} />
          <Route
            path="/diagnose"
            element={
              <ProtectedRoute>
                <DiagnosePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/advisory"
            element={
              <ProtectedRoute>
                <AdvisoryPage />
              </ProtectedRoute>
            }
          />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <WalletPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>

      {/* Sticky Mobile Bottom Navigation */}
      <BottomNav />
      <TopUpModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
