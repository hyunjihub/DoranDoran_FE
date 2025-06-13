'use client';

import { useEffect, useState } from 'react';

import InfoInput from '@/app/_component/form/chat/InfoInput';
import ProtectedRoute from '@/app/_component/ProtectedRoute';
import axios from 'axios';
import createChatStore from '@/store/useCreateChatStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigationHistory } from '@/app/_util/hooks/useNavigationHistory';
import { useRouter } from 'next/navigation';
import { websocketStore } from '@/store/useWebsocketStore';

export default function Description() {
  const description = createChatStore((state) => state.description);
  const subscribedRoomId = websocketStore((state) => state.subscribedRoomId);
  const [roomDescription, setRoomDescription] = useState('');
  const router = useRouter();
  const { goBack } = useNavigationHistory();

  useEffect(() => {
    if (description) setRoomDescription(description);
  }, [description]);

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.patch('/api/chat/info/description', { chatRoomId: subscribedRoomId, description: roomDescription });
    },
    onSuccess: () => {
      const previousPage = goBack();
      router.push(previousPage);
    },
    onError: () => {
      alert('오류');
    },
  });

  return (
    <ProtectedRoute>
      <InfoInput
        inputData={roomDescription}
        setInputData={setRoomDescription}
        type={'description'}
        onChange={() => mutation.mutate}
      />
    </ProtectedRoute>
  );
}
