'use client';

import { useEffect, useState } from 'react';

import InfoInput from '@/app/_component/form/chat/InfoInput';
import ProtectedRoute from '@/app/_component/ProtectedRoute';
import axios from 'axios';
import createChatStore from '@/store/useCreateChatStore';
import useLogout from '@/app/_util/hooks/useLogout';
import { useMutation } from '@tanstack/react-query';
import { useNavigationHistory } from '@/app/_util/hooks/useNavigationHistory';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';
import { useRouter } from 'next/navigation';
import { websocketStore } from '@/store/useWebsocketStore';

export default function Description() {
  const description = createChatStore((state) => state.description);
  const subscribedRoomId = websocketStore((state) => state.subscribedRoomId);
  const [roomDescription, setRoomDescription] = useState('');
  const router = useRouter();
  const { goBack } = useNavigationHistory();
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();

  useEffect(() => {
    if (description) setRoomDescription(description);
  }, [description]);

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        await axios.patch('/api/chat/info/description', { chatRoomId: subscribedRoomId, description: roomDescription });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            return await requestWithRetry('patch', '/api/chat/info/description', {
              chatRoomId: subscribedRoomId,
              description: roomDescription,
            });
          } else if (status === 401 && message === 'refreshToken 만료') {
            executeLogout();
            throw new Error('로그아웃 되었습니다. 다시 로그인 해주세요.');
          } else {
            alert(error.response?.data || error.message);
          }
          throw error;
        } else {
          throw error;
        }
      }
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
