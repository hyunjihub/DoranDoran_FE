'use client';

import Image from 'next/image';
import Link from 'next/link';
import MainHeader from './MainHeader';
import SearchHeader from './SearchHeader';
import arrow from '/public/img/icon/prevArrow.svg';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full h-[64px] sticky top-0 bg-white">
      {pathname === '/' ? (
        <MainHeader />
      ) : pathname === 'search' ? (
        <SearchHeader />
      ) : (
        <div className="w-full flex items-center justify-center px-[16px] py-[12px]">
          <Link href={'/'}>
            <Image src={arrow} alt="이전페이지" width={14} height={26} />
          </Link>
          <h1 className="font-semibold">로그인</h1>
        </div>
      )}
    </header>
  );
}
