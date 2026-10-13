import React from 'react';
import { NIGERIAN_CROPS } from '../../services/diagnosisService';
import { useAppStore } from '../../store/useAppStore';
import type { SupportedLanguage } from '../../types';

interface CropSelectorProps {
  selectedCropId: string;
  onSelectCrop: (cropId: string) => void;
}

export const CropSelector: React.FC<CropSelectorProps> = ({
  selectedCropId,
  onSelectCrop
}) => {
  const { language } = useAppStore();
  const currentLang = (language || 'en') as SupportedLanguage;

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
        {NIGERIAN_CROPS.map((crop) => {
          const isSelected = selectedCropId === crop.id;
          const localName =
            currentLang !== 'en' && crop.localNames[currentLang]
              ? crop.localNames[currentLang]
              : crop.name;

          return (
            <button
              key={crop.id}
              type="button"
              onClick={() => onSelectCrop(crop.id)}
              className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition-all cursor-pointer text-center relative ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-500/20'
                  : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              <span className="text-2xl sm:text-3xl mb-1 filter drop-shadow-xs">{crop.icon}</span>
              <span className="font-bold text-xs text-stone-900 leading-tight line-clamp-1">
                {crop.name.split('/')[0].trim()}
              </span>
              <span className="text-[10px] text-emerald-800 font-semibold line-clamp-1">
                {localName !== crop.name ? localName : ''}
              </span>
              {isSelected && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
