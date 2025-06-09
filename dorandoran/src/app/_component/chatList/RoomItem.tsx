'use client';

import { IRoomItem } from '@/app/_util/types/types';
import Image from 'next/image';
import RoomBadge from './RoomBadge';
import { chatStore } from '@/store/useChatStore';
import profile from '/public/img/profile.jpg';
import { useRouter } from 'next/navigation';
import { websocketStore } from '@/store/useWebsocketStore';

export default function RoomItem({ room }: { room: IRoomItem }) {
  const router = useRouter();
  const { setChat } = chatStore();
  const subscribeRoom = websocketStore((state) => state.subscribeRoom);

  const handleEnter = () => {
    if (confirm('해당 채팅방에 참여여하시겠습니까?')) {
      setChat({
        isClose: false,
        isGroup: room.isGroup || true,
        partInPeople: room.partInPeople,
        chatTitle: room.chatRoomTitle,
      });
      subscribeRoom(room.chatRoomId, 'private');
      router.push(`/chat/${room.isGroup ? 'group' : 'private'}/${room.chatRoomId}`);
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
