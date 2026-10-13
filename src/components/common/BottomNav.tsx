import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Camera, MessageSquareText, CloudSun, History, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const BottomNav: React.FC = () => {
  const { t } = useTranslation();

  const navItems = [
    {
      to: '/',
      label: t('nav.home'),
      icon: Home,
      highlight: false
    },
    {
      to: '/diagnose',
      label: t('nav.diagnose'),
      icon: Camera,
      highlight: true
    },
    {
      to: '/advisory',
      label: t('nav.advisory'),
      icon: MessageSquareText,
      highlight: false
    },
    {
      to: '/weather',
      label: t('nav.weather'),
      icon: CloudSun,
      highlight: false
    },
    {
      to: '/history',
      label: t('nav.history'),
      icon: History,
      highlight: false
    },
    {
      to: '/directory',
      label: t('nav.directory'),
      icon: Users,
      highlight: false
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg">
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.highlight) {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center -mt-5 transition group ${
                    isActive ? 'scale-105' : 'hover:scale-105'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                        isActive
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-emerald-600/30'
                          : 'bg-emerald-700 text-white ring-2 ring-white shadow-emerald-700/20'
                      }`}
                    >
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span
                      className={`text-[10px] font-bold mt-1 max-w-[64px] truncate text-center ${
                        isActive ? 'text-emerald-800' : 'text-stone-600'
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-1.5 rounded-lg transition min-w-[50px] ${
                  isActive
                    ? 'text-emerald-800 font-bold'
                    : 'text-stone-500 hover:text-stone-900 font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 mb-0.5 transition-colors ${
                      isActive ? 'text-emerald-700 stroke-[2.5]' : 'stroke-[1.8]'
                    }`}
                  />
                  <span className="text-[10px] leading-tight max-w-[56px] truncate text-center">
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-emerald-600 mt-0.5" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
