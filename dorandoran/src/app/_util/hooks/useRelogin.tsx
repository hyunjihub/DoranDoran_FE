'use client';

import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { userStore } from '@/store/useUserStore';

export default function useRelogin() {
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const login = userStore((state) => state.login);
  const isRememberMe = typeof window !== 'undefined' ? localStorage.getItem('doran-rememberMe') : null;
  const hasExecuted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn !== null && isLoggedIn !== undefined) {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

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
    if (!isLoading && !hasExecuted.current && isLoggedIn === false && isRememberMe) {
      mutation.mutate();
      hasExecuted.current = true;
    }
  }, [isLoggedIn, isRememberMe, mutation, isLoading]);
}
