import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  Leaf,
  FlaskConical,
  CalendarCheck,
  BookmarkCheck,
  Share2,
  Check,
  UserCheck,
  ExternalLink
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { DiagnosisResult, SeverityLevel, SupportedLanguage } from '../../types';
import { AudioPlayerButton } from '../common/AudioPlayerButton';
import { useAppStore } from '../../store/useAppStore';
import { useHistoryStore } from '../../store/useHistoryStore';

interface DiagnosisResultCardProps {
  result: DiagnosisResult;
}

export const DiagnosisResultCard: React.FC<DiagnosisResultCardProps> = ({ result }) => {
  const { t } = useTranslation();
  const { language } = useAppStore();
  const { addDiagnosis, diagnoses } = useHistoryStore();
  const [isSaved, setIsSaved] = useState(
    diagnoses.some((d) => d.id === result.id)
  );
  const [saveToast, setSaveToast] = useState(false);

  const currentLang = (language || 'en') as SupportedLanguage;

  const getSeverityBadge = (level: SeverityLevel) => {
    switch (level) {
      case 'critical':
        return {
          bg: 'bg-rose-100 text-rose-800 border-rose-300',
          dot: 'bg-rose-600',
          label: 'Critical / Urgent Action'
        };
      case 'high':
        return {
          bg: 'bg-orange-100 text-orange-800 border-orange-300',
          dot: 'bg-orange-500',
          label: 'High Urgency'
        };
      case 'medium':
        return {
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          dot: 'bg-amber-500',
          label: 'Moderate Impact'
        };
      default:
        return {
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-500',
          label: 'Low / Manageable'
        };
    }
  };

  const badge = getSeverityBadge(result.severity);

  const localName =
    currentLang !== 'en' && result.localDiseaseName[currentLang]
      ? result.localDiseaseName[currentLang]
      : null;

  const handleSave = () => {
    addDiagnosis(result);
    setIsSaved(true);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleShareWhatsApp = () => {
    const text = `*NomaAi Crop Diagnosis Report*\n🌾 *Crop:* ${result.cropName}\n🦠 *Issue:* ${result.diseaseName}\n⚠️ *Severity:* ${result.severity.toUpperCase()}\n\n*Immediate Action:* ${result.immediateAction}\n\n*Diagnosed via NomaAi Agricultural Advisory*`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Top Header Card */}
      <div className="bg-stone-900 text-white p-5 sm:p-6 space-y-3 relative overflow-hidden">
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{result.cropIcon}</span>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                {result.cropName} • {result.locationState} State
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {result.diseaseName}
            </h2>
            {localName && (
              <p className="text-emerald-300 text-sm font-semibold">
                {localName}
              </p>
            )}
            <p className="text-stone-400 italic text-xs font-mono">
              {result.scientificName}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${badge.bg}`}
            >
              <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
              {badge.label}
            </span>
            <div className="mt-2 text-right">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Confidence</span>
              <span className="text-lg font-black text-emerald-400 font-mono">
                {result.confidence}%
              </span>
            </div>
          </div>
        </div>

        {/* Listen Audio Narration Bar */}
        <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-2">
          <AudioPlayerButton
            text={`${result.diseaseName}. ${result.summary}. Immediate Action: ${result.immediateAction}`}
            label="Listen to Diagnosis in Audio"
            className="w-full sm:w-auto"
          />
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Immediate Field Action Box */}
        <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300/80 space-y-2">
          <div className="flex items-center gap-2 text-amber-950 font-extrabold text-sm uppercase tracking-wide">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>{t('diagnose.immediateAction')}</span>
          </div>
          <p className="text-sm font-medium text-amber-900 leading-relaxed">
            {result.immediateAction}
          </p>
        </div>

        {/* Symptoms Observed */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Field Symptoms Observed
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {result.symptomsObserved.map((symptom, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200"
              >
                ✓ {symptom}
              </span>
            ))}
          </div>
        </div>

        {/* Organic vs Chemical Remedies Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Organic / Traditional Remedy */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
              <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-800">
                <Leaf className="w-4 h-4" />
              </div>
              <span>{t('diagnose.organicRemedy')}</span>
            </div>
            <ul className="space-y-2 text-xs text-emerald-900 leading-relaxed">
              {result.organicRemedies.map((remedy, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{remedy}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Chemical Control */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
            <div className="flex items-center gap-2 text-blue-950 font-bold text-sm">
              <div className="p-1.5 bg-blue-100 rounded-lg text-blue-800">
                <FlaskConical className="w-4 h-4" />
              </div>
              <span>{t('diagnose.chemicalRemedy')}</span>
            </div>
            <ul className="space-y-2 text-xs text-blue-900 leading-relaxed">
              {result.chemicalRemedies.map((chem, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{chem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chemical Precaution & Safety Alert */}
        {result.chemicalPrecautions && (
          <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-200 flex items-start gap-3 text-xs text-stone-700">
            <ShieldCheck className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-900 block mb-0.5">
                {t('diagnose.chemicalCaution')}
              </span>
              <p className="leading-relaxed">{result.chemicalPrecautions}</p>
            </div>
          </div>
        )}

        {/* Prevention for Next Season */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <CalendarCheck className="w-4 h-4 text-emerald-700" />
            <span>{t('diagnose.prevention')}</span>
          </div>
          <ul className="space-y-1.5 text-xs text-stone-600">
            {result.preventionTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-stone-400 font-bold">→</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons: Save, WhatsApp, Directory */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaved}
            className={`w-full sm:flex-1 py-3 px-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              isSaved
                ? 'bg-stone-100 text-stone-600 border border-stone-200'
                : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-md active:scale-95'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Saved to Farm History</span>
              </>
            ) : (
              <>
                <BookmarkCheck className="w-4 h-4" />
                <span>{t('diagnose.saveToLog')}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full sm:w-auto py-3 px-4 rounded-2xl text-sm font-bold bg-[#25D366] text-white hover:bg-[#20ba59] transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <Link
            to="/directory"
            className="w-full sm:w-auto py-3 px-4 rounded-2xl text-sm font-bold border border-stone-300 text-stone-700 hover:bg-stone-50 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-emerald-700" />
            <span>Find Extension Worker</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </Link>
        </div>

        {saveToast && (
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-semibold text-center animate-in fade-in">
            {t('diagnose.savedSuccess')}
          </div>
        )}
      </div>
    </div>
  );
};
