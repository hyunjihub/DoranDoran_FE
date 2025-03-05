'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export default function useTabSync() {
  const { setData, user } = useStore();

  useEffect(() => {
    const channel = new BroadcastChannel('auth-channel');

    if (!user.userId && !localStorage.getItem('doran-rememberMe')) {
      channel.postMessage({ type: 'sync-request' });
    }

    channel.onmessage = (e) => {
      const { type, data } = e.data;

      if (type === 'sync-request' && user.userId) {
        channel.postMessage({ type: 'sync-data', data: { user } });
      } else if (type === 'sync-data' && user.userId) {
        setData(data);
      } else if (type === 'logout-event' && user.userId) {
        setData({
          userId: null,
          profileImg: null,
          nickname: null,
          accessToken: null,
        });
      } else if (type === 'login-event') {
        setData(data);
      }
    };

    return () => {
      channel.close();
    };
  }, [user, setData]);
}
