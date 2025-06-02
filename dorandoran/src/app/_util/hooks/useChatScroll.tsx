import { useEffect, useRef } from 'react';

import { IMessage } from '../types/types';
import { List } from 'react-virtualized';

export function useChatScroll({
  processedMessages,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: {
  processedMessages: IMessage[];
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}) {
  const listRef = useRef<List>(null);
  const prevScrollTopRef = useRef(0);
  const firstVisibleMessageIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (listRef.current && processedMessages.length > 0) {
      listRef.current.scrollToRow(processedMessages.length - 1);
    }
  }, [processedMessages.length]);

  const handleScroll = (scrollTop: number) => {
    prevScrollTopRef.current = scrollTop;

    if (scrollTop < 100 && hasNextPage && !isFetchingNextPage) {
      if (processedMessages.length > 0) {
        firstVisibleMessageIdRef.current = processedMessages[0].chatId;
      }
      fetchNextPage();
    }
  };

  return {
    listRef,
    handleScroll,
  };
}
