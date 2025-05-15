'use client';

import Chatting from '@/app/_component/chat/Chatting';
import MessageInput from '@/app/_component/chat/MessageInput';
import Profile from '@/app/_component/chat/Profile';
import ProtectedRoute from '@/app/_component/ProtectedRoute';
import { useState } from 'react';

export default function PrivateChat() {
  const [modalOpen, setModalOpen] = useState(-1);

  return (
    <ProtectedRoute>
      <div className="h-full flex flex-col">
        <Chatting setModalOpen={setModalOpen} />
        <MessageInput />
        {modalOpen != -1 && <Profile id={modalOpen} setModalOpen={setModalOpen} />}
      </div>
    </ProtectedRoute>
  );
}
