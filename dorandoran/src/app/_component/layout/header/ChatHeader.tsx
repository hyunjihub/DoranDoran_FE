'use client';

import { usePathname, useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import arrow from '/public/img/icon/prevArrow.svg';
import { chatStore } from '@/store/useChatStore';
import more from '/public/img/icon/more.svg';
import { websocketStore } from '@/store/useWebsocketStore';

export default function ChatHeader() {
  const unsubscribeRoom = websocketStore((state) => state.unsubscribeRoom);
  const { chatTitle } = chatStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleGoToChatList = () => {
    unsubscribeRoom();
    router.push('/mychat');
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center px-[16px] py-[12px]">
      <div className="absolute left-[16px]" onClick={handleGoToChatList} role="button">
        <Image src={arrow} alt="이전페이지" width={12} height={24} />
      </div>
      <h1 className="font-semibold">{chatTitle}</h1>
      <Link className="absolute right-[16px]" href={`${pathname}/setting`} role="button">
        <Image src={more} alt="채팅방 설정" width={32} height={32} />
      </Link>
    </div>
  );
}
