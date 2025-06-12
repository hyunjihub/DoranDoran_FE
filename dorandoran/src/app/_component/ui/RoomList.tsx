'use client';

import { IRoomItem } from '@/app/_util/types/types';
import RoomItem from '../chatList/RoomItem';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type RoomListResponse = {
  data: IRoomItem[];
};

export default function RoomList() {
  const { data } = useQuery({
    queryKey: ['newRoom'],
    queryFn: async () => {
      const response = await axios.get<RoomListResponse>(`/api/chat/chatrooms?cursor=0&limit=4`);
      return response.data;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  return (
    <ul className="mt-4 grid grid-cols-2 gap-4">
      {(data?.data ?? []).map((room, key) => (
        <RoomItem room={room} key={key} />
      ))}
    </ul>
  );
}
