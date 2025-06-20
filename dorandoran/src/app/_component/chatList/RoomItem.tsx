'use client';

import { IRoomItem } from '@/app/_util/types/types';
import Image from 'next/image';
import RoomBadge from './RoomBadge';
import axios from 'axios';
import { chatStore } from '@/store/useChatStore';
import profile from '/public/img/profile.jpg';
import useLogout from '@/app/_util/hooks/useLogout';
import { useMutation } from '@tanstack/react-query';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';
import { useRouter } from 'next/navigation';
import { websocketStore } from '@/store/useWebsocketStore';

export default function RoomItem({ room }: { room: IRoomItem }) {
  const router = useRouter();
  const setChat = chatStore((state) => state.setChat);
  const subscribeRoom = websocketStore((state) => state.subscribeRoom);
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        await axios.post(`/api/chat/group`, { chatRoomId: room.chatRoomId });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            return await requestWithRetry('post', `/api/chat/group`, { chatRoomId: room.chatRoomId });
          } else if (status === 401 && message === 'refreshToken 만료') {
            executeLogout();
            throw new Error('로그아웃 되었습니다. 다시 로그인 해주세요.');
          } else {
            alert(error.response?.data || error.message);
          }
          throw error;
        } else {
          throw error;
        }
      }
    },
    onSuccess: () => {
      setChat({
        isClose: false,
        isGroup: room.isGroup || true,
        partInPeople: room.partInPeople,
        chatTitle: room.chatRoomTitle,
      });
      subscribeRoom(room.chatRoomId, 'private');
      router.push(`/chat/${room.isGroup ? 'group' : 'private'}/${room.chatRoomId}`);
    },
    onError: () => {
      alert('오류');
    },
  });

  const handleEnter = () => {
    if (confirm('해당 채팅방에 참여여하시겠습니까?')) {
      mutation.mutate();
    }
  };

  return (
    <li className="max-w-[180px]" title={room.chatRoomTitle}>
      <div className="relative w-[180px] h-[180px]" onClick={handleEnter}>
        <Image className="rounded-lg" src={room.chatRoomImage || profile} alt={room.chatRoomTitle} fill />
        <RoomBadge type="new" />
      </div>
      <p className="mt-2 font-semibold truncate">{room.chatRoomTitle}</p>
      <div className="mt-1 flex justify-between items-center">
        <p className="text-xs text-gray-500">마지막 채팅 {room.lastChatTime}</p>
        <p className="text-sm">
          <strong className="text-[#7B3796]">{room.partInPeople}</strong>/{room.maxCount}
        </p>
      </div>
    </li>
  );
}
