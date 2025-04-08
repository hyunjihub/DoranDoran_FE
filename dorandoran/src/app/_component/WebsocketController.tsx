'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { websocketStore } from '@/store/useWebsocketStore';

export default function WebSocketController() {
  const pathname = usePathname();
  const connect = websocketStore((state) => state.connect);
  const disconnect = websocketStore((state) => state.disconnect);

  useEffect(() => {
    const isChatRoute = pathname.startsWith('/chat') || pathname === '/chatlist';

    if (isChatRoute) {
      connect();
    } else {
      disconnect();
    }
  }, [pathname, disconnect, connect]);

  return null;
}
