'use client';

import { IRoomItem } from '@/app/_util/types/types';
import Image from 'next/image';
import Link from 'next/link';
import RoomBadge from './RoomBadge';
import profile from '/public/img/profile.jpg';

export default function RoomItem({ room }: { room: IRoomItem }) {
  return (
    <li className="max-w-[180px]" title={room.chatRoomTitle}>
      <Link href={`/chat/group/${room.chatRoomId}`}>
        <div className="relative w-[180px] h-[180px]">
          <Image className="rounded-lg" src={room.chatRoomImage || profile} alt={room.chatRoomTitle} fill />
          <RoomBadge type="new" />
        </div>
        <p className="mt-2 font-semibold truncate">{room.chatRoomTitle}</p>
        <div className="mt-1 flex justify-between items-center">
          <p className="text-xs text-gray-500">마지막 채팅 {room.lastChatTime}</p>
          <p className="text-sm ">
            <strong className="text-[#7B3796]">{room.partInPeople}</strong>/{room.maxCount}
          </p>
        </div>
      </Link>
    </li>
  );
}
