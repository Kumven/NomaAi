import React from 'react';
import { X, Calendar, MapPin, Share2, ShieldAlert } from 'lucide-react';
import type { DiagnosisResult } from '../../types';
import { AudioPlayerButton } from '../common/AudioPlayerButton';

interface HistoryDetailModalProps {
  diagnosis: DiagnosisResult;
  onClose: () => void;
  onStatusChange: (status: DiagnosisResult['status']) => void;
}

export const HistoryDetailModal: React.FC<HistoryDetailModalProps> = ({
  diagnosis,
  onClose,
  onStatusChange
}) => {
  const handleShare = () => {
    const text = `*Saved Farm Advice Case*\n🌾 Crop: ${diagnosis.cropName}\n🦠 Issue: ${diagnosis.diseaseName}\n📌 Status: ${diagnosis.status.toUpperCase()}\n\n*Action Taken:* ${diagnosis.immediateAction}\n\n*Saved on NomaAi Advisory*`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">{diagnosis.cropIcon}</span>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>{diagnosis.locationState} State</span>
                <span>•</span>
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>{new Date(diagnosis.date).toLocaleDateString()}</span>
              </div>
              <h3 className="font-extrabold text-stone-900 text-lg sm:text-xl">
                {diagnosis.diseaseName}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Narration Bar */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
          <span className="text-xs font-semibold text-emerald-950">
            Listen to saved instructions:
          </span>
          <AudioPlayerButton
            text={`${diagnosis.diseaseName}. ${diagnosis.immediateAction}. Organic treatment: ${diagnosis.organicRemedies.join(', ')}`}
            label="Listen"
            variant="primary"
          />
        </div>

        {/* Status Switcher */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Update Field Status
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => onStatusChange('active')}
              className={`py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                diagnosis.status === 'active'
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              Needs Action
            </button>
            <button
              type="button"
              onClick={() => onStatusChange('monitoring')}
              className={`py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                diagnosis.status === 'monitoring'
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              Monitoring
            </button>
            <button
              type="button"
              onClick={() => onStatusChange('resolved')}
              className={`py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                diagnosis.status === 'resolved'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              Resolved / Cured
            </button>
          </div>
        </div>

        {/* Immediate Action */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
          <span className="font-bold uppercase tracking-wider text-[11px] text-amber-900 block">
            Field Action
          </span>
          <p className="font-medium leading-relaxed">{diagnosis.immediateAction}</p>
        </div>

        {/* Remedies */}
        <div className="space-y-3 text-xs">
          <div>
            <span className="font-bold text-stone-800 uppercase tracking-wider text-[11px] block mb-1">
              Organic & Natural Remedies
            </span>
            <ul className="space-y-1 text-stone-600">
              {diagnosis.organicRemedies.map((r, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-bold text-stone-800 uppercase tracking-wider text-[11px] block mb-1">
              Approved Chemical Control
            </span>
            <ul className="space-y-1 text-stone-600">
              {diagnosis.chemicalRemedies.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chemical Precautions */}
        {diagnosis.chemicalPrecautions && (
          <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-700 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
            <p className="text-[11px]">{diagnosis.chemicalPrecautions}</p>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex gap-2 pt-2 border-t border-stone-100">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer hover:bg-[#20ba59]"
          >
            <Share2 className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-50 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
