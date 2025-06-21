'use client';

import Image from 'next/image';
import axios from 'axios';
import { chatStore } from '@/store/useChatStore';
import leave from '/public/img/icon/leave.svg';
import useLogout from '@/app/_util/hooks/useLogout';
import { useMutation } from '@tanstack/react-query';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';
import { useRouter } from 'next/navigation';
import { websocketStore } from '@/store/useWebsocketStore';

export default function PrivateRoomLeave() {
  const router = useRouter();
  const chatRoomId = chatStore((state) => state.chatRoomId);
  const unsubscribeRoom = websocketStore((state) => state.unsubscribeRoom);
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        await axios.delete(`/api/chat/chatrooms?privateId=${chatRoomId}`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            return await requestWithRetry('delete', `/api/chat/chatrooms?privateId=${chatRoomId}`);
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
    onSuccess: () => {
      unsubscribeRoom();
      router.push('/mychat');
    },
    onError: () => {
      alert('오류');
    },
  });

  const handleRoomLeave = () => {
    if (confirm('채팅방을 나가시겠습니까?')) {
      mutation.mutate();
    }
  };

  return (
    <button className="absolute right-[16px]" onClick={handleRoomLeave}>
      <Image src={leave} alt="채팅방 나가기" width={32} height={32} />
    </button>
  );
}
