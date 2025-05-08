'use client';

import Chatting from '@/app/_component/chat/Chatting';
import MessageInput from '@/app/_component/chat/MessageInput';
import ProtectedRoute from '@/app/_component/ProtectedRoute';
import { chatStore } from '@/store/useChatStore';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { websocketStore } from '@/store/useWebsocketStore';

export default function Chat() {
  const { setChat } = chatStore();
  const subscribeRoom = websocketStore((state) => state.subscribeRoom);
  const { id } = useParams();

  useEffect(() => {
    setChat({
      isManager: true,
      isAvaliable: true,
      chatTitle: '임시 채팅 제목',
    });
    subscribeRoom(Number(id), 'group');
  }, [setChat, subscribeRoom, id]);

  return (
    <ProtectedRoute>
      <div className="h-full px-[16px] flex flex-col">
        <Chatting />
        <MessageInput />
      </div>
    </ProtectedRoute>
  );
}
