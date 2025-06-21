'use client';

import { useEffect, useState } from 'react';

import { IRoomInfo } from '@/app/_util/types/types';
import MaxCountInput from '../MaxCountInput';
import axios from 'axios';
import useLogout from '@/app/_util/hooks/useLogout';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';

export default function RoomMaxCount({ info }: { info: IRoomInfo }) {
  const { id } = useParams();
  const [count, setCount] = useState(100);
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();

  useEffect(() => {
    setCount(info.maxCount);
  }, [info.maxCount]);

  const mutation = useMutation({
    mutationFn: async (num: number) => {
      try {
        await axios.patch('/api/chat/info/count', { chatRoomId: id, maxCount: num });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            return await requestWithRetry('patch', '/api/chat/info/count', { chatRoomId: id, maxCount: num });
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
    onSuccess: (_data, num) => {
      setCount(num);
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <div className="w-full border-b">
      {info.isManager ? (
        <MaxCountInput isManager={info.isManager} count={count} setCount={(num) => mutation.mutate(num)} />
      ) : (
        <div className="flex justify-between items-center px-[16px] py-[18px]">
          <p className="font-bold">최대 참여자 수</p>

          <div className="flex items-center gap-5">
            <p>{info.maxCount}명</p>
          </div>
        </div>
      )}
    </div>
  );
}
