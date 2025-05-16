'use client';

import { IUser } from '@/app/_util/types/types';
import Image from 'next/image';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function RecommendItem({ user }: { user: IUser }) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/chat/chatrooms', { memberId: user.memberId });
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
    <li className="flex flex-col">
      <div className="relative rounded-full w-[100px] h-[100px] border">
        <Image className="object-cover rounded-full" src={user.profileImage || ''} alt="프로필 이미지" fill />
      </div>
      <p>{user.nickname}</p>
      <button className="rounded-lg bg-[#7B3796] text-white px-[12px] py-[4px]" onClick={() => mutation.mutate()}>
        1:1 채팅
      </button>
    </li>
  );
}
