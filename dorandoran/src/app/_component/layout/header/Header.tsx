'use client';

import ChatHeader from './ChatHeader';
import DefaultHeader from './DefaultHeader';
import MainHeader from './MainHeader';
import SearchHeader from './SearchHeader';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useRelogin from '@/app/_util/hooks/useRelogin';
import useTabSync from '@/app/_util/hooks/useTabSync';

export default function Header() {
  const pathname = usePathname();
  useTabSync();
  useRelogin();

  useEffect(() => {
    if (pathname === '/') sessionStorage.removeItem('history');
    if (pathname === '/login') sessionStorage.removeItem('history');
  }, [pathname]);

  return (
    <header className="w-full h-[64px] sticky top-0 bg-white">
      {pathname === '/' ? (
        <MainHeader />
      ) : pathname === '/search' ? (
        <SearchHeader />
      ) : pathname.startsWith('/chat/') && !pathname.includes('/setting') ? (
        <ChatHeader />
      ) : (
        <DefaultHeader pathname={pathname} />
      )}
    </header>
  );
}
