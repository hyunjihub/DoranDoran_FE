'use client';

import CreateChatForm from '@/app/_component/chat/CreateChatForm';
import ProtectedRoute from '@/app/_component/ProtectedRoute';
import { createChatStore } from '@/store/useCreateChat';
import { useEffect } from 'react';

export default function NewChat() {
  const reset = createChatStore((state) => state.reset);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <ProtectedRoute>
      <CreateChatForm />
    </ProtectedRoute>
  );
}
