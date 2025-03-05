'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useStore } from '@/store/useStore';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useStore();

  useEffect(() => {
    if (!userId) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [userId, router, pathname]);

  return userId ? <>{children}</> : null;
}
