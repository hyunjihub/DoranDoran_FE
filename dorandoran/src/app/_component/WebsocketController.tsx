'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { userStore } from '@/store/useUserStore';
import { websocketStore } from '@/store/useWebsocketStore';

export default function WebSocketController() {
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const pathname = usePathname();
  const connect = websocketStore((state) => state.connect);
  const disconnect = websocketStore((state) => state.disconnect);
  const socket = websocketStore((state) => state.socket);

  useEffect(() => {
    if (isLoggedIn && !socket) {
      connect();
    }

    return () => {
      if (socket) {
        disconnect();
      }
    };
  }, [isLoggedIn, socket, pathname, disconnect, connect]);

  return null;
}
