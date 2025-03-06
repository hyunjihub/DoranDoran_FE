import { useCallback, useEffect, useRef, useState } from 'react';

import axios from 'axios';

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
    } catch (error) {
      console.error('닉네임 중복 검사 오류:', error);
      setIsAvailable(null);
    }
  };

  const debouncedCheck = useCallback((nickname: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      checkNicknameAvailability(nickname);
    }, 500);
  }, []);

  useEffect(() => {
    if (nickname) {
      debouncedCheck(nickname);
    }
  }, [nickname, debouncedCheck]);

  return isAvailable;
}
