'use client';

import { AutoSizer, CellMeasurerCache, List } from 'react-virtualized';

import useChatMessages from '@/app/_util/hooks/useChatMessages';
import { useChatScroll } from '@/app/_util/hooks/useChatScroll';
import { useEffect } from 'react';
import { useRowRenderer } from '@/app/_util/hooks/useRowRenderer';

interface ChattingProps {
  setModalOpen: React.Dispatch<React.SetStateAction<number>>;
}

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 50,
});

export default function Chatting({ setModalOpen }: ChattingProps) {
  const { processedMessages, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatMessages();

  const rowRenderer = useRowRenderer({ processedMessages, cache, setModalOpen });
  const { listRef, scrollingContainerRef, handleScroll } = useChatScroll({
    processedMessages,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  useEffect(() => {
    cache.clearAll();
    listRef.current?.recomputeRowHeights();
  }, [processedMessages, listRef]);

  return (
    <div className="w-full h-full px-[16px] pb-[75px]">
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
            className="overflow-scroll scrollbar-hide"
            width={width}
            height={height}
            rowCount={processedMessages.length}
            rowHeight={cache.rowHeight}
            rowRenderer={rowRenderer}
            deferredMeasurementCache={cache}
            overscanRowCount={10}
            onScroll={handleScroll}
            scrollingContainerProps={{
              ref: scrollingContainerRef,
            }}
          />
        )}
      </AutoSizer>
    </div>
  );
}
