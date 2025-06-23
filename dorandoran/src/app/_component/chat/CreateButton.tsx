'use client';

import axios from 'axios';
import createChatStore from '@/store/useCreateChatStore';
import useLogout from '@/app/_util/hooks/useLogout';
import { useMutation } from '@tanstack/react-query';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';
import { useRouter } from 'next/navigation';

export default function CreateButton({}) {
  const chatRoomImage = createChatStore((state) => state.chatRoomImage);
  const chatRoomTitle = createChatStore((state) => state.chatRoomTitle);
  const description = createChatStore((state) => state.description);
  const maxCount = createChatStore((state) => state.maxCount);
  const router = useRouter();
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!chatRoomTitle) {
        alert('채팅방 이름을 설정해주세요.');
        return;
      }
      try {
        const response = await axios.post('/api/chat/chatrooms', {
          chatRoomImage,
          chatRoomTitle,
          maxCount,
          description,
        });
        return response.data.chatRoomId;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            return await requestWithRetry('post', '/api/chat/chatrooms', {
              chatRoomImage,
              chatRoomTitle,
              maxCount,
              description,
            });
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
    onSuccess: (id) => {
      router.push(`/chat/${id}`);
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <button
      className="mt-10 w-[200px] text-white font-bold bg-[#7B3796] rounded-lg py-[12px]"
      onClick={() => mutation.mutate()}
    >
      채팅방 생성
    </button>
  );
}
