'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';

import { IMessage } from '@/app/_util/types/types';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { websocketStore } from '@/store/useWebsocketStore';

export default function useChatMessages() {
  const { id } = useParams();
  const pathname = usePathname();
  const setMessageHandler = websocketStore((state) => state.setMessageHandler);
  const clearMessageHandler = websocketStore((state) => state.clearMessageHandler);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery<IMessage[]>({
    queryKey: ['chatMessages', id],
    queryFn: async ({ pageParam = null }) => {
      const cursorParam = pageParam ? `cursor=${pageParam}&` : '';
      const response = await axios.get<IMessage[]>(
        `/api/chat/chats?${pathname.startsWith('/chat/group') ? 'groupId' : 'privateId'}=${id}&key=${cursorParam}`
      );
      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length < 10) return undefined;
      return lastPage[lastPage.length - 1].chatId;
    },
  });

  useEffect(() => {
    if (Array.isArray(data)) {
      setMessages(data);
    }
  }, [data]);

  useEffect(() => {
    const handleMessage = (msg: IMessage) => {
      setMessages((prev) => [...prev, msg]);
    };

    setMessageHandler(handleMessage);
    return () => clearMessageHandler();
  }, [clearMessageHandler, setMessageHandler]);

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
