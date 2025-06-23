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
        {({ measure, registerChild }) => (
          <div ref={(el) => registerChild(el)} key={key} style={style} className="w-full flex flex-col items-center">
            {message.isDateChanged && <Date date={message.date} />}
            {message.type == 'system' || message.type === 'change' ? (
              <SystemMessage message={message} />
            ) : message.senderId === memberId ? (
              <MyMessage message={message} time={message.isLastInGroup ? message.time : null} onImageLoad={measure} />
            ) : message.senderId !== memberId && message.senderId !== -1 ? (
              <OtherMessage
                message={message}
                time={message.isLastInGroup ? message.time : null}
                setModalOpen={setModalOpen}
                onImageLoad={measure}
              />
            ) : (
              <></>
            )}
          </div>
        )}
      </CellMeasurer>
    );
  };

  rowRenderer.displayName = 'ChatRowRenderer';

  return rowRenderer;
};
