'use client';

import { useEffect, useRef } from 'react';

import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useStore } from '@/store/useStore';

export default function useRelogin() {
  const { login, user } = useStore();
  const isRememberMe = typeof window !== 'undefined' ? localStorage.getItem('doran-rememberMe') : null;
  const hasExecuted = useRef(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/member/relogin');
      return response.data;
    },
    onSuccess: (data) => {
      login(data);
    },
    onError: (error: unknown) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (!hasExecuted.current && !user.userId && isRememberMe) {
      mutation.mutate();
      hasExecuted.current = true;
    }
  }, [user.userId, isRememberMe, mutation]);
}
