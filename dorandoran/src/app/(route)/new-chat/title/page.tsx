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
    if (!chatRoomTitle) {
      alert('제목은 공백일 수 없습니다.');
      return;
    } else if (chatRoomTitle && chatRoomTitle.length > 15) {
      alert('제목은 1자 이상 15자 이하입니다.');
      return;
    }
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
