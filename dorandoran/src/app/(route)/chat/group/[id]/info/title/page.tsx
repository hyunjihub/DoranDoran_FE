'use client';

import { useEffect, useState } from 'react';

import InfoInput from '@/app/_component/form/chat/InfoInput';
import ProtectedRoute from '@/app/_component/ProtectedRoute';
import axios from 'axios';
import { chatStore } from '@/store/useChatStore';
import { createChatStore } from '@/store/useCreateChatStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigationHistory } from '@/app/_util/hooks/useNavigationHistory';
import { useRouter } from 'next/navigation';
import { websocketStore } from '@/store/useWebsocketStore';

export default function ChatTitle() {
  const [roomTitle, setRoomTitle] = useState<string>('');
  const subscribedRoomId = websocketStore((state) => state.subscribedRoomId);
  const chatRoomTitle = createChatStore((state) => state.chatRoomTitle);
  const updateTitle = chatStore((state) => state.updateTitle);
  const router = useRouter();
  const { goBack } = useNavigationHistory();

  useEffect(() => {
    if (chatRoomTitle) setRoomTitle(chatRoomTitle);
  }, [chatRoomTitle]);

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.patch('/api/chat/info/title', { chatRoomId: subscribedRoomId, chatRoomTitle: roomTitle });
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
