import { IChat, IUser } from '@/app/_util/types/types';
import { createJSONStorage, persist } from 'zustand/middleware';

import { create } from 'zustand';

interface UserState {
  user: IUser;
  isLoggedIn: boolean;
  isLoggingOut: boolean;
  login: (newData: IUser) => void;
  logout: () => void;
  updateData: (modified: { profileImg: string; nickname: string }) => void;
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
      user: {
        memberId: null,
        profileImg: null,
        nickname: null,
      },
      isLoggedIn: false,
      isLoggingOut: false,

      login: (newData) =>
        set(() => ({
          user: { ...newData },
          isLoggedIn: true,
        })),

      logout: () => {
        set(() => ({
          user: {
            memberId: null,
            profileImg: null,
            nickname: null,
          },
          isLoggedIn: false,
          isLoggingOut: true,
        }));

        setTimeout(() => {
          set(() => ({ isLoggingOut: false }));
        }, 100);
      },

      updateData: (modified) =>
        set((state) => ({
          user: {
            ...state.user,
            profileImg: modified.profileImg,
            nickname: modified.nickname,
          },
        })),
    }),
    {
      name: 'userStorage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? sessionStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
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
