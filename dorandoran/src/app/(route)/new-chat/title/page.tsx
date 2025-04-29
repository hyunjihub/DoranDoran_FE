'use client';

import { useEffect, useState } from 'react';

import ProtectedRoute from '@/app/_component/ProtectedRoute';
import TextInput from '@/app/_component/form/setting/TextInput';
import { createChatStore } from '@/store/useCreateChat';
import { useNavigationHistory } from '@/app/_util/hooks/useNavigationHistory';
import { useRouter } from 'next/navigation';

export default function ChatTitle() {
  const setTitle = createChatStore((state) => state.setTitle);
  const chatRoomTitle = createChatStore((state) => state.chatRoomTitle);
  const [roomTitle, setRoomTitle] = useState('');
  const router = useRouter();
  const { goBack } = useNavigationHistory();

  useEffect(() => {
    if (chatRoomTitle) setRoomTitle(chatRoomTitle);
  }, [chatRoomTitle]);

  const handleTitle = () => {
    setTitle(roomTitle);
    const previousPage = goBack();
    router.push(previousPage);
  };

  return (
    <ProtectedRoute>
      <div className="h-full flex flex-col bg-[#eaeaea]">
        <label className="mt-[40px] ml-[16px] font-bold">채팅방 이름</label>
        <TextInput inputData={roomTitle} setInputData={setRoomTitle} placeholder={'채팅방 이름'} />
        <p className="ml-[16px] mt-2 text-gray-400 text-xs">채팅방 이름은 최대 15글자까지 가능합니다.</p>
        <button className="mt-5 text-white font-bold bg-[#7B3796] py-[12px]" onClick={handleTitle}>
          채팅방 이름 설정
        </button>
      </div>
    </ProtectedRoute>
  );
}
