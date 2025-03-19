'use client';

import { useEffect, useRef } from 'react';

import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useStore } from '@/store/useStore';

export default function useRelogin() {
  const { login, isLoggedIn } = useStore();
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
    if (!hasExecuted.current && !isLoggedIn && isRememberMe) {
      mutation.mutate();
      hasExecuted.current = true;
    }
  }, [isLoggedIn, isRememberMe, mutation]);
}
