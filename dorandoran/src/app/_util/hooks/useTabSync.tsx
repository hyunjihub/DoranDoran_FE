'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export default function useTabSync() {
  const { setData, user } = useStore();

  useEffect(() => {
    const channel = new BroadcastChannel('auth-channel');

    if (!user && !localStorage.getItem('doran-rememberMe')) {
      channel.postMessage({ type: 'sync-request' });
    }

    channel.onmessage = (e) => {
      const { type, data } = e.data;

      if (type === 'sync-request' && user) {
        channel.postMessage({ type: 'sync-data', data: { user } });
      } else if (type === 'sync-data' && user) {
        setData(data);
      } else if (type === 'logout-event' && user) {
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
