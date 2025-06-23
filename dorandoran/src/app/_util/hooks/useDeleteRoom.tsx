'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import axios from 'axios';
import { chatStore } from '@/store/useChatStore';
import useLogout from '@/app/_util/hooks/useLogout';
import { useNavigationHistory } from '@/app/_util/hooks/useNavigationHistory';
import { useRequestWithAuthRetry } from './useRequestWithAuthRetry';
import { useRouter } from 'next/navigation';

export default function useDeleteRoom(isManager: boolean) {
  const chatRoomId = chatStore((state) => state.chatRoomId);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { goBack } = useNavigationHistory();
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();

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
            await requestWithRetry(
              'delete',
              isManager ? `/api/chatrooms?groupId=${chatRoomId}` : `/api/shutdown?groupId=${chatRoomId}`
            );
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

  return mutation;
}
