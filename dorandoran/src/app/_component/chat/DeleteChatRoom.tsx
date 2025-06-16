'use client';

import axios from 'axios';
import { chatStore } from '@/store/useChatStore';
import useLogout from '@/app/_util/hooks/useLogout';
import { useMutation } from '@tanstack/react-query';
import { useNavigationHistory } from '@/app/_util/hooks/useNavigationHistory';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function DeleteChatRoom({ isManager }: { isManager: boolean }) {
  const chatRoomId = chatStore((state) => state.chatRoomId);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { goBack } = useNavigationHistory();
  const executeLogout = useLogout({ type: 'session' });

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const doDelete = async () => {
          if (!isManager) {
            const confirmed = confirm('채팅방을 나가시겠습니까?');
            if (!confirmed) throw new Error('사용자가 채팅방 나가기를 취소했습니다.');
            await axios.delete(`/api/chatrooms?groupId=${chatRoomId}`);
          } else {
            const confirmed = confirm(
              '채팅방을 폐쇄하시겠습니까?\n폐쇄된 채팅방은 복구가 불가능하며 참여 중인 회원의 메시지 전송이 불가능해집니다.'
            );
            if (!confirmed) throw new Error('사용자가 채팅방 폐쇄를 취소했습니다.');
            await axios.delete(`/api/shutdown?groupId=${chatRoomId}`);
          }
        };

        await doDelete();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const msg = error.response?.data?.message;
          const status = error.response?.status;

          if (status === 401 && msg === 'accessToken 만료') {
            try {
              await axios.get('/api/member/reissue');

              if (isManager) {
                await axios.delete(`/api/chatrooms?groupId=${chatRoomId}`);
              } else {
                await axios.delete(`/api/shutdown?groupId=${chatRoomId}`);
              }
            } catch {
              executeLogout();
              throw new Error('로그인이 만료되었습니다. 다시 로그인해주세요.');
            }
          } else if (status === 401 && msg === 'refreshToken 만료') {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myChatRoom'] });
      const previousPage = goBack();
      router.push(previousPage);
    },
    onError: (error) => {
      if (error.message?.includes('취소')) {
        return;
      }
      alert(error.message || '문제가 발생했습니다.');
    },
  });

  return (
    <>
      <button
        className="mt-10 w-[200px] text-white font-bold bg-[#7B3796] rounded-lg py-[12px]"
        onClick={() => mutation.mutate()}
      >
        채팅방 {isManager ? '폐쇄' : '나가기'}
      </button>
      {isManager && (
        <p className="mt-2 text-xs text-gray-400">
          ※ 채팅방 폐쇄 시 남아있는 참여자 모두 채팅 메시지 전송이 제한 됩니다.
          <br />※ 폐쇄한 채팅방은 다시 복구가 불가능합니다.
        </p>
      )}
    </>
  );
}
