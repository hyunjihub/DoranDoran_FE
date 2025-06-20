'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IMypage } from '@/app/_util/types/types';
import Toggle from '../../ui/Toggle';
import axios from 'axios';
import useLogout from '@/app/_util/hooks/useLogout';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';

export default function PushNotificationInput({ isNotification }: { isNotification: boolean }) {
  const queryClient = useQueryClient();
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        await axios.patch('/api/member/mypage/notification');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            return await requestWithRetry('patch', '/api/member/mypage/notification');
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
      queryClient.setQueryData(['user'], (oldData: IMypage) => {
        if (!oldData) return oldData;
        return { ...oldData, isNotification: !oldData.isNotification };
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="flex justify-between px-[16px] py-[18px]">
      <p className="font-bold">푸시 알림</p>

      <Toggle isActive={isNotification} onToggle={() => mutation.mutate()} />
    </div>
  );
}
