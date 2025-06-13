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
