'use client';

import ChatHeader from './ChatHeader';
import DefaultHeader from './DefaultHeader';
import MainHeader from './MainHeader';
import SearchHeader from './SearchHeader';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

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
