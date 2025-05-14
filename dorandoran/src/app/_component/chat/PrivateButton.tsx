'use client';

import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function PrivateButton({ chatPermitted, id }: { chatPermitted: boolean | undefined; id: number }) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/chat/chatrooms', { memberId: id });
      return response.data;
    },
    onSuccess: (data) => {
      router.push(`/chat/${data.chatRoomId}`);
    },
    onError: () => {
      alert('오류');
    },
  });

  return (
    <button
      className={`text-white font-semibold rounded px-[72px] py-[12px] ${
        chatPermitted ? 'bg-[#7B3796]' : 'bg-gray-300 cursor-not-allowed'
      }`}
      disabled={!chatPermitted}
      onClick={() => mutation.mutate()}
    >
      1:1 채팅 보내기
    </button>
  );
}
