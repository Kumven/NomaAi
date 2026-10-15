import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { MockDataBadge } from './components/common/MockDataBadge';
import { HomePage } from './pages/HomePage';
import { DiagnosePage } from './pages/DiagnosePage';
import { AdvisoryPage } from './pages/AdvisoryPage';
import { WeatherPage } from './pages/WeatherPage';
import { HistoryPage } from './pages/HistoryPage';
import { DirectoryPage } from './pages/DirectoryPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { useAppStore } from './store/useAppStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10
    }
  }
});

const RequireAuthentication: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAppStore();
  const location = useLocation();

  if (!user || !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppLayout: React.FC = () => {
  const { fontSize } = useAppStore();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

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
        </Routes>
      </div>
    );
  }

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
          <Route path="/" element={<HomePage />} />
          <Route
            path="/diagnose"
            element={
              <RequireAuthentication>
                <DiagnosePage />
              </RequireAuthentication>
            }
          />
          <Route path="/advisory" element={<AdvisoryPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Sticky Mobile Bottom Navigation */}
      <BottomNav />
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
