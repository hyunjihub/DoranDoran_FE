import Image from 'next/image';
import Link from 'next/link';
import arrow from '/public/img/icon/prevArrow.svg';
import { chatStore } from '@/store/useStore';
import more from '/public/img/icon/more.svg';

export default function ChatHeader() {
  const { chatTitle } = chatStore();

  return (
    <div className="relative w-full h-full flex items-center justify-center px-[16px] py-[12px]">
      <Link className="absolute left-[16px]" href={'/mychat'}>
        <Image src={arrow} alt="이전페이지" width={12} height={24} />
      </Link>
      <h1 className="font-semibold">{chatTitle}</h1>
      <button className="absolute right-[16px]">
        <Image src={more} alt="채팅방 설정" width={32} height={32} />
      </button>
    </div>
  );
}
