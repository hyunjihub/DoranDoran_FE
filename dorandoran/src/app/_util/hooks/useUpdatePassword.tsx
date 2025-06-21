'use client';

import { IFindForm } from '@/app/_util/types/types';
import axios from 'axios';
import useLogout from '@/app/_util/hooks/useLogout';
import { useMutation } from '@tanstack/react-query';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';
import { useRouter } from 'next/navigation';
import { userStore } from '@/store/useUserStore';

export default function useUpdatePassword() {
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const executeLogout = useLogout({ type: 'session' });
  const logout = useLogout({ type: 'logout' });
  const requestWithRetry = useRequestWithAuthRetry();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: IFindForm) => {
      try {
        await axios.patch('/api/member/password', { email: data.email, newPassword: data.password });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            return await requestWithRetry('patch', '/api/member/password', {
              email: data.email,
              newPassword: data.password,
            });
          } else if (status === 401 && message === 'refreshToken 만료') {
            executeLogout();
            throw new Error('로그아웃 되었습니다. 다시 로그인 해주세요.');
          } else {
            alert(error.response?.data || error.message);
          }
          throw error;
        } else {
          throw error;
        }
      }
    },
    onSuccess: () => {
      if (isLoggedIn) {
        logout();
        localStorage.removeItem('doran-rememberMe');
      }
      router.push('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
}
