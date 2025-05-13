'use client';

import { useEffect, useMemo, useState } from 'react';

import { IMessage } from '@/app/_util/types/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { websocketStore } from '@/store/useWebsocketStore';

export default function useChatMessages() {
  const { id } = useParams();
  const setMessageHandler = websocketStore((state) => state.setMessageHandler);
  const clearMessageHandler = websocketStore((state) => state.clearMessageHandler);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { data } = useQuery<IMessage[], Error>({
    queryKey: ['chatMessages', id],
    queryFn: async () => {
      const response = await axios.get<IMessage[]>(`/chats?chatRoomId=${id}`);
      return response.data;
    },
    enabled: typeof id === 'string',
    staleTime: 0,
    refetchOnMount: true,
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

  return { processedMessages };
}
