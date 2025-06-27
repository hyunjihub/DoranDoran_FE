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
  const scrollingContainerRef = useRef<HTMLDivElement | null>(null);
  const isUserAtBottomRef = useRef(true);
  const shouldScrollToBottomRef = useRef(true);

  const checkIfAtBottom = () => {
    const container = scrollingContainerRef.current;
    if (!container) return false;

    const { scrollTop, scrollHeight, clientHeight } = container;
    return scrollHeight - (scrollTop + clientHeight) < 20;
  };

  const handleScroll = () => {
    const container = scrollingContainerRef.current;
    if (!container) return;

    if (container.scrollTop < 100 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }

    isUserAtBottomRef.current = checkIfAtBottom();
  };

  const onRowsRendered = () => {
    if (shouldScrollToBottomRef.current && listRef.current) {
      listRef.current.scrollToRow(processedMessages.length - 1);
      shouldScrollToBottomRef.current = false;
    }
  };

  useEffect(() => {
    shouldScrollToBottomRef.current = true;
  }, [processedMessages.length]);

  return {
    listRef,
    scrollingContainerRef,
    handleScroll,
    onRowsRendered,
  };
}
