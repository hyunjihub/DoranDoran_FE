'use client';

import { useParams, usePathname } from 'next/navigation';

import { IMessage } from '../types/types';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import useLogout from './useLogout';
import { useRequestWithAuthRetry } from './useRequestWithAuthRetry';

export default function useFetchMessage() {
  const { id } = useParams();
  const pathname = usePathname();
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery<IMessage[]>({
    queryKey: ['chatMessages', id],
    queryFn: async ({ pageParam = null }) => {
      const cursorParam = pageParam ? `&key=${pageParam}` : '';
      try {
        const response = await axios.get<IMessage[]>(
          `/api/chat/chats?${pathname.startsWith('/chat/group') ? 'groupId' : 'privateId'}=${id}${cursorParam}`
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const msg = error.response?.data?.message;
          const status = error.response?.status;

          if (status === 401 && msg === 'accessToken 만료') {
            return await requestWithRetry(
              'get',
              `/api/chat/chats?${pathname.startsWith('/chat/group') ? 'groupId' : 'privateId'}=${id}${cursorParam}`
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
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length < 10) return undefined;
      return lastPage[0].chatId;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
}
