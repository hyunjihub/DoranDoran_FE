'use client';

import Chatting from '@/app/_component/chat/Chatting';
import MessageInput from '@/app/_component/chat/MessageInput';
import ProtectedRoute from '@/app/_component/ProtectedRoute';
import { chatStore } from '@/store/useStore';
import { useEffect } from 'react';

export default function Chat() {
  const { setChat } = chatStore();

  useEffect(() => {
    setChat({
      isManager: true,
      isAvaliable: true,
      chatTitle: '임시 채팅 제목',
    });
  }, [setChat]);

  return (
    <ProtectedRoute>
      <div className="h-full px-[16px] flex flex-col">
        <Chatting />
        <MessageInput />
      </div>
    </ProtectedRoute>
  );
}
