'use client';

import axios from 'axios';
import useLogout from '@/app/_util/hooks/useLogout';
import { useMutation } from '@tanstack/react-query';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';
import { useRouter } from 'next/navigation';

export default function useWithdraw(input: string) {
  const executeLogout = useLogout({ type: 'session' });
  const logout = useLogout({ type: 'logout' });
  const requestWithRetry = useRequestWithAuthRetry();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        await axios.delete('/api/member/withdraw', {
          data: {
            password: input,
          },
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const msg = error.response?.data?.message;
          const status = error.response?.status;
          if (status === 401 && msg === 'accessToken 만료') {
            return await requestWithRetry('delete', '/api/member/withdraw', {
              password: input,
            });
          } else if (status === 401 && msg === 'refreshToken 만료') {
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
      logout();
      router.push('/');
    },
    onError: (error) => {
      alert(error);
    },
  });

  return mutation;
}
