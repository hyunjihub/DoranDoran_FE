'use client';

import { IRoomItem } from '../types/types';
import axios from 'axios';
import { chatStore } from '@/store/useChatStore';
import useLogout from '@/app/_util/hooks/useLogout';
import { useMutation } from '@tanstack/react-query';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';
import { useRouter } from 'next/navigation';
import { websocketStore } from '@/store/useWebsocketStore';

export default function useJoinGroupRoom(room: IRoomItem) {
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();
  const router = useRouter();
  const setChat = chatStore((state) => state.setChat);
  const subscribeRoom = websocketStore((state) => state.subscribeRoom);

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        await axios.post(`/api/chat/group`, { chatRoomId: room.chatRoomId });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            return await requestWithRetry('post', `/api/chat/group`, { chatRoomId: room.chatRoomId });
          } else if (status === 401 && message === 'refreshToken 만료') {
            executeLogout();
            throw new Error('로그아웃 되었습니다. 다시 로그인 해주세요.');
          } else if (message === '이미 입장한 채팅방입니다.') {
            return;
          } else if (message === '채팅방에 더이상 참여할 수 없습니다.') {
            alert('채팅방 최대 인원 수를 초과하여 입장할 수 없습니다.');
          } else {
            alert(error.response?.data || error.message);
          }
          throw error;
        } else {
          throw error;
        }
      }
    },
    onSuccess: () => {
      setChat({
        isClose: false,
        isGroup: true,
        partInPeople: room.partInPeople,
        chatTitle: room.chatRoomTitle,
      });
      subscribeRoom(room.chatRoomId, 'group');
      router.push(`/chat/group/${room.chatRoomId}`);
    },
    onError: () => {
      alert('오류');
    },
  });

  return mutation;
}
