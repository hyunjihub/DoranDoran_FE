'use client';

import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowProps } from 'react-virtualized';
import React, { useCallback, useMemo, useState } from 'react';

import Date from './Date';
import { IMessage } from '@/app/_util/types/types';
import MyMessage from './MyMessage';
import OtherMessage from './OtherMessage';
import SystemMessage from './SystemMessage';
import axios from 'axios';
import getChatDate from '@/app/_util/getChatDate';
import getChatTime from '@/app/_util/getChatTime';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { userStore } from '@/store/useUserStore';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 50,
});

export default function Chatting() {
  const { id } = useParams();
  const memberId = userStore((state) => state.user.memberId);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { data } = useQuery({
    queryKey: ['chatMessages', id],
    queryFn: async () => {
      const response = await axios.get(`/chats?chatRoomId=${id}`);
      setMessages(response.data);
    },
  });

  console.log(data);

  const processedMessages = useMemo(() => {
    return messages.map((message, index, arr) => {
      const isDateChanged = index === 0 || getChatDate(message.timestamp) !== getChatDate(arr[index - 1].timestamp);

      const isLastInGroup =
        index === arr.length - 1 ||
        message.timestamp !== arr[index + 1].timestamp ||
        message.senderId !== arr[index + 1].senderId;

      return { ...message, isDateChanged, isLastInGroup };
    });
  }, [messages]);

  const rowRenderer = useCallback(
    ({ index, key, style, parent }: ListRowProps) => {
      const message = processedMessages[index];
      return (
        <CellMeasurer cache={cache} parent={parent} key={key} columnIndex={0} rowIndex={index}>
          <div key={key} style={style} className="w-full flex flex-col items-center">
            {message.isDateChanged && <Date timestamp={message.timestamp} />}
            {message.senderId === memberId ? (
              <MyMessage
                message={message.contents}
                timestamp={message.isLastInGroup ? getChatTime(message.timestamp) : null}
              />
            ) : message.senderId !== memberId ? (
              <OtherMessage
                message={message.contents}
                timestamp={message.isLastInGroup ? getChatTime(message.timestamp) : null}
              />
            ) : (
              <SystemMessage />
            )}
          </div>
        </CellMeasurer>
      );
    },
    [processedMessages, memberId]
  );

  return (
    <div className="w-full h-full pb-[75px]">
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="overflow-scroll scrollbar-hide"
            width={width}
            height={height}
            rowCount={processedMessages.length}
            rowHeight={cache.rowHeight}
            rowRenderer={rowRenderer}
            deferredMeasurementCache={cache}
            overscanRowCount={10}
          />
        )}
      </AutoSizer>
    </div>
  );
}
