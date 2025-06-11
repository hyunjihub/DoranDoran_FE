'use client';

import { useParams, useRouter } from 'next/navigation';

import DeleteChatRoom from '@/app/_component/chat/DeleteChatRoom';
import { IRoomInfo } from '@/app/_util/types/types';
import RoomDescription from './roomInfo/RoomDescription';
import RoomImage from './roomInfo/RoomImage';
import RoomMaxCount from './roomInfo/RoomMaxCount';
import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function RoomInfo() {
  const router = useRouter();
  const { id } = useParams();

  const { data } = useQuery<IRoomInfo>({
    queryKey: ['room', id],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/chat/info?id=${id}`);
        return response.data;
      } catch {
        return null;
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
