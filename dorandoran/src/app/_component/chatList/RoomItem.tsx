'use client';

import { IRoom } from '@/app/_util/types/types';
import Image from 'next/image';
import Link from 'next/link';
import RoomBadge from './RoomBadge';
import temp from '/public/img/180x180.svg';

export default function RoomItem({ room }: { room: IRoom }) {
  return (
    <li className="max-w-[180px]" title={room.title}>
      <Link href={`/chat/${room.id}`}>
        <div className="relative w-[180px] h-[180px]">
          <Image className="rounded-lg" src={temp} alt={room.title} fill />
          <RoomBadge type="new" />
        </div>
        <p className="mt-2 font-semibold truncate">{room.title}</p>
        <div className="mt-1 flex justify-between items-center">
          <p className="text-xs text-gray-500">마지막 채팅 {room.lastChatTime}</p>
          <p className="text-sm ">
            <strong className="text-[#7B3796]">{room.count}</strong>/{room.maxCount}
          </p>
        </div>
      </Link>
    </li>
  );
}
