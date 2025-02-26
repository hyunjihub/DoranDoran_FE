'use client';

import Chatting from '@/app/_component/chat/Chatting';
import TextInput from '@/app/_component/chat/TextInput';
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
    <div className="h-full px-[16px] flex flex-col">
      <Chatting />
      <TextInput />
    </div>
  );
}
