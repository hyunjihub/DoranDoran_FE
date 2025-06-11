'use client';

import { IRoomInfo } from '@/app/_util/types/types';
import axios from 'axios';
import { chatStore } from '@/store/useChatStore';
import { useQueryClient } from '@tanstack/react-query';

export default function useUpdateRoomInfo(id: string) {
  const queryClient = useQueryClient();
  const setChat = chatStore((state) => state.setChat);
  const isClose = chatStore((state) => state.isClose);
  const isGroup = chatStore((state) => state.isGroup);

  const updateRoomInfo = async () => {
    try {
      const roomInfo = await queryClient.fetchQuery<IRoomInfo>({
        queryKey: ['room', id],
        queryFn: async () => {
          const response = await axios.get(`/api/chat/info?id=${id}`);
          return response.data;
        },
      });

      if (roomInfo) {
        setChat({
          isClose,
          isGroup,
          partInPeople: roomInfo.currentCount,
          chatTitle: roomInfo.chatRoomTitle,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  return updateRoomInfo;
}
