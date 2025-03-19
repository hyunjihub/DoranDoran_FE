'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export default function useTabSync() {
  const { login, logout, isLoggedIn, user } = useStore();

  useEffect(() => {
    const channel = new BroadcastChannel('auth-channel');

    if (!isLoggedIn) {
      channel.postMessage({ type: 'sync-request' });
    }

    channel.onmessage = (e) => {
      const { type, data } = e.data;

      if (type === 'sync-request' && isLoggedIn) {
        channel.postMessage({ type: 'sync-data', data: { user } });
      } else if (type === 'sync-data' && isLoggedIn) {
        login(data);
      } else if (type === 'logout-event' && isLoggedIn) {
        logout();
      } else if (type === 'login-event') {
        login(data);
      }
    };

    return () => {
      channel.close();
    };
  }, [isLoggedIn, login, logout, user]);
}
