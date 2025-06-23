'use client';

import { IRoom } from '@/app/_util/types/types';
import Image from 'next/image';
import RoomLeave from './RoomLeave';
import { chatStore } from '@/store/useChatStore';
import { motion } from 'framer-motion';
import profile from '/public/img/profile.jpg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import user from '/public/img/icon/user.svg';
import { websocketStore } from '@/store/useWebsocketStore';

export default function ChatListItem({ room }: { room: IRoom }) {
  const [swiped, setSwiped] = useState(false);
  const router = useRouter();
  const setChat = chatStore((state) => state.setChat);
  const subscribeRoom = websocketStore((state) => state.subscribeRoom);

  const handleEnter = () => {
    setChat({
      isClose: room.isClose || false,
      isGroup: room.isGroup || true,
      partInPeople: room.partInPeople,
      chatTitle: room.chatRoomTitle,
    });
    if (!room.isClose) subscribeRoom(room.chatRoomId, room.isGroup ? 'group' : 'private');
    router.push(`/chat/${room.isGroup ? 'group' : 'private'}/${room.chatRoomId}`);
  };

  return (
    <li className="relative w-full max-w-md mx-auto overflow-hidden cursor-pointer" onClick={handleEnter}>
      <RoomLeave swiped={swiped} />
      <motion.div
        className="py-2 px-3 flex justify-center items-center bg-white"
        drag="x"
        dragConstraints={{ left: -70, right: 0 }}
        onDragEnd={(event, info) => {
          if (info.offset.x < -30) {
            setSwiped(true);
          } else if (info.offset.x > 30) {
            setSwiped(false);
          }
        }}
      >
        <div className="relative w-[60px] h-[60px] rounded-full mr-4">
          <Image
            className="object-cover rounded-full"
            src={room.chatRoomImage || profile}
            alt={room.chatRoomTitle}
            fill
          />
        </div>

        <div className="flex flex-col grow text-sm mr-4">
          <div className="flex gap-1 mb-1">
            <p className="text-base font-bold">{room.chatRoomTitle}</p>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Image src={user} alt="참여인원" width={15} height={15} />
              {room.partInPeople}
            </div>
          </div>
          <p className="max-w-[260px] min-h-[16px] truncate text-gray-600">{room.lastChatContent}</p>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <p className="text-xs text-gray-400">{room.lastChatTime}</p>
          <div
            className={`rounded-full bg-[#7B3796] w-[20px] h-[20px] text-white text-xs font-bold flex items-center justify-center ${
              !room.nonReadCount || room.nonReadCount === 0 ? 'opacity-0' : ''
            }`}
          >
            {room.nonReadCount && room.nonReadCount > 99 ? '99+' : room.nonReadCount}
          </div>
        </div>
      </motion.div>
    </li>
  );
}
