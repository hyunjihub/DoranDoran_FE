'use client';

import Image from 'next/image';
import Link from 'next/link';
import chat from '/public/img/icon/chat.svg';
import hamburger from '/public/img/icon/hamburger.svg';
import home from '/public/img/icon/home.svg';
import search from '/public/img/icon/search.svg';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';
import user from '/public/img/icon/user.svg';

export default function TabBar() {
  const { userId } = useStore();
  const pathname = usePathname();
  const notRendering = ['/search', '/login', '/singup', '/find', '/chat', '/mypage/nickname'];
  const isChatRoute = pathname.startsWith('/chat/') && pathname.split('/').length === 3;

  if (notRendering.includes(pathname) || isChatRoute) return null;
  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 border-t border-[#EAEAEA] px-[24px] py-[12px] bg-white w-full max-w-[430px]">
      <ul className="flex justify-between items-center text-xs font-semibold text-[#757575]">
        <li>
          <Link className="min-w-[55px] flex flex-col items-center" href={'/'}>
            <Image src={home} alt="홈" width={30} height={30} />홈
          </Link>
        </li>
        <li>
          <Link className="min-w-[55px] flex flex-col items-center" href={'/search'}>
            <Image src={search} alt="검색" width={30} height={30} />
            검색
          </Link>
        </li>
        <li>
          <Link className="min-w-[55px] flex flex-col items-center" href={'/chatlist'}>
            <Image src={hamburger} alt="목록" width={30} height={30} />
            채팅목록
          </Link>
        </li>
        <li>
          <Link className="min-w-[55px] flex flex-col items-center" href={'/mychat'}>
            <Image src={chat} alt="내채팅" width={30} height={30} />내 채팅
          </Link>
        </li>
        <li>
          <Link
            className="min-w-[55px] flex flex-col items-center"
            href={`${userId ? '/mypage' : `/login?redirect=${encodeURIComponent(pathname)}`}`}
          >
            <Image src={user} alt="마이페이지" width={30} height={30} />
            마이페이지
          </Link>
        </li>
      </ul>
    </nav>
  );
}
