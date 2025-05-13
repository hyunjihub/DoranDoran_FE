'use client';

import { useEffect, useState } from 'react';

import Chatting from '@/app/_component/chat/Chatting';
import MessageInput from '@/app/_component/chat/MessageInput';
import Profile from '@/app/_component/chat/Profile';
import ProtectedRoute from '@/app/_component/ProtectedRoute';
import { chatStore } from '@/store/useChatStore';
import { useParams } from 'next/navigation';
import { websocketStore } from '@/store/useWebsocketStore';

export default function Chat() {
  const { setChat } = chatStore();
  const subscribeRoom = websocketStore((state) => state.subscribeRoom);
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(-1);

  useEffect(() => {
    setChat({
      isManager: true,
      isGroup: true,
      partInPeople: 7,
      chatTitle: '임시 채팅 제목',
    });
    subscribeRoom(Number(id), 'group');
  }, [setChat, subscribeRoom, id]);

  return (
    <ProtectedRoute>
      <div className="h-full px-[16px] flex flex-col">
        <Chatting setModalOpen={setModalOpen} />
        <MessageInput />
      </div>
      {modalOpen != -1 && <Profile id={modalOpen} />}
    </ProtectedRoute>
  );
}
