'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { websocketStore } from '@/store/useWebsocketStore';

export default function WebSocketController() {
  const pathname = usePathname();
  const connect = websocketStore((state) => state.connect);
  const disconnect = websocketStore((state) => state.disconnect);
  const socket = websocketStore((state) => state.socket);

  useEffect(() => {
    const isChatRoute = pathname.startsWith('/chat') || pathname === '/chatlist';

    if (!socket && isChatRoute) {
      connect();
    } else if (socket && !isChatRoute) {
      disconnect();
    }

    return () => {
      if (socket && !isChatRoute) {
        disconnect();
      }
    };
  }, [socket, pathname, disconnect, connect]);

  return null;
}
