import React, { useState } from 'react';
import { Camera, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CropSelector } from '../components/diagnosis/CropSelector';
import { SymptomsSelector } from '../components/diagnosis/SymptomsSelector';
import { ImageUploader } from '../components/diagnosis/ImageUploader';
import { DiagnosisResultCard } from '../components/diagnosis/DiagnosisResultCard';
import { simulateDiagnosisAnalysis, type SampleCase } from '../services/diagnosisService';
import type { CompressionResult } from '../services/compressionService';
import type { DiagnosisResult } from '../types';
import { useAppStore } from '../store/useAppStore';

export const DiagnosePage: React.FC = () => {
  const { t } = useTranslation();
  const { activeState } = useAppStore();

  const [selectedCropId, setSelectedCropId] = useState('cassava');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [compressionStats, setCompressionStats] = useState<CompressionResult | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DiagnosisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleToggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleImageReady = (url: string, stats?: CompressionResult) => {
    setPreviewUrl(url);
    if (stats) setCompressionStats(stats);
    setErrorMsg(null);
  };

  const handleSelectSample = (sample: SampleCase) => {
    setSelectedCropId(sample.cropId);
    setPreviewUrl(sample.imageUrl);
    setSelectedSymptoms(sample.symptoms);
    setCompressionStats({
      file: new File([], 'sample.jpg'),
      previewUrl: sample.imageUrl,
      originalSizeBytes: 2450000,
      compressedSizeBytes: 184000,
      compressionRatio: 92,
      compressionTimeMs: 110,
      width: 1200,
      height: 900
    });
    setErrorMsg(null);
  };

  const handleRunDiagnosis = async () => {
    if (!previewUrl) {
      setErrorMsg('Please snap a photo, upload an image, or pick one of the sample Nigerian crops below.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const statsForPayload = compressionStats
        ? {
            originalSizeBytes: compressionStats.originalSizeBytes,
            compressedSizeBytes: compressionStats.compressedSizeBytes,
            compressionRatio: compressionStats.compressionRatio,
            timeMs: compressionStats.compressionTimeMs
          }
        : undefined;

      const result = await simulateDiagnosisAnalysis(
        selectedCropId,
        previewUrl,
        selectedSymptoms,
        statsForPayload,
        activeState
      );

      setAnalysisResult(result);
    } catch (err) {
      console.error('Diagnosis failed:', err);
      setErrorMsg('Diagnosis simulation failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setPreviewUrl('');
    setCompressionStats(null);
    setSelectedSymptoms([]);
    setErrorMsg(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Info */}
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2">
          <Camera className="w-6 h-6 text-emerald-700" />
          <span>{t('diagnose.title')}</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          {t('diagnose.subtitle')}
        </p>
      </div>

      {analysisResult ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Diagnosis Result
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Diagnose Another Crop</span>
            </button>
          </div>

          <DiagnosisResultCard result={analysisResult} />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Step 1: Select Crop */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 inline-flex items-center justify-center text-[11px] font-bold">1</span>
                <span>{t('diagnose.selectCrop')}</span>
              </span>
              <span className="text-[11px] text-stone-400">8 Key Nigerian Crops</span>
            </div>

            <CropSelector
              selectedCropId={selectedCropId}
              onSelectCrop={(id) => setSelectedCropId(id)}
            />
          </div>

          {/* Step 2: What Symptoms Do You See? */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 inline-flex items-center justify-center text-[11px] font-bold">2</span>
                <span>{t('diagnose.chooseSymptoms')}</span>
              </span>
              <span className="text-[11px] text-stone-400">Tap to highlight</span>
            </div>

            <SymptomsSelector
              selectedSymptoms={selectedSymptoms}
              onToggleSymptom={handleToggleSymptom}
            />
          </div>

          {/* Step 3: Photo Capture & Compression */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 inline-flex items-center justify-center text-[11px] font-bold">3</span>
                <span>Upload or Snap Photo</span>
              </span>
              <span className="text-[11px] text-stone-400">Automatic Browser Compression</span>
            </div>

            <ImageUploader
              onImageReady={handleImageReady}
              onSelectSampleCase={handleSelectSample}
              selectedPreviewUrl={previewUrl}
              compressionStats={compressionStats}
              isProcessing={isAnalyzing}
            />
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="button"
            disabled={isAnalyzing}
            onClick={handleRunDiagnosis}
            className={`w-full py-4 px-6 rounded-2xl font-black text-base text-white shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isAnalyzing
                ? 'bg-emerald-800 opacity-80 cursor-not-allowed'
                : 'bg-emerald-700 hover:bg-emerald-800 active:scale-98 shadow-emerald-700/20'
            }`}
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t('diagnose.analyzing')}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>{t('diagnose.runDiagnosis')}</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
