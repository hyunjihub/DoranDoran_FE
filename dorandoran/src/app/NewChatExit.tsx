'use client';

import { useEffect, useRef } from 'react';

import createChatStore from '@/store/useCreateChatStore';
import { usePathname } from 'next/navigation';

export default function NewChatExit({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);
  const reset = createChatStore((state) => state.reset);

  useEffect(() => {
    const prevPath = prevPathnameRef.current;
    const currPath = pathname;

    const wasInNewChat = prevPath?.startsWith('/new-chat');
    const isStillInNewChat = currPath.startsWith('/new-chat');

    if (wasInNewChat && !isStillInNewChat) {
      reset();
    }

    prevPathnameRef.current = currPath;
  }, [pathname, reset]);

  return <>{children}</>;
}
