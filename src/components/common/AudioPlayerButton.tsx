import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSpeech } from '../../hooks/useSpeech';

interface AudioPlayerButtonProps {
  text: string;
  lang?: string;
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'subtle';
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({
  text,
  lang = 'en-NG',
  label = 'Listen',
  className = '',
  variant = 'primary'
}) => {
  const { speak, stop, isSpeaking, isSupported } = useSpeech();

  if (!isSupported) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      stop();
    } else {
      speak(text, lang);
    }
  };

  const getVariantStyles = () => {
    if (variant === 'secondary') {
      return isSpeaking
        ? 'bg-rose-100 text-rose-800 border-rose-300'
        : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200';
    }
    if (variant === 'subtle') {
      return isSpeaking
        ? 'text-rose-600 bg-rose-50'
        : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100';
    }
    // primary
    return isSpeaking
      ? 'bg-rose-600 text-white shadow-sm animate-pulse'
      : 'bg-emerald-700 text-white shadow-sm hover:bg-emerald-800 active:scale-95';
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isSpeaking ? 'Stop audio' : 'Listen audio'}
      className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border ${getVariantStyles()} ${className}`}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-4 h-4 animate-bounce" />
          <span>{label ? 'Stop Audio' : ''}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
