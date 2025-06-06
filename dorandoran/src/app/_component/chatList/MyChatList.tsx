'use client';

import ChatListItem from '../chat/ChatListItem';
import { IRoom } from '@/app/_util/types/types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function MyChatList() {
  const { data } = useQuery<IRoom[]>({
    queryKey: ['myChat'],
    queryFn: async () => {
      const response = await axios.get<IRoom[]>(`/api/chat/lists`);
      return response.data;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  return (
    <ul className="h-full">
      {data && data?.length > 0 ? (
        data.map((room, key) => {
          return <ChatListItem room={room} key={key} />;
        })
      ) : data && data.length === 0 ? (
        <div className="h-full flex flex-col justify-center items-center">
          <p className="text-xl font-bold">참여 중인 채팅방이 존재하지 않습니다.</p>
          <small className="text-gray-500">도란도란에서 다양한 사람들과 채팅을 즐겨보세요.</small>
        </div>
      ) : (
        <></>
      )}
    </ul>
  );
}
