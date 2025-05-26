'use client';

import axios from 'axios';
import { chatStore } from '@/store/useChatStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigationHistory } from '@/app/_util/hooks/useNavigationHistory';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function DeleteChatRoom({ isManager }: { isManager: boolean }) {
  const chatRoomId = chatStore((state) => state.chatRoomId);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { goBack } = useNavigationHistory();

  const mutation = useMutation({
    mutationFn: async () => {
      if (isManager) {
        if (confirm('채팅방을 나가시겠습니까?')) {
          await axios.delete(`/api/chatrooms?groupId=${chatRoomId}`);
        } else throw new Error('사용자가 채팅방 나가기를 취소했습니다.');
      } else {
        if (
          confirm(
            '채팅방을 폐쇄하시겠습니까?\n폐쇄된 채팅방은 복구가 불가능하며 참여 중인 회원의 메시지 전송이 불가능해집니다.'
          )
        ) {
          await axios.delete(`/api/shutdown?groupId=${chatRoomId}`);
        } else throw new Error('사용자가 채팅방 폐쇄를 취소했습니다.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myChatRoom'] });
      const previousPage = goBack();
      router.push(previousPage);
    },
    onError: (error) => {
      if (error.message !== '사용자가 채팅방 나가기를 취소했습니다.') {
        alert(error);
      }
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
