'use client';

import axios from 'axios';
import { chatStore } from '@/store/useChatStore';
import useLogout from '@/app/_util/hooks/useLogout';
import { useMutation } from '@tanstack/react-query';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';
import { useRouter } from 'next/navigation';
import { websocketStore } from '@/store/useWebsocketStore';

export default function PrivateButton({
  chatPermitted,
  id,
  name,
}: {
  chatPermitted: boolean | undefined;
  id: number;
  name: string;
}) {
  const router = useRouter();
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();
  const setChat = chatStore((state) => state.setChat);
  const subscribeRoom = websocketStore((state) => state.subscribeRoom);

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post('/api/chat/private', { memberId: id });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            return await requestWithRetry('post', '/api/chat/private', { memberId: id });
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
        chatRoomId: data.chatRoomId,
        isClose: false,
        isGroup: false,
        partInPeople: 2,
        chatTitle: name,
      });
      subscribeRoom(data.chatRoomId, 'private');
      router.push(`/chat/private/${data.chatRoomId}`);
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
