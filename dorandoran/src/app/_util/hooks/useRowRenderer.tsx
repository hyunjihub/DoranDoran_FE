'use client';

import { CellMeasurer, ListRowProps } from 'react-virtualized';

import { CellMeasurerCache } from 'react-virtualized';
import Date from '@/app/_component/chat/Date';
import { IMessage } from '@/app/_util/types/types';
import MyMessage from '@/app/_component/chat/MyMessage';
import OtherMessage from '@/app/_component/chat/OtherMessage';
import SystemMessage from '@/app/_component/chat/SystemMessage';
import { userStore } from '@/store/useUserStore';

interface useRowRendererProps {
  processedMessages: IMessage[];
  cache: CellMeasurerCache;
  setModalOpen: React.Dispatch<React.SetStateAction<number>>;
}

export const useRowRenderer = ({ processedMessages, cache, setModalOpen }: useRowRendererProps) => {
  const memberId = userStore((state) => state.user.memberId);

  const rowRenderer = ({ index, key, style, parent }: ListRowProps) => {
    const message = processedMessages[index];
    if (message.type === 'enter' || message.type === 'leave') {
      return null;
    }
    return (
      <CellMeasurer cache={cache} parent={parent} key={key} columnIndex={0} rowIndex={index}>
        <div key={key} style={style} className="w-full flex flex-col items-center">
          {message.isDateChanged && <Date date={message.date} />}
          {message.senderId === memberId ? (
            <MyMessage
              type={message.type}
              message={message.content}
              timestamp={message.isLastInGroup ? message.time : null}
            />
          ) : message.senderId !== memberId && message.senderId !== -1 ? (
            <OtherMessage
              message={message}
              time={message.isLastInGroup ? message.time : null}
              setModalOpen={setModalOpen}
            />
          ) : (
            message.type == 'system' && <SystemMessage message={message} />
          )}
        </div>
      </CellMeasurer>
    );
  };

  rowRenderer.displayName = 'ChatRowRenderer';

  return rowRenderer;
};
