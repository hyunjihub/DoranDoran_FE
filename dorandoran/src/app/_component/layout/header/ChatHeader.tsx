'use client';

import { usePathname, useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import arrow from '/public/img/icon/prevArrow.svg';
import axios from 'axios';
import { chatStore } from '@/store/useChatStore';
import leave from '/public/img/icon/leave.svg';
import more from '/public/img/icon/more.svg';
import { useMutation } from '@tanstack/react-query';
import { websocketStore } from '@/store/useWebsocketStore';

export default function ChatHeader() {
  const unsubscribeRoom = websocketStore((state) => state.unsubscribeRoom);
  const chatTitle = chatStore((state) => state.chatTitle);
  const chatRoomId = chatStore((state) => state.chatRoomId);
  const pathname = usePathname();
  const router = useRouter();

  const handleGoToChatList = () => {
    unsubscribeRoom();
    router.push('/mychat');
  };

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/chat/chatrooms?privateId=${chatRoomId}`);
    },
    onSuccess: () => {
      handleGoToChatList();
    },
    onError: () => {
      alert('오류');
    },
  });

  const handleRoomLeave = () => {
    if (confirm('채팅방을 나가시겠습니까?')) {
      mutation.mutate();
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center px-[16px] py-[12px] z-50">
      <div className="absolute left-[16px]" onClick={handleGoToChatList} role="button">
        <Image src={arrow} alt="이전페이지" width={12} height={24} />
      </div>

      <h1 className="font-semibold">{chatTitle}</h1>

      {!pathname.includes('info') && (
        <>
          {pathname.includes('private') ? (
            <button className="absolute right-[16px]" onClick={handleRoomLeave}>
              <Image src={leave} alt="채팅방 설정" width={32} height={32} />
            </button>
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
