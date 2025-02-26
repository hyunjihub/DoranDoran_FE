import { IChat, IUser } from '@/app/_util/types/types';
import { createJSONStorage, persist } from 'zustand/middleware';

import { create } from 'zustand';

interface UserState {
  userId: string | null;
  profileImg: string | null;
  nickname: string | null;
  accessToken: string | null;
  setData: (newData: IUser) => void;
  updateData: (modified: { profileImg: string; nickname: string }) => void;
  reissueAccessToken: (newToken: string) => void;
}

interface ChatState {
  isManager: boolean | null;
  isAvaliable: boolean | null;
  chatTitle: string | null;
  setChat: (newData: IChat) => void;
  updateTitle: (modified: { chatTitle: string }) => void;
  updateState: (modified: { isAvaliable: boolean }) => void;
}
const useStore = create(
  persist<UserState>(
    (set) => ({
      userId: null,
      profileImg: null,
      nickname: null,
      accessToken: null,
      setData: (newData) =>
        set(() => ({
          userId: newData.userId,
          profileImg: newData.profileImg,
          nickname: newData.nickname,
          accessToken: newData.accessToken,
        })),
      updateData: (modified: { profileImg: string; nickname: string }) =>
        set(() => ({
          profileImg: modified.profileImg,
          nickname: modified.nickname,
        })),
      reissueAccessToken: (newToken: string) =>
        set(() => ({
          accessToken: newToken,
        })),
    }),
    {
      name: 'userStorage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

const chatStore = create(
  persist<ChatState>(
    (set) => ({
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

export { useStore, chatStore };
