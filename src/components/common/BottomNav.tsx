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
      label: 'Scan',
      icon: Camera,
      highlight: true
    },
    {
      to: '/advisory',
      label: 'Advisory',
      icon: MessageSquareText,
      highlight: false
    },
    {
      to: '/weather',
      label: 'Weather',
      icon: CloudSun,
      highlight: false
    },
    {
      to: '/history',
      label: 'Library',
      icon: History,
      highlight: false
    },
    {
      to: '/directory',
      label: 'Experts',
      icon: Users,
      highlight: false
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#D5EEDC] shadow-lg">
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
                          ? 'bg-[#F3A83B] text-[#161513] ring-4 ring-[#F3A83B]/30 shadow-[#F3A83B]/40'
                          : 'bg-[#F3A83B] text-[#161513] ring-2 ring-white shadow-[#F3A83B]/30'
                      }`}
                    >
                      <Icon className="w-6 h-6 stroke-[2.4]" />
                    </div>
                    <span
                      className={`text-[10px] font-bold mt-1 max-w-[64px] truncate text-center ${
                        isActive ? 'text-[#132E1E]' : 'text-[#526056]'
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
                `flex flex-col items-center justify-center py-1 px-1.5 rounded-lg transition min-w-[48px] ${
                  isActive
                    ? 'text-[#132E1E] font-bold'
                    : 'text-[#64746B] hover:text-[#132E1E] font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 mb-0.5 transition-colors ${
                      isActive ? 'text-[#2D6A4F] stroke-[2.5]' : 'stroke-[1.8]'
                    }`}
                  />
                  <span className="text-[10px] leading-tight max-w-[56px] truncate text-center">
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F3A83B] mt-0.5" />
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
