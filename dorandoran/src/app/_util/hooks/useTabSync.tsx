'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export default function useTabSync() {
  const { login, logout, user } = useStore();

  useEffect(() => {
    const channel = new BroadcastChannel('auth-channel');

    if (!user.userId) {
      channel.postMessage({ type: 'sync-request' });
    }

    channel.onmessage = (e) => {
      const { type, data } = e.data;

      if (type === 'sync-request' && user.userId) {
        channel.postMessage({ type: 'sync-data', data: { user } });
      } else if (type === 'sync-data' && user.userId) {
        login(data);
      } else if (type === 'logout-event' && user.userId) {
        logout();
      } else if (type === 'login-event') {
        login(data);
      }
    };

    return () => {
      channel.close();
    };
  }, [user, login, logout]);
}
