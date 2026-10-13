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
    text: 'Sannu! Welcome to **Malam Noma AI Farm Advisory** 🌾\n\nI am your digital agricultural assistant for Nigerian farming conditions. You can ask me any question about:\n- 🌽 When to plant and how to space your crops\n- 🧪 Fertilizer schedules (NPK 15:15:15, Urea, Organic Manure)\n- 🐛 Identifying and managing pests (Fall Armyworm, Blights, Stem Borers)\n- 💰 Storage methods and grain market tips\n\n*Tap a quick question below or type/speak your question!*',
    timestamp: '08:00 AM',
    topic: 'crops',
    quickReplies: [
      'When is the best time to plant maize in Kaduna?',
      'How can I store yam tubers to prevent rot?',
      'What are the recommended fertilizer rates in Nigeria?'
    ],
    disclaimer: 'NomaAi Advisory operates with Nigerian Agricultural dataset simulation.'
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
      name: 'nomaai_chat_records'
    }
  )
);
