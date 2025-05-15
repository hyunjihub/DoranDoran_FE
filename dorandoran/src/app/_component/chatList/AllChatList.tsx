'use client';

import { useEffect, useRef } from 'react';

import { IRoomItem } from '@/app/_util/types/types';
import Loading from '../layout/Loading';
import RoomItem from '@/app/_component/chatList/RoomItem';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function AllChatList() {
  const fetchChats = async ({ pageParam = 1 }) => {
    const res = await axios.get(`/api/chat/chatrooms?page=${pageParam}&limit=8`);
    return res.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['chat'],
    queryFn: fetchChats,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
  });
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = observerRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <>
      {status === 'pending' ? (
        <div className="h-full">
          <Loading />
        </div>
      ) : status === 'error' ? (
        <></>
      ) : (
        <>
          <ul className="my-4 pb-24 grid grid-cols-2 gap-4">
            {data?.pages.map((page, pageIndex) =>
              page.data.map((room: IRoomItem, idx: number) => <RoomItem room={room} key={`${pageIndex}-${idx}`} />)
            )}
          </ul>
          {isFetchingNextPage && <p className="text-xs text-center py-4">불러오는 중...</p>}
          <div ref={observerRef} className="h-6" />
        </>
      )}
    </>
  );
}
