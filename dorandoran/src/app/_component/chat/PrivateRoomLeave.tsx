'use client';

import ConfirmModal from '../ui/ConfirmModal';
import Image from 'next/image';
import axios from 'axios';
import { chatStore } from '@/store/useChatStore';
import leave from '/public/img/icon/leave.svg';
import useLogout from '@/app/_util/hooks/useLogout';
import { useMutation } from '@tanstack/react-query';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { websocketStore } from '@/store/useWebsocketStore';

export default function PrivateRoomLeave() {
  const router = useRouter();
  const chatRoomId = chatStore((state) => state.chatRoomId);
  const unsubscribeRoom = websocketStore((state) => state.unsubscribeRoom);
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();
  const [isActive, setIsActive] = useState(false);

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

  return (
    <>
      <button className="absolute right-[16px]" onClick={() => setIsActive(true)}>
        <Image src={leave} alt="채팅방 나가기" width={32} height={32} />
      </button>
      {isActive && (
        <ConfirmModal
          setIsActive={setIsActive}
          title={'채팅방 나가기'}
          description={'채팅방을 나가시겠습니까?\n나간 채팅방에서의 기록은 복구되지 않습니다.'}
          confirmText={'나가기'}
          onConfirm={() => mutation.mutate}
          isPending={mutation.isPending}
        />
      )}
    </>
  );
}
