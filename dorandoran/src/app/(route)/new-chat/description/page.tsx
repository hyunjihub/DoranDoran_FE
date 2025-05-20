'use client';

import { useEffect, useState } from 'react';

import InfoInput from '@/app/_component/form/chat/InfoInput';
import ProtectedRoute from '@/app/_component/ProtectedRoute';
import { createChatStore } from '@/store/useCreateChat';

export default function Description() {
  const description = createChatStore((state) => state.description);
  const setDescription = createChatStore((state) => state.setDescription);
  const [roomDescription, setRoomDescription] = useState('');

  useEffect(() => {
    if (description) setRoomDescription(description);
  }, [description]);

  const handleChange = () => {
    setDescription(roomDescription);
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
