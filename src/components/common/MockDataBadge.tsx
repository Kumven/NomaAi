import React, { useState } from 'react';
import { X, Database, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const MockDataBadge: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-amber-50 border-b border-amber-200/80 px-3 py-1.5 text-xs text-amber-900 flex items-center justify-between">
        <div className="flex items-center gap-1.5 truncate">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
          <span className="font-semibold text-amber-950">Frontend Demo:</span>
          <span className="truncate text-amber-800">{t('app.mockNotice')}</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="ml-2 text-xs font-medium text-amber-900 underline hover:text-amber-950 shrink-0 flex items-center gap-0.5 cursor-pointer"
        >
          Details <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-800">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">System Architecture & Mock Notice</h3>
                  <p className="text-xs text-stone-500">Frontend Service Layer Specification</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-amber-950">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Simulated Backend Integration</span>
              </div>
              <p>
                In compliance with project specifications, NomaAi is built <strong>frontend-first</strong>. All AI crop diagnosis classifications, agricultural meteorological alerts, and expert directories operate through an abstracted service layer (`src/services/`) with realistic Nigerian agro-data.
              </p>
            </div>

            <div className="space-y-2 text-xs text-stone-700">
              <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">Active Service Modules</h4>
              
              <div className="p-2.5 rounded-lg border border-stone-200 bg-stone-50 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">Crop Image Compression & Diagnosis Service</p>
                  <p className="text-stone-500 text-[11px]">
                    Client-side `browser-image-compression` minimizes cellular data usage before dispatching to the simulated vision model.
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg border border-stone-200 bg-stone-50 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">Agro-Weather Suitability Engine</p>
                  <p className="text-stone-500 text-[11px]">
                    Evaluates wind, precipitation, and moisture thresholds for Plateau State using TanStack Query caching.
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg border border-stone-200 bg-stone-50 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">Malam Noma Q&A Agro-Knowledge Base</p>
                  <p className="text-stone-500 text-[11px]">
                    Multi-lingual guidance across English, Hausa, Yoruba, Igbo, and Nigerian Pidgin.
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg border border-stone-200 bg-stone-50 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">Offline-First Local Storage (Zustand Persist)</p>
                  <p className="text-stone-500 text-[11px]">
                    Consultations and diagnoses are safely cached on the farmer's device for access in zero-network rural fields.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 bg-emerald-700 text-white font-medium text-sm rounded-xl hover:bg-emerald-800 transition cursor-pointer"
            >
              Continue Exploring NomaAi
            </button>
          </div>
        </div>
      )}
    </>
  );
};
