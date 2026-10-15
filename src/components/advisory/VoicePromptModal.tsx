import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Send, Volume2, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface VoicePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitVoiceText: (text: string) => void;
}

export const VoicePromptModal: React.FC<VoicePromptModalProps> = ({
  isOpen,
  onClose,
  onSubmitVoiceText
}) => {
  const { t } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = 'en-NG';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recog.onresult = (event: any) => {
        let current = '';
        for (let i = 0; i < event.results.length; i++) {
          current += event.results[i][0].transcript + ' ';
        }
        setTranscript(current.trim());
      };

      recog.onstart = () => {
        setIsListening(true);
      };

      recog.onerror = () => {
        setIsListening(false);
      };

      recog.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recog;

      try {
        recog.start();
      } catch {
        // Recognition start failed
      }
    } else {
      // Fallback simulated voice prompt for demo
      const timer = setTimeout(() => {
        setTranscript('How do I know if my maize is ready for harvesting, and what is the current market price in Plateau?');
        setIsListening(false);
      }, 2500);

      return () => clearTimeout(timer);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore
        }
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleMic = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore
        }
      }
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch {
          // Ignore
        }
      } else {
        setIsListening(true);
        setTimeout(() => {
          setTranscript('How many bags of fertilizer should I buy for 2 hectares of cassava?');
          setIsListening(false);
        }, 1500);
      }
    }
  };

  const handleSend = () => {
    if (transcript.trim()) {
      onSubmitVoiceText(transcript.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-5 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider">
            <Volume2 className="w-4 h-4 text-emerald-600" />
            <span>Voice Farm Question</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big tactile microphone button */}
        <div className="py-2">
          <button
            type="button"
            onClick={toggleMic}
            className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center text-white shadow-xl transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-600 ring-8 ring-rose-100 animate-pulse scale-105'
                : 'bg-emerald-700 hover:bg-emerald-800 ring-4 ring-emerald-100'
            }`}
          >
            {isListening ? (
              <Mic className="w-10 h-10 animate-bounce" />
            ) : (
              <MicOff className="w-10 h-10" />
            )}
          </button>
          <p className="mt-3 font-bold text-stone-800 text-sm">
            {isListening ? t('advisory.listeningVoice') : 'Tap mic to start speaking'}
          </p>
          <p className="text-xs text-stone-500">
            Speak in English, Hausa, Yoruba, Igbo, or Pidgin
          </p>
        </div>

        {/* Live Transcript Display Box */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 min-h-22.5 text-left flex flex-col justify-between">
          <span className="text-[10px] uppercase font-bold text-stone-400">Your Question:</span>
          <p className="text-sm font-semibold text-stone-900 mt-1 italic">
            {transcript || (
              <span className="text-stone-400 not-italic">
                "E.g., Which fertilizer is best for yam in Plateau?"
              </span>
            )}
          </p>
          <span className="text-[10px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Speech-to-Text active
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!transcript.trim()}
            onClick={handleSend}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 disabled:opacity-50 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>{t('advisory.send')}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
