'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { userStore } from '@/store/useUserStore';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const isLoggingOut = userStore((state) => state.isLoggingOut);
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
