'use client';

import { usePathname, useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import arrow from '/public/img/icon/prevArrow.svg';
import { chatStore } from '@/store/useChatStore';
import { isMobile } from 'react-device-detect';
import more from '/public/img/icon/more.svg';
import { useState } from 'react';
import { websocketStore } from '@/store/useWebsocketStore';

export default function ChatHeader() {
  const unsubscribeRoom = websocketStore((state) => state.unsubscribeRoom);
  const chatTitle = chatStore((state) => state.chatTitle);
  const pathname = usePathname();
  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleGoToChatList = () => {
    unsubscribeRoom();
    router.push('/mychat');
  };

  const handleToggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center px-[16px] py-[12px]">
      <div className="absolute left-[16px]" onClick={handleGoToChatList} role="button">
        <Image src={arrow} alt="이전페이지" width={12} height={24} />
      </div>

      <h1 className="font-semibold">{chatTitle}</h1>

      {!pathname.includes('info') && (
        <>
          {!isMobile ? (
            <div className="absolute right-[16px] z-50" role="button" onClick={handleToggleDropdown}>
              <Image src={more} alt="메뉴 열기" width={32} height={32} />
              {showDropdown && (
                <ul className="absolute top-full right-0 w-[100px] bg-white border rounded shadow z-10">
                  <li className="w-full px-2 py-2 hover:bg-gray-100">채팅방 나가기</li>
                </ul>
              )}
            </div>
          ) : (
            <Link className="absolute right-[16px]" href={`${pathname}/info`} role="button">
              <Image src={more} alt="채팅방 설정" width={32} height={32} />
            </Link>
          )}
        </>
      )}
    </div>
  );
}
