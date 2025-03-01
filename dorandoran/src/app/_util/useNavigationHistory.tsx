'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const HISTORY_KEY = 'history';

export function useNavigationHistory() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      sessionStorage.removeItem(HISTORY_KEY);
      return;
    }

    const storedHistory = sessionStorage.getItem(HISTORY_KEY);
    let parsedHistory: string[] = storedHistory ? JSON.parse(storedHistory) : [];

    parsedHistory = parsedHistory.filter((path) => path !== pathname);

    const updatedHistory = [...parsedHistory, pathname];
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  }, [pathname]);

  const goBack = () => {
    const storedHistory = sessionStorage.getItem(HISTORY_KEY);
    const parsedHistory = storedHistory ? JSON.parse(storedHistory) : [];

    if (parsedHistory.length > 1) {
      parsedHistory.pop();
      const previousPage = parsedHistory.pop();

      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(parsedHistory));

      return previousPage || '/';
    }
    return '/';
  };

  return { goBack };
}
