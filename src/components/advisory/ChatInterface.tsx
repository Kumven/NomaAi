import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Bot, User, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useChatStore } from '../../store/useChatStore';
import { useAppStore } from '../../store/useAppStore';
import { askMalamNoma } from '../../services/advisoryService';
import { ApiError } from '../../services/api';
import { ACTION_COSTS } from '../../config/pricing';
import { useWalletStore } from '../../store/useWalletStore';
import { AudioPlayerButton } from '../common/AudioPlayerButton';
import { QuickQuestionChips } from './QuickQuestionChips';
import { VoicePromptModal } from './VoicePromptModal';
import type { AdvisoryMessage } from '../../types';
import { Link } from 'react-router-dom';

function generateMessageId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function getFormattedTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export const ChatInterface: React.FC = () => {
  const { t } = useTranslation();
  const { messages, addMessage, clearChat } = useChatStore();
  const { language, isOffline } = useAppStore();
  const { balance, fetchWallet, openTopUpModal } = useWalletStore();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [actionError, setActionError] = useState('');
  const sendingRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || sendingRef.current) return;
    if (isOffline) {
      setActionError(t('credits.offline'));
      return;
    }
    if (balance !== null && balance < ACTION_COSTS.chatMessage) {
      openTopUpModal();
      return;
    }

    sendingRef.current = true;
    const currentTime = getFormattedTime();
    const userMsg: AdvisoryMessage = {
      id: generateMessageId('farmer'),
      sender: 'farmer',
      text: trimmed,
      timestamp: currentTime
    };

    addMessage(userMsg);
    setInputText('');
    setIsLoading(true);
    setActionError('');

    try {
      const response = await askMalamNoma(trimmed, language);
      addMessage(response);
      void fetchWallet();
    } catch (err) {
      console.error('Error getting advisory:', err);
      if (err instanceof ApiError && err.status === 402) {
        openTopUpModal();
        setActionError(t('credits.insufficient'));
      } else {
        setActionError(err instanceof Error ? err.message : t('advisory.requestFailed'));
      }
    } finally {
      setIsLoading(false);
      sendingRef.current = false;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-170px)] sm:h-[calc(100vh-160px)] max-w-2xl mx-auto bg-stone-50 rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
      {/* Chat Sub-Header */}
      <div className="bg-white px-4 py-3 border-b border-stone-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-sm text-stone-900">Malam Noma AI</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-stone-500">Certified Agro-Advisory Engine</p>
          </div>
        </div>

        <button
          type="button"
          onClick={clearChat}
          className="p-2 text-stone-400 hover:text-rose-600 rounded-xl hover:bg-stone-100 transition cursor-pointer"
          title="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2 border-b border-[#D5EEDC] bg-amber-50 px-4 py-3">
        <p className="text-xs leading-relaxed text-amber-950">
          {t('safety.guidanceOnly')} {t('credits.actionCost', { cost: ACTION_COSTS.chatMessage })}
        </p>
        <Link to="/directory" className="text-xs font-bold text-[#2D6A4F] underline">
          {t('safety.contactConsultant')}
        </Link>
      </div>

      {actionError && (
        <p role="alert" className="mx-3 mt-2 rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-800">
          {actionError}
        </p>
      )}
      {isOffline && !actionError && (
        <p role="status" className="mx-3 mt-2 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-900">
          {t('credits.offline')}
        </p>
      )}

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.sender === 'farmer';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isMe
                    ? 'bg-stone-800 text-white'
                    : 'bg-emerald-700 text-white ring-2 ring-emerald-100'
                }`}
              >
                {isMe ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 space-y-2 text-xs sm:text-sm leading-relaxed ${
                  isMe
                    ? 'bg-emerald-800 text-white rounded-tr-xs'
                    : 'bg-white border border-stone-200 text-stone-800 shadow-2xs rounded-tl-xs'
                }`}
              >
                {/* Text Content */}
                <div className="whitespace-pre-line font-normal space-y-1">
                  {msg.text.split('\n\n').map((para, i) => (
                    <p key={i}>
                      {para.startsWith('**') ? (
                        <span className="font-bold text-emerald-950 block">{para.replace(/\*\*/g, '')}</span>
                      ) : (
                        para.replace(/\*\*/g, '')
                      )}
                    </p>
                  ))}
                </div>

                {/* Footer of Bubble: Timestamp & Audio read aloud */}
                <div
                  className={`flex items-center justify-between gap-2 pt-1 border-t text-[10px] ${
                    isMe ? 'border-emerald-700/60 text-emerald-200' : 'border-stone-100 text-stone-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>

                  {!isMe && (
                    <AudioPlayerButton
                      text={msg.text}
                      label=""
                      variant="subtle"
                      className="px-2 py-1 text-[11px] rounded-lg"
                    />
                  )}
                </div>

                {/* Quick replies */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {msg.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(reply)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-[11px] border border-emerald-200 text-left cursor-pointer transition"
                      >
                        ↳ {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs rounded-tl-xs flex items-center gap-2 text-xs text-stone-500">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>Malam Noma is formulating recommendation...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Ribbon */}
      <div className="px-4 py-2 bg-[#F4FAF5] border-t border-[#D5EEDC]">
        <QuickQuestionChips onSelectQuestion={(q) => handleSendMessage(q)} />
      </div>

      {/* Input Form Bar */}
      <div className="bg-white p-3 border-t border-[#D5EEDC]">
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
          {/* Voice Prompt Button */}
          <button
            type="button"
            onClick={() => setIsVoiceOpen(true)}
            className="p-3 rounded-2xl bg-[#EAF7EE] hover:bg-[#D5EEDC] text-[#132E1E] transition flex items-center justify-center cursor-pointer shrink-0 border border-[#D5EEDC]"
            title="Ask by Voice"
          >
            <Mic className="w-5 h-5 text-[#2D6A4F]" />
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading || isOffline}
            placeholder={t('advisory.inputPlaceholder')}
            className="flex-1 px-4 py-3 bg-[#F4FAF5] rounded-2xl border border-[#D5EEDC] text-xs sm:text-sm text-[#132E1E] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white transition"
          />

          {/* Send Button - Golden Figma Accent */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading || isOffline}
            className="p-3 rounded-2xl btn-golden hover:bg-[#E59828] disabled:opacity-40 text-[#161513] transition flex items-center justify-center cursor-pointer shrink-0 shadow-xs"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        <p className="text-[10px] text-stone-400 text-center mt-2">
          {t('credits.actionCost', { cost: ACTION_COSTS.chatMessage })} · {t('advisory.disclaimer')}
        </p>
      </div>

      {/* Voice Prompt Modal */}
      <VoicePromptModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onSubmitVoiceText={(text) => handleSendMessage(text)}
      />
    </div>
  );
};
