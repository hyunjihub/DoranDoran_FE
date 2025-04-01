'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IMypage } from '@/app/_util/types/types';
import Toggle from '../../ui/Toggle';
import axios from 'axios';

export default function PushNotificationInput({ isNotification }: { isNotification: boolean }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      await axios.patch('/api/member/mypage/notification');
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
