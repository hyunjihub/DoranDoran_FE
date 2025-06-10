'use client';

import { useEffect } from 'react';
import { userStore } from '@/store/useUserStore';
import { websocketStore } from '@/store/useWebsocketStore';

export default function useTabSync() {
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const login = userStore((state) => state.login);
  const logout = userStore((state) => state.logout);
  const user = userStore((state) => state.user);
  const setMemberId = websocketStore((state) => state.setMemberId);

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
        setMemberId(data.memberId);
      } else if (type === 'logout-event' && isLoggedIn) {
        logout();
        setMemberId(null);
      } else if (type === 'login-event') {
        login(data);
        setMemberId(data.memberId);
      }
    };

    return () => {
      channel.close();
    };
  }, [isLoggedIn, login, logout, user, setMemberId]);
}
