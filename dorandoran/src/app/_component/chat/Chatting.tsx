'use client';

import { AutoSizer, CellMeasurerCache, List } from 'react-virtualized';

import useChatMessages from '@/app/_util/hooks/useChatMessages';
import { useRowRenderer } from '@/app/_util/hooks/useRowRenderer';

interface ChattingProps {
  setModalOpen: React.Dispatch<React.SetStateAction<number>>;
}

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 50,
});

export default function Chatting({ setModalOpen }: ChattingProps) {
  const { processedMessages } = useChatMessages();
  const rowRenderer = useRowRenderer({ processedMessages, cache, setModalOpen });

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
