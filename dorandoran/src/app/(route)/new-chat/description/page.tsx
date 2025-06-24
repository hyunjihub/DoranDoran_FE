'use client';

import { useEffect, useState } from 'react';

import InfoInput from '@/app/_component/form/chat/InfoInput';
import ProtectedRoute from '@/app/_component/ProtectedRoute';
import createChatStore from '@/store/useCreateChatStore';
import { useNavigationHistory } from '@/app/_util/hooks/useNavigationHistory';
import { useRouter } from 'next/navigation';

export default function Description() {
  const router = useRouter();
  const description = createChatStore((state) => state.description);
  const setDescription = createChatStore((state) => state.setDescription);
  const [roomDescription, setRoomDescription] = useState('');
  const { goBack } = useNavigationHistory();

  useEffect(() => {
    if (description) setRoomDescription(description);
  }, [description]);

  const handleChange = () => {
    if (roomDescription.length > 255) {
      alert('설명은 최대 255자까지 작성할 수 있습니다.');
      return;
    }
    setDescription(roomDescription);
    const previousPage = goBack();
    router.push(previousPage);
  };

  return (
    <ProtectedRoute>
      <InfoInput
        inputData={roomDescription}
        setInputData={setRoomDescription}
        type="description"
        onChange={handleChange}
      />
    </ProtectedRoute>
  );
}
