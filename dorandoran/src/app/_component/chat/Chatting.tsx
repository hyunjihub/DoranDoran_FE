'use client';

import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowProps } from 'react-virtualized';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Date from './Date';
import { IMessage } from '@/app/_util/types/types';
import MyMessage from './MyMessage';
import OtherMessage from './OtherMessage';
import SystemMessage from './SystemMessage';
import getChatDate from '@/app/_util/getChatDate';
import getChatTime from '@/app/_util/getChatTime';
import messageSample from '@/app/_util/json/messageSample.json';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 50,
});

export default function Chatting() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages(messageSample.messages);
  }, []);

  const processedMessages = useMemo(() => {
    return messages.map((message, index, arr) => {
      const isDateChanged = index === 0 || getChatDate(message.timestamp) !== getChatDate(arr[index - 1].timestamp);

      const isLastInGroup =
        index === arr.length - 1 ||
        message.timestamp !== arr[index + 1].timestamp ||
        message.sender !== arr[index + 1].sender;

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
            {message.sender === 'me' ? (
              <MyMessage
                message={message.content}
                timestamp={message.isLastInGroup ? getChatTime(message.timestamp) : null}
              />
            ) : message.sender === 'other' ? (
              <OtherMessage
                message={message.content}
                timestamp={message.isLastInGroup ? getChatTime(message.timestamp) : null}
              />
            ) : (
              <SystemMessage />
            )}
          </div>
        </CellMeasurer>
      );
    },
    [processedMessages]
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
