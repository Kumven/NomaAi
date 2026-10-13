import React, { useRef, useState } from 'react';
import { Camera, Upload, CheckCircle2, Zap, ArrowDownRight, RefreshCw, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { compressCropImage, formatBytes, type CompressionResult } from '../../services/compressionService';
import { SAMPLE_CROP_CASES, type SampleCase } from '../../services/diagnosisService';

interface ImageUploaderProps {
  onImageReady: (previewUrl: string, compressionStats?: CompressionResult) => void;
  onSelectSampleCase: (sample: SampleCase) => void;
  selectedPreviewUrl?: string;
  compressionStats?: CompressionResult | null;
  isProcessing: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageReady,
  onSelectSampleCase,
  selectedPreviewUrl,
  compressionStats,
  isProcessing
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;

    try {
      setIsCompressing(true);
      const result = await compressCropImage(file, 0.4, 1200); // compress down to ~400KB max
      onImageReady(result.previewUrl, result);
    } catch (err) {
      console.error('Failed to compress image:', err);
      // Fallback: create raw object URL
      const rawUrl = URL.createObjectURL(file);
      onImageReady(rawUrl);
    } finally {
      setIsCompressing(false);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onInputChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={onInputChange}
      />

      {/* Main Upload Box */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-5 text-center transition-all bg-stone-50/50 ${
          dragActive
            ? 'border-emerald-600 bg-emerald-50/70 scale-[1.01]'
            : selectedPreviewUrl
            ? 'border-emerald-500 bg-emerald-50/30'
            : 'border-stone-300 hover:border-emerald-500 hover:bg-stone-50'
        }`}
      >
        {isCompressing ? (
          <div className="py-10 space-y-3">
            <div className="w-12 h-12 rounded-full border-3 border-emerald-600 border-t-transparent animate-spin mx-auto" />
            <p className="font-bold text-stone-900 text-sm">{t('diagnose.compressing')}</p>
            <p className="text-xs text-stone-500">
              Browser-based compression reducing bandwidth for rural networks...
            </p>
          </div>
        ) : selectedPreviewUrl ? (
          <div className="space-y-3">
            <div className="relative mx-auto max-w-xs rounded-2xl overflow-hidden shadow-md border border-stone-200 aspect-4/3 bg-stone-900">
              <img
                src={selectedPreviewUrl}
                alt="Selected Crop"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-emerald-800/90 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Ready</span>
              </div>
            </div>

            {/* Compression Metrics Banner */}
            {compressionStats && (
              <div className="bg-white rounded-2xl p-3 border border-emerald-200/80 shadow-xs max-w-sm mx-auto text-left">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-950 mb-2 pb-1.5 border-b border-emerald-100">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    <span>In-Browser Image Compression</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-mono text-[10px]">
                    {compressionStats.compressionTimeMs}ms
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-stone-50 p-1.5 rounded-xl">
                    <span className="text-[10px] text-stone-500 block uppercase font-medium">Original</span>
                    <span className="text-xs font-bold text-stone-800 font-mono">
                      {formatBytes(compressionStats.originalSizeBytes)}
                    </span>
                  </div>
                  <div className="bg-emerald-50 p-1.5 rounded-xl border border-emerald-200">
                    <span className="text-[10px] text-emerald-700 block uppercase font-bold">Optimized</span>
                    <span className="text-xs font-bold text-emerald-900 font-mono">
                      {formatBytes(compressionStats.compressedSizeBytes)}
                    </span>
                  </div>
                  <div className="bg-amber-50 p-1.5 rounded-xl border border-amber-200">
                    <span className="text-[10px] text-amber-700 block uppercase font-bold">Saved</span>
                    <span className="text-xs font-extrabold text-amber-900 font-mono flex items-center justify-center gap-0.5">
                      <ArrowDownRight className="w-3 h-3 text-amber-600" />
                      {compressionStats.compressionRatio}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake Photo</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Different Photo</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6 space-y-3">
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="p-3.5 rounded-2xl bg-emerald-700 text-white shadow-md hover:bg-emerald-800 active:scale-95 transition flex items-center gap-2 cursor-pointer font-bold text-sm"
              >
                <Camera className="w-5 h-5" />
                <span>Snap Photo with Camera</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-3.5 rounded-2xl bg-stone-200 text-stone-800 hover:bg-stone-300 active:scale-95 transition flex items-center gap-2 cursor-pointer font-semibold text-sm"
              >
                <Upload className="w-5 h-5 text-stone-600" />
                <span>Choose from Phone</span>
              </button>
            </div>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Hold camera 15-20cm from affected crop leaves or stem. Sharp daylight gives best results.
            </p>
          </div>
        )}
      </div>

      {/* Preset Nigerian Field Samples (Instant Test) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-600 px-1">
          <div className="flex items-center gap-1 font-semibold text-stone-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('diagnose.samplePhotos')}</span>
          </div>
          <span className="text-[11px] text-stone-400">Tap to test immediately</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SAMPLE_CROP_CASES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              disabled={isProcessing}
              onClick={() => onSelectSampleCase(sample)}
              className="group text-left rounded-2xl border border-stone-200 hover:border-emerald-500 bg-white p-2 transition shadow-2xs hover:shadow-sm cursor-pointer disabled:opacity-50"
            >
              <div className="relative rounded-xl overflow-hidden aspect-4/3 mb-1.5 bg-stone-100">
                <img
                  src={sample.imageUrl}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-1 left-1 bg-stone-900/80 text-[10px] text-white px-1.5 py-0.5 rounded-md font-semibold capitalize">
                  {sample.cropId}
                </span>
              </div>
              <p className="font-bold text-[11px] text-stone-900 line-clamp-1 group-hover:text-emerald-700">
                {sample.diseaseName.split('(')[0]}
              </p>
              <p className="text-[10px] text-stone-500 line-clamp-1">
                {sample.thumbnailDesc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
