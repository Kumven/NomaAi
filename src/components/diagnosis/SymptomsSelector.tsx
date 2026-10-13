import React from 'react';

const COMMON_SYMPTOMS = [
  { id: 'yellowing', label: 'Yellow / Pale Leaves', emoji: '🍂' },
  { id: 'holes', label: 'Chewed Holes / Worms', emoji: '🐛' },
  { id: 'black_spots', label: 'Dark / Black Spots', emoji: '🟤' },
  { id: 'curling', label: 'Curled / Wrinkled Leaves', emoji: '🌪️' },
  { id: 'wilting', label: 'Wilting / Dying Stems', emoji: '🥀' },
  { id: 'white_mold', label: 'White Powder / Mold', emoji: '⚪' },
  { id: 'stunted', label: 'Stunted Growth / Short', emoji: '📉' },
  { id: 'fruit_rot', label: 'Rotten Fruit / Pods', emoji: '🍅' }
];

interface SymptomsSelectorProps {
  selectedSymptoms: string[];
  onToggleSymptom: (symptom: string) => void;
}

export const SymptomsSelector: React.FC<SymptomsSelectorProps> = ({
  selectedSymptoms,
  onToggleSymptom
}) => {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {COMMON_SYMPTOMS.map((item) => {
        const isSelected = selectedSymptoms.includes(item.label);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onToggleSymptom(item.label)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              isSelected
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100 hover:border-stone-300'
            }`}
          >
            <span>{item.emoji}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
