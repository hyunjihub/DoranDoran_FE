'use client';

import { useEffect, useState } from 'react';

import ProtectedRoute from '@/app/_component/ProtectedRoute';
import TextInput from '@/app/_component/form/setting/TextInput';
import { createChatStore } from '@/store/useCreateChat';
import { useNavigationHistory } from '@/app/_util/hooks/useNavigationHistory';
import { useRouter } from 'next/navigation';

export default function Description() {
  const setDescription = createChatStore((state) => state.setDescription);
  const description = createChatStore((state) => state.description);
  const [roomDescription, setRoomDescription] = useState('');
  const router = useRouter();
  const { goBack } = useNavigationHistory();

  useEffect(() => {
    if (description) setRoomDescription(description);
  }, [description]);

  const handleDescription = () => {
    setDescription(roomDescription);
    const previousPage = goBack();
    router.push(previousPage);
  };

  return (
    <ProtectedRoute>
      <div className="h-full flex flex-col bg-[#eaeaea]">
        <label className="mt-[40px] ml-[16px] font-bold">채팅방 소개</label>
        <TextInput inputData={roomDescription} setInputData={setRoomDescription} placeholder={'채팅방 소개'} />
        <p className="ml-[16px] mt-2 text-gray-400 text-xs">채팅방 소개 문구는 최대 255글자까지 가능합니다.</p>
        <button className="mt-5 text-white font-bold bg-[#7B3796] py-[12px]" onClick={handleDescription}>
          채팅방 소개 설정
        </button>
      </div>
    </ProtectedRoute>
  );
}
