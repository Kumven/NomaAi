import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  ChevronRight,
  Trash2,
  Share2,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import type { DiagnosisResult } from '../../types';
import { AudioPlayerButton } from '../common/AudioPlayerButton';
import { HistoryDetailModal } from './HistoryDetailModal';

interface HistoryCardProps {
  diagnosis: DiagnosisResult;
  onUpdateStatus: (id: string, status: DiagnosisResult['status']) => void;
  onDelete: (id: string) => void;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({
  diagnosis,
  onUpdateStatus,
  onDelete
}) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const getStatusBadge = (status: DiagnosisResult['status']) => {
    switch (status) {
      case 'resolved':
        return {
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: CheckCircle2,
          label: 'Resolved'
        };
      case 'monitoring':
        return {
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: Clock,
          label: 'Monitoring'
        };
      default:
        return {
          bg: 'bg-rose-100 text-rose-800 border-rose-300',
          icon: AlertCircle,
          label: 'Needs Action'
        };
    }
  };

  const statusBadge = getStatusBadge(diagnosis.status);
  const StatusIcon = statusBadge.icon;

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `*Farm Case Record*\n🌾 Crop: ${diagnosis.cropName}\n🦠 Problem: ${diagnosis.diseaseName}\nImmediate Action: ${diagnosis.immediateAction}\n\nVia NomaAi`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <div
        onClick={() => setIsDetailOpen(true)}
        className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200 hover:border-emerald-500 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-3"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="text-3xl p-1.5 bg-stone-50 rounded-2xl border border-stone-100 shrink-0">
              {diagnosis.cropIcon}
            </span>
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-stone-500 uppercase">
                <span className="text-emerald-800 font-extrabold">{diagnosis.cropName}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  {diagnosis.locationState} State
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-stone-400" />
                  {new Date(diagnosis.date).toLocaleDateString()}
                </span>
              </div>
              <h3 className="font-extrabold text-stone-900 text-base mt-0.5 line-clamp-1">
                {diagnosis.diseaseName}
              </h3>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border shrink-0 ${statusBadge.bg}`}
          >
            <StatusIcon className="w-3.5 h-3.5" />
            <span>{statusBadge.label}</span>
          </span>
        </div>

        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed bg-stone-50 p-2.5 rounded-xl border border-stone-100">
          <strong className="text-stone-800">Action:</strong> {diagnosis.immediateAction}
        </p>

        <div className="pt-1 flex items-center justify-between border-t border-stone-100 text-xs">
          <div className="flex items-center gap-1.5">
            <AudioPlayerButton
              text={`${diagnosis.diseaseName}. ${diagnosis.immediateAction}`}
              label="Listen"
              variant="subtle"
              className="px-2 py-1 text-xs"
            />
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 rounded-lg text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 transition cursor-pointer"
              title="Share on WhatsApp"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(diagnosis.id);
              }}
              className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
              title="Delete record"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer"
          >
            <span>View Full Case</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {isDetailOpen && (
        <HistoryDetailModal
          diagnosis={diagnosis}
          onClose={() => setIsDetailOpen(false)}
          onStatusChange={(newStatus) => onUpdateStatus(diagnosis.id, newStatus)}
        />
      )}
    </>
  );
};
