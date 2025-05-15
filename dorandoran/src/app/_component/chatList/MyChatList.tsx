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
    <ul>
      {data &&
        data.map((room, key) => {
          return <ChatListItem room={room} key={key} />;
        })}
    </ul>
  );
}
