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
  const hasInitializedRef = useRef(false);

  const checkIfAtBottom = () => {
    const container = scrollingContainerRef.current;
    if (!container) return false;

    const { scrollTop, scrollHeight, clientHeight } = container;
    return scrollHeight - (scrollTop + clientHeight) < 10;
  };

  const handleScroll = () => {
    const container = scrollingContainerRef.current;
    if (!container) return;

    if (container.scrollTop < 100 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }

    isUserAtBottomRef.current = checkIfAtBottom();
  };

  // 최초 렌더링 시 맨 아래로 스크롤
  useEffect(() => {
    if (!hasInitializedRef.current && listRef.current && processedMessages.length > 0) {
      listRef.current.recomputeRowHeights?.();
      listRef.current.forceUpdateGrid?.();

      if (isUserAtBottomRef.current) {
        listRef.current.scrollToRow(processedMessages.length - 1);
        hasInitializedRef.current = true;
      }
    }
  }, [processedMessages.length]);

  // 메시지 업데이트 시
  useEffect(() => {
    if (hasInitializedRef.current && listRef.current && processedMessages.length > 0) {
      if (isUserAtBottomRef.current) {
        listRef.current.scrollToRow(processedMessages.length - 1);
      }
    }
  }, [processedMessages.length]);

  return {
    listRef,
    scrollingContainerRef,
    handleScroll,
  };
}
