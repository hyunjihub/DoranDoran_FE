'use client';

import { useParams, useRouter } from 'next/navigation';

import DeleteChatRoom from '@/app/_component/chat/DeleteChatRoom';
import { IRoomInfo } from '@/app/_util/types/types';
import RoomDescription from './roomInfo/RoomDescription';
import RoomImage from './roomInfo/RoomImage';
import RoomMaxCount from './roomInfo/RoomMaxCount';
import axios from 'axios';
import { useEffect } from 'react';
import useLogout from '@/app/_util/hooks/useLogout';
import { useQuery } from '@tanstack/react-query';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';

export default function RoomInfo() {
  const router = useRouter();
  const { id } = useParams();
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();

  const { data } = useQuery<IRoomInfo>({
    queryKey: ['room', id],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/chat/info?id=${id}`);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            return await requestWithRetry('get', `/api/chat/info?id=${id}`);
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
    refetchOnWindowFocus: false,
    retry: false,
    refetchInterval: false,
  });

  useEffect(() => {
    if (data === null) {
      alert('접근 가능한 페이지가 아닙니다.');
      router.push('/');
    }
  }, [data, router]);

  return (
    data && (
      <>
        <RoomImage info={data} />
        <RoomDescription info={data} />
        <div className="w-full flex justify-between items-center px-[16px] py-[18px] border-b">
          <p className="font-bold">현재 참여자 수</p>
          <p className="text-gray-400">{data.currentCount}명</p>
        </div>
        <RoomMaxCount info={data} />
        <DeleteChatRoom isManager={data.isManager} />
      </>
    )
  );
}
