'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';

import { IMessage } from '@/app/_util/types/types';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import useUpdateRoomInfo from './useUpdateRoomInfo';
import { websocketStore } from '@/store/useWebsocketStore';

export default function useChatMessages() {
  const { id } = useParams();
  const pathname = usePathname();
  const setMessageHandler = websocketStore((state) => state.setMessageHandler);
  const clearMessageHandler = websocketStore((state) => state.clearMessageHandler);

  const [messages, setMessages] = useState<IMessage[]>([]);

  const updateRoomInfo = useUpdateRoomInfo(id as string);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery<IMessage[]>({
    queryKey: ['chatMessages', id],
    queryFn: async ({ pageParam = null }) => {
      const cursorParam = pageParam ? `&key=${pageParam}` : '';
      const response = await axios.get<IMessage[]>(
        `/api/chat/chats?${pathname.startsWith('/chat/group') ? 'groupId' : 'privateId'}=${id}${cursorParam}`
      );
      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length < 10) return undefined;
      return lastPage[0].chatId;
    },
  });

  useEffect(() => {
    if (Array.isArray(data?.pages[0])) {
      setMessages(data.pages[0]);
    }
  }, [data]);

  useEffect(() => {
    const handleMessage = async (msg: IMessage) => {
      if (msg.type === 'change') {
        await updateRoomInfo();
      } else {
        setMessages((prev) => [...prev, msg]);
      }
    };

    setMessageHandler(handleMessage);
    return () => clearMessageHandler();
  }, [clearMessageHandler, setMessageHandler, updateRoomInfo]);

  const processedMessages = useMemo(() => {
    return messages.map((message, index, arr) => {
      const isDateChanged = index === 0 || message.date !== arr[index - 1].date;

      const isLastInGroup =
        index === arr.length - 1 ||
        message.time !== arr[index + 1].time ||
        message.senderId !== arr[index + 1].senderId;

      return { ...message, isDateChanged, isLastInGroup };
    });
  }, [messages]);

  return {
    processedMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
}
