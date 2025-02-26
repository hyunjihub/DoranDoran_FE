'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import plus from '/public/img/icon/plus.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import user from '/public/img/icon/user.svg';

export default function ChatListItem() {
  const [swiped, setSwiped] = useState(false);

  const router = useRouter();

  const handleEnter = () => {
    router.push('/chat/1');
  };

  return (
    <li className="relative w-full max-w-md mx-auto overflow-hidden" onClick={handleEnter}>
      <motion.div
        className={`absolute inset-0 flex items-center justify-end bg-red-500 transition-all ${
          swiped ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        animate={{ opacity: swiped ? 1 : 0 }}
      >
        <button className="text-white p-4">나가기</button>
      </motion.div>

      <motion.div
        className="py-2 pr-3 flex justify-between items-center bg-white"
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
        <Image className="w-[60px] h-[60px] rounded-full" src={plus} alt="프로필 이미지" />
        <div className="flex flex-col text-sm mr-4">
          <div className="flex flex-row gap-1 mb-1">
            <p className="text-base font-bold">[취업] 취업 준비 같이 하실 분 📣</p>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Image src={user} alt="참여인원" width={15} height={15} />
              50
            </div>
          </div>
          오늘 저녁에 모여서 보드게임 한 판 어때?
        </div>
        <div className="flex flex-col gap-1 items-end">
          <p className="text-xs text-gray-400">오후 10:50</p>
          <div className="rounded-full bg-[#7B3796] w-[20px] h-[20px] text-white text-xs font-bold flex items-center justify-center">
            1
          </div>
        </div>
      </motion.div>
    </li>
  );
}
