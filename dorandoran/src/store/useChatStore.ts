import { createJSONStorage, persist } from 'zustand/middleware';

import { IChat } from '@/app/_util/types/types';
import { create } from 'zustand';

interface ChatState {
  chatRoomId: number;
  isManager: boolean | null;
  isAvaliable: boolean | null;
  chatTitle: string | null;
  setChat: (newData: IChat) => void;
  updateTitle: (modified: { chatTitle: string }) => void;
  updateState: (modified: { isAvaliable: boolean }) => void;
}

const chatStore = create(
  persist<ChatState>(
    (set) => ({
      chatRoomId: 0,
      isManager: null,
      isAvaliable: null,
      chatTitle: null,
      setChat: (newData) =>
        set(() => ({
          isManager: newData.isManager,
          isAvaliable: newData.isAvaliable,
          chatTitle: newData.chatTitle,
        })),
      updateTitle: (modified: { chatTitle: string }) =>
        set(() => ({
          chatTitle: modified.chatTitle,
        })),
      updateState: (modified: { isAvaliable: boolean }) =>
        set(() => ({
          isAvaliable: modified.isAvaliable,
        })),
    }),
    {
      name: 'chatStorage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { chatStore };
