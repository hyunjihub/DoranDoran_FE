'use client';

import { useEffect, useMemo, useState } from 'react';

import { IMessage } from '@/app/_util/types/types';
import useFetchMessage from './useFetchMessages';
import { useParams } from 'next/navigation';
import useUpdateRoomInfo from './useUpdateRoomInfo';
import { websocketStore } from '@/store/useWebsocketStore';

export default function useChatMessages() {
  const { id } = useParams();
  const setMessageHandler = websocketStore((state) => state.setMessageHandler);
  const clearMessageHandler = websocketStore((state) => state.clearMessageHandler);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const updateRoomInfo = useUpdateRoomInfo(id as string);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useFetchMessage();

  useEffect(() => {
    if (Array.isArray(data?.pages[0])) {
      setMessages(data.pages[0]);
    }
  }, [data]);

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

  return {
    processedMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
}
