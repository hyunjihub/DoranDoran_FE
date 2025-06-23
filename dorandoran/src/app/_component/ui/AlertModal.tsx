'use client';

import { IRoomItem } from '@/app/_util/types/types';
import useJoinChatRoom from '@/app/_util/hooks/useJoinGroupRoom';

interface PromptModalProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  room: IRoomItem;
}

export default function AlertModal({ setIsActive, room }: PromptModalProps) {
  const mutation = useJoinChatRoom(room);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="mb-2 text-xl font-bold text-center">채팅방 참여</h2>
        <p className="mb-2 text-center text-sm text-gray-500">
          채팅방에 참여하시겠습니까?
          <br />
          입장하시면 다양한 사람과 실시간으로 대화를 나눌 수 있어요.
        </p>
        <div className="mt-5 flex justify-end space-x-3 text-sm">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded" onClick={() => setIsActive(false)}>
            취소
          </button>
          <button
            className="px-4 py-2 bg-[#7B3796] text-white rounded"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
