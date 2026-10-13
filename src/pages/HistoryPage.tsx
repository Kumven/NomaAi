import React, { useState } from 'react';
import { History, PlusCircle, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHistoryStore } from '../store/useHistoryStore';
import { HistoryCard } from '../components/history/HistoryCard';
import type { DiagnosisResult } from '../types';

export const HistoryPage: React.FC = () => {
  const { t } = useTranslation();
  const { diagnoses, updateStatus, deleteDiagnosis } = useHistoryStore();
  const [statusFilter, setStatusFilter] = useState<'all' | DiagnosisResult['status']>('all');

  const filteredDiagnoses = diagnoses.filter((d) => {
    if (statusFilter === 'all') return true;
    return d.status === statusFilter;
  });

  const countActive = diagnoses.filter((d) => d.status === 'active').length;
  const countMonitoring = diagnoses.filter((d) => d.status === 'monitoring').length;
  const countResolved = diagnoses.filter((d) => d.status === 'resolved').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2">
            <History className="w-6 h-6 text-emerald-700" />
            <span>{t('history.title')}</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {t('history.subtitle')}
          </p>
        </div>

        <Link
          to="/diagnose"
          className="px-3.5 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs hover:bg-emerald-800 transition cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="hidden sm:inline">New Check</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-3xl p-3 border border-stone-200 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 text-xs font-bold text-stone-400 px-2 shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>Status:</span>
        </div>

        <button
          type="button"
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
            statusFilter === 'all'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'bg-stone-50 hover:bg-stone-100 text-stone-700'
          }`}
        >
          All ({diagnoses.length})
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('active')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
            statusFilter === 'active'
              ? 'bg-rose-700 text-white shadow-2xs'
              : 'bg-rose-50 hover:bg-rose-100 text-rose-800'
          }`}
        >
          Needs Action ({countActive})
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('monitoring')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
            statusFilter === 'monitoring'
              ? 'bg-amber-700 text-white shadow-2xs'
              : 'bg-amber-50 hover:bg-amber-100 text-amber-800'
          }`}
        >
          Monitoring ({countMonitoring})
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('resolved')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
            statusFilter === 'resolved'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
          }`}
        >
          Resolved ({countResolved})
        </button>
      </div>

      {/* List of Diagnosis History Records */}
      {filteredDiagnoses.length > 0 ? (
        <div className="space-y-3">
          {filteredDiagnoses.map((item) => (
            <HistoryCard
              key={item.id}
              diagnosis={item}
              onUpdateStatus={updateStatus}
              onDelete={deleteDiagnosis}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 border border-stone-200 text-center space-y-4">
          <div className="text-5xl">🌱</div>
          <div className="space-y-1">
            <h3 className="font-bold text-stone-800 text-base">No Records in this Filter</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {t('history.empty')}
            </p>
          </div>
          <Link
            to="/diagnose"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition cursor-pointer shadow-sm"
          >
            <span>Diagnose a Sick Crop</span>
          </Link>
        </div>
      )}
    </div>
  );
};
