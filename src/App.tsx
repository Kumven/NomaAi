import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { useAppStore } from './store/useAppStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10
    }
  }
});

export const App: React.FC = () => {
  const { fontSize } = useAppStore();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div
          className={`min-h-screen bg-stone-100 flex flex-col text-stone-900 ${
            fontSize === 'large' ? 'text-base font-medium' : 'text-sm'
          }`}
        >
          {/* Transparent Simulation Mode Banner */}
          <MockDataBadge />

          {/* Fixed/Sticky Mobile Header */}
          <Header />

          {/* Main Content Viewport */}
          <main className="flex-1 max-w-2xl w-full mx-auto px-4 pt-4 pb-24">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/diagnose" element={<DiagnosePage />} />
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
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
