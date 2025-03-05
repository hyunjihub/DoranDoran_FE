import { useEffect, useRef } from 'react';

import { AuthStatus } from '../types/types';

export function useTimer(
  timeLeft: number,
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>,
  authState: AuthStatus,
  setAuthState: React.Dispatch<React.SetStateAction<AuthStatus>>
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (authState === 'inProgress') {
      setTimeLeft(180);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev: number) => {
          const newTimeLeft = prev - 1;
          if (newTimeLeft <= 0) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            setAuthState('failed');
            return 0;
          }
          return newTimeLeft;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [authState, setAuthState, setTimeLeft]);

  return timeLeft;
}
