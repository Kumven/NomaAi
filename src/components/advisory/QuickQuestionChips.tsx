import React from 'react';
import { Sparkles } from 'lucide-react';
import { FREQUENT_FARM_QUESTIONS } from '../../services/advisoryService';
import { useAppStore } from '../../store/useAppStore';
import type { SupportedLanguage } from '../../types';

interface QuickQuestionChipsProps {
  onSelectQuestion: (questionText: string) => void;
}

export const QuickQuestionChips: React.FC<QuickQuestionChipsProps> = ({ onSelectQuestion }) => {
  const { language } = useAppStore();
  const currentLang = (language || 'en') as SupportedLanguage;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-bold text-stone-600 px-1">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Tap to ask common farm question:</span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
        {FREQUENT_FARM_QUESTIONS.map((faq) => {
          let qText = faq.questionEn;
          if (currentLang === 'ha') qText = faq.questionHa;
          else if (currentLang === 'yo') qText = faq.questionYo;
          else if (currentLang === 'ig') qText = faq.questionIg;
          else if (currentLang === 'pcm') qText = faq.questionPcm;

          return (
            <button
              key={faq.id}
              type="button"
              onClick={() => onSelectQuestion(qText)}
              className="snap-start shrink-0 max-w-xs text-left px-3 py-2 rounded-2xl border border-stone-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/50 text-xs font-semibold text-stone-800 transition shadow-2xs hover:shadow-xs cursor-pointer line-clamp-2"
            >
              💬 {qText}
            </button>
          );
        })}
      </div>
    </div>
  );
};
