'use client';

import { IUser } from '@/app/_util/types/types';
import Image from 'next/image';
import axios from 'axios';
import { chatStore } from '@/store/useChatStore';
import profile from '/public/img/profile.jpg';
import useLogout from '@/app/_util/hooks/useLogout';
import { useMutation } from '@tanstack/react-query';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';
import { useRouter } from 'next/navigation';
import { websocketStore } from '@/store/useWebsocketStore';

export default function RecommendItem({ user }: { user: IUser }) {
  const router = useRouter();
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();
  const setChat = chatStore((state) => state.setChat);
  const subscribeRoom = websocketStore((state) => state.subscribeRoom);

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post('/api/chat/private', { memberId: user.memberId });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            return await requestWithRetry('post', '/api/chat/private', { memberId: user.memberId });
          } else if (status === 401 && message === 'refreshToken 만료') {
            executeLogout();
            throw new Error('로그아웃 되었습니다. 다시 로그인 해주세요.');
          } else {
            alert(error.response?.data || error.message);
          }
          throw error;
        } else {
          throw error;
        }
      }
    },
    onSuccess: (data) => {
      setChat({
        isClose: false,
        isGroup: false,
        partInPeople: 2,
        chatTitle: user.nickname,
      });
      subscribeRoom(data.chatRoomId, 'private');
      router.push(`/chat/private/${data.chatRoomId}`);
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
