'use client';

import { IRoomItem } from '@/app/_util/types/types';
import Image from 'next/image';
import RoomBadge from './RoomBadge';
import dynamic from 'next/dynamic';
import profile from '/public/img/profile.jpg';
import useJoinChatRoom from '@/app/_util/hooks/useJoinGroupRoom';
import { useState } from 'react';

const ConfirmModal = dynamic(() => import('@/app/_component/ui/ConfirmModal'));

export default function RoomItem({ room }: { room: IRoomItem }) {
  const [isActive, setIsActive] = useState(false);
  const mutation = useJoinChatRoom(room);

  return (
    <>
      <li className="max-w-[180px]" title={room.chatRoomTitle}>
        <div className="relative w-[180px] h-[180px]" onClick={() => setIsActive(true)}>
          <Image
            className="rounded-lg object-cover"
            src={room.chatRoomImage || profile}
            alt={room.chatRoomTitle}
            fill
          />
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
      {isActive && (
        <ConfirmModal
          setIsActive={setIsActive}
          title={'채팅방 참여'}
          description={'이 방에 참여하시겠습니까?\n입장하면 실시간 대화가 가능합니다.'}
          confirmText={'참여'}
          onConfirm={() => mutation.mutate()}
          isPending={mutation.isPending}
        />
      )}
    </>
  );
}
