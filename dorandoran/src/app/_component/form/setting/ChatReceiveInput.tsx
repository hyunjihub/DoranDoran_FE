import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IMypage } from '@/app/_util/types/types';
import Toggle from '../../ui/Toggle';
import axios from 'axios';

export default function ChatReceiveInput({ isPermmited }: { isPermmited: boolean }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      await axios.post('/api/member/mypage/recommends', { isPermmited });
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], (oldData: IMypage) => {
        if (!oldData) return oldData;
        return { ...oldData, isPermitted: !oldData.isPermitted };
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="flex justify-between px-[16px] py-[18px]">
      <div>
        <p className="font-bold">1:1 채팅 수신 여부</p>
        <small className="text-gray-400">수신 거부 시 추천 친구에서 프로필이 표시되지 않습니다.</small>
      </div>

      <Toggle isActive={isPermmited} onToggle={() => mutation.mutate()} />
    </div>
  );
}
