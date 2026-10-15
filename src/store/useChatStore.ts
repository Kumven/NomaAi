import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AdvisoryMessage } from '../types';

interface ChatState {
  messages: AdvisoryMessage[];
  addMessage: (message: AdvisoryMessage) => void;
  clearChat: () => void;
}

const INITIAL_WELCOME_MESSAGES: AdvisoryMessage[] = [
  {
    id: 'welcome-1',
    sender: 'assistant',
    text: 'Sannu! Welcome to **Malam Noma AI Farm Advisory** 🌾\n\nI am your digital agricultural assistant for Plateau State farmers. You can ask me about:\n- 🌽 Planting seasons and crop spacing for Plateau farms\n- 🧪 Fertilizer schedules (NPK 15:15:15, Urea, Organic Manure)\n- 🐛 Identifying and managing pests (Fall Armyworm, Blights, Stem Borers)\n- 💰 Storage methods and local farm input tips\n\n*Tap a quick question below or type/speak your question!*',
    timestamp: '08:00 AM',
    topic: 'crops',
    quickReplies: [
      'When is the best time to plant maize in Plateau State?',
      'How can I store yam tubers to prevent rot?',
      'What fertilizer rates are recommended for Plateau farms?'
    ],
    disclaimer: 'NomaAi Advisory operates with a Plateau State agricultural dataset simulation.'
  }
];

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: INITIAL_WELCOME_MESSAGES,
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message]
        })),
      clearChat: () => set({ messages: INITIAL_WELCOME_MESSAGES })
    }),
    {
      name: 'nomaai_chat_records',
      merge: (persistedState, currentState) => {
        const persisted = persistedState && typeof persistedState === 'object'
          ? persistedState as Partial<ChatState>
          : {};
        return {
          ...currentState,
          ...persisted,
          messages: (persisted.messages || currentState.messages).map((message) =>
            message.id === 'welcome-1' ? INITIAL_WELCOME_MESSAGES[0] : message
          )
        };
      }
    }
  )
);
