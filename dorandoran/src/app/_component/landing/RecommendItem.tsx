'use client';

import { IUser } from '@/app/_util/types/types';
import Image from 'next/image';
import axios from 'axios';
import profile from '/public/img/profile.jpg';
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
      <div className="relative rounded-full w-[80px] h-[80px]">
        <Image className="object-cover rounded-full" src={user.profileImage || profile} alt="프로필 이미지" fill />
      </div>
      <p className="mt-[4px] text-center font-semibold">{user.nickname}</p>
      <button className="mt-[4px] rounded bg-[#7B3796] text-white text-xs py-[4px]" onClick={() => mutation.mutate()}>
        1:1 채팅
      </button>
    </li>
  );
}
