import React from 'react';
import { MessageSquareText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ChatInterface } from '../components/advisory/ChatInterface';

export const AdvisoryPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 pb-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2">
          <MessageSquareText className="w-6 h-6 text-emerald-700" />
          <span>{t('advisory.title')}</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          {t('advisory.subtitle')}
        </p>
      </div>

      <ChatInterface />
    </div>
  );
};
