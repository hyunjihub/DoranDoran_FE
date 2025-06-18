import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function useNicknameCheck(nickname: string) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const { refetch, data } = useQuery<boolean | null>({
    queryKey: ['nicknameCheck', nickname],
    queryFn: async () => {
      try {
        await axios.get(`/api/member/nickname?word=${nickname}`);
        return true;
      } catch {
        return false;
      }
    },
    enabled: nickname.length >= 2 && nickname.length <= 8,
    refetchOnWindowFocus: false,
    retry: false,
    refetchInterval: false,
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

  useEffect(() => {
    setIsAvailable(data ?? null);
  }, [data]);

  return isAvailable;
}
