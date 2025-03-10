import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function useNicknameCheck(nickname: string) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const checkNicknameAvailability = async (nickname: string) => {
    if (nickname.length < 2 || nickname.length > 8) {
      setIsAvailable(null);
      return;
    }

    try {
      const response = await axios.get(`/api/member/nickname?nickname=${nickname}`);
      setIsAvailable(response.data);
    } catch {
      setIsAvailable(null);
    }
  };

  const { refetch } = useQuery({
    queryKey: ['nicknameCheck', nickname],
    queryFn: () => checkNicknameAvailability(nickname),
    enabled: !!nickname && nickname.length >= 2 && nickname.length <= 8,
    refetchOnWindowFocus: false, // 창을 다시 포커싱해도 쿼리 재실행 안 함
    retry: false, // 실패 시 재시도 안 함
    refetchInterval: false, // 자동으로 주기적인 리패치하지 않음
  });

  useEffect(() => {
    if (!nickname) return;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      refetch();
    }, 500);
  }, [nickname, refetch]);

  return isAvailable;
}
