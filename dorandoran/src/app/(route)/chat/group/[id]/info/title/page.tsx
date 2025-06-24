'use client';

import { useEffect, useState } from 'react';

import InfoInput from '@/app/_component/form/chat/InfoInput';
import ProtectedRoute from '@/app/_component/ProtectedRoute';
import axios from 'axios';
import { chatStore } from '@/store/useChatStore';
import createChatStore from '@/store/useCreateChatStore';
import useLogout from '@/app/_util/hooks/useLogout';
import { useMutation } from '@tanstack/react-query';
import { useNavigationHistory } from '@/app/_util/hooks/useNavigationHistory';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';
import { useRouter } from 'next/navigation';
import { websocketStore } from '@/store/useWebsocketStore';

export default function ChatTitle() {
  const [roomTitle, setRoomTitle] = useState<string>('');
  const subscribedRoomId = websocketStore((state) => state.subscribedRoomId);
  const chatRoomTitle = createChatStore((state) => state.chatRoomTitle);
  const updateTitle = chatStore((state) => state.updateTitle);
  const router = useRouter();
  const { goBack } = useNavigationHistory();
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();

  useEffect(() => {
    if (chatRoomTitle) setRoomTitle(chatRoomTitle);
  }, [chatRoomTitle]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!chatRoomTitle) {
        alert('제목은 공백일 수 없습니다.');
        return;
      } else if (chatRoomTitle && chatRoomTitle.length > 15) {
        alert('제목은 1자 이상 15자 이하입니다.');
        return;
      }
      try {
        await axios.patch('/api/chat/info/title', { chatRoomId: subscribedRoomId, chatRoomTitle: roomTitle });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            return await requestWithRetry('patch', '/api/chat/info/title', {
              chatRoomId: subscribedRoomId,
              chatRoomTitle: roomTitle,
            });
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
      updateTitle({ chatTitle: roomTitle });
      const previousPage = goBack();
      router.push(previousPage);
    },
    onError: () => {
      alert('오류');
    },
  });

  return (
    <ProtectedRoute>
      <InfoInput inputData={roomTitle} setInputData={setRoomTitle} type="title" onChange={() => mutation.mutate} />
    </ProtectedRoute>
  );
}
