import { createJSONStorage, persist } from 'zustand/middleware';

import { IChat } from '@/app/_util/types/types';
import { create } from 'zustand';

interface ChatState {
  chatRoomId: number;
  partInPeople: number;
  chatTitle: string | null;
  isGroup: boolean;
  setChat: (newData: IChat) => void;
  updateTitle: (modified: { chatTitle: string }) => void;
}

const chatStore = create(
  persist<ChatState>(
    (set) => ({
      chatRoomId: 0,
      partInPeople: 0,
      chatTitle: null,
      isGroup: false,
      setChat: (newData) =>
        set(() => ({
          partInPeople: newData.partInPeople,
          chatTitle: newData.chatTitle,
          isGroup: newData.isGroup,
        })),
      updateTitle: (modified: { chatTitle: string }) =>
        set(() => ({
          chatTitle: modified.chatTitle,
        })),
    }),
    {
      name: 'chatStorage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { chatStore };
