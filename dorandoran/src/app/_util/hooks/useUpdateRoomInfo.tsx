'use client';

import { IRoomInfo } from '@/app/_util/types/types';
import axios from 'axios';
import { chatStore } from '@/store/useChatStore';
import useLogout from '@/app/_util/hooks/useLogout';
import { useQueryClient } from '@tanstack/react-query';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';

export default function useUpdateRoomInfo(id: string) {
  const queryClient = useQueryClient();
  const setChat = chatStore((state) => state.setChat);
  const isClose = chatStore((state) => state.isClose);
  const isGroup = chatStore((state) => state.isGroup);
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();

  const updateRoomInfo = async () => {
    try {
      const roomInfo = await queryClient.fetchQuery<IRoomInfo>({
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
