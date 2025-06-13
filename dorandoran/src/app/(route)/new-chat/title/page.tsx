'use client';

import { useEffect, useState } from 'react';

import InfoInput from '@/app/_component/form/chat/InfoInput';
import ProtectedRoute from '@/app/_component/ProtectedRoute';
import createChatStore from '@/store/useCreateChatStore';
import { useNavigationHistory } from '@/app/_util/hooks/useNavigationHistory';
import { useRouter } from 'next/navigation';

export default function ChatTitle() {
  const router = useRouter();
  const [roomTitle, setRoomTitle] = useState<string>('');
  const setTitle = createChatStore((state) => state.setTitle);
  const chatRoomTitle = createChatStore((state) => state.chatRoomTitle);
  const { goBack } = useNavigationHistory();

  useEffect(() => {
    if (chatRoomTitle) setRoomTitle(chatRoomTitle);
  }, [chatRoomTitle]);

  const handleChange = () => {
    setTitle(roomTitle);
    const previousPage = goBack();
    router.push(previousPage);
  };

  return (
    <ProtectedRoute>
      <InfoInput inputData={roomTitle} setInputData={setRoomTitle} type="title" onChange={handleChange} />
    </ProtectedRoute>
  );
}
