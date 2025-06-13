import { create } from 'zustand';

interface ChatState {
  chatRoomTitle: string | null;
  description: string | null;
  maxCount: number;
  chatRoomImage: string | null;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setImage: (image: string) => void;
  setMax: (count: number) => void;
  reset: () => void;
}

const createChatStore = create<ChatState>((set) => ({
  chatRoomTitle: null,
  description: null,
  maxCount: 100,
  chatRoomImage: null,
  setTitle: (title) => set({ chatRoomTitle: title }),
  setDescription: (description) => set({ description }),
  setImage: (image) => set({ chatRoomImage: image }),
  setMax: (count) => set({ maxCount: count }),
  reset: () =>
    set({
      chatRoomImage: null,
      chatRoomTitle: null,
      maxCount: 100,
      description: null,
    }),
}));

export default createChatStore;
