'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useStore } from '@/store/useStore';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const isLoggingOut = useStore((state) => state.isLoggingOut);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn !== null && isLoggedIn !== undefined) {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoading && isLoggedIn === false && !isLoggingOut) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, isLoggedIn, router, pathname, isLoggingOut]);

  if (isLoading) return null;
  return <>{children}</>;
}
