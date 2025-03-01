'use client';

import ChatHeader from './ChatHeader';
import DefaultHeader from './DefaultHeader';
import MainHeader from './MainHeader';
import SearchHeader from './SearchHeader';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') sessionStorage.removeItem('history');
  }, [pathname]);

  return (
    <header className="w-full h-[64px] sticky top-0 bg-white">
      {pathname === '/' ? (
        <MainHeader />
      ) : pathname === '/search' ? (
        <SearchHeader />
      ) : pathname.startsWith('/chat/') ? (
        <ChatHeader />
      ) : (
        <DefaultHeader pathname={pathname} />
      )}
    </header>
  );
}
