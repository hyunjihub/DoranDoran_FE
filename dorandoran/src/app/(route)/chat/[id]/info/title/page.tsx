'use client';

import { useEffect, useState } from 'react';

import InfoInput from '@/app/_component/form/chat/InfoInput';
import ProtectedRoute from '@/app/_component/ProtectedRoute';
import { createChatStore } from '@/store/useCreateChat';

export default function ChatTitle() {
  const [roomTitle, setRoomTitle] = useState<string>('');
  const chatRoomTitle = createChatStore((state) => state.chatRoomTitle);

  useEffect(() => {
    if (chatRoomTitle) setRoomTitle(chatRoomTitle);
  }, [chatRoomTitle]);

  return (
    <ProtectedRoute>
      <InfoInput inputData={roomTitle} setInputData={setRoomTitle} type="title" />
    </ProtectedRoute>
  );
}
