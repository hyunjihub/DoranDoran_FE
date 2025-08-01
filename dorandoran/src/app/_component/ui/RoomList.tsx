'use client';

import { IRoomItem } from '@/app/_util/types/types';
import RoomItem from '../chatList/RoomItem';
import RoomSkeleton from '../chatList/RoomSkeleton';
import axios from 'axios';
import useLogout from '@/app/_util/hooks/useLogout';
import { useQuery } from '@tanstack/react-query';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';

type RoomListResponse = {
  data: IRoomItem[];
};

export default function RoomList() {
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();

  const { data, isLoading } = useQuery<RoomListResponse>({
    queryKey: ['newRoom'],
    queryFn: async () => {
      try {
        const response = await axios.get<RoomListResponse>(`/api/chat/chatrooms?cursor=0&limit=4`);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            return await requestWithRetry('get', `/api/chat/chatrooms?cursor=0&limit=4`);
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
    staleTime: 0,
    refetchOnMount: true,
  });

  return (
    <ul className="mt-4 grid grid-cols-2 gap-4">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, i) => <RoomSkeleton key={i} />)
      ) : data && data.data.length > 0 ? (
        data.data.map((room) => <RoomItem room={room} key={room.chatRoomId} />)
      ) : (
        <p className="col-span-2 text-center text-gray-500">참여 가능한 채팅방이 없습니다.</p>
      )}
    </ul>
  );
}
