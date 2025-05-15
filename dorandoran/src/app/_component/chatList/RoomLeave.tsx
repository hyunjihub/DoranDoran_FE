'use client';

import { motion } from 'framer-motion';

export default function RoomLeave({ swiped }: { swiped: boolean }) {
  const handleLeave = () => {
    if (confirm('채팅방을 나가시겠습니까?\n나간 채팅방 데이터는 복구되지 않습니다.')) {
    }
  };

  return (
    <motion.div
      className={`absolute inset-0 flex items-center justify-end bg-red-500 transition-all ${
        swiped ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      animate={{ opacity: swiped ? 1 : 0 }}
    >
      <button className="text-white p-4" onClick={handleLeave}>
        나가기
      </button>
    </motion.div>
  );
}
