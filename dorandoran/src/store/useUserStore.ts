import { createJSONStorage, persist } from 'zustand/middleware';

import { IUser } from '@/app/_util/types/types';
import { create } from 'zustand';

interface UserState {
  user: IUser;
  isLoggedIn: boolean;
  isLoggingOut: boolean;
  login: (newData: IUser) => void;
  logout: () => void;
  updateData: (modified: { profileImage: string; nickname: string }) => void;
}

const userStore = create(
  persist<UserState>(
    (set) => ({
      user: {
        memberId: null,
        profileImage: null,
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
            profileImage: null,
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
            profileImage: modified.profileImage,
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

export { userStore };
