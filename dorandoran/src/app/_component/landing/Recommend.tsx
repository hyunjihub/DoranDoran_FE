'use client';

import { IUser } from '@/app/_util/types/types';
import Image from 'next/image';
import RecommendItem from './RecommendItem';
import axios from 'axios';
import refresh from '/public/img/icon/refresh.svg';
import { useQuery } from '@tanstack/react-query';

export default function Recommend() {
  const { data, refetch } = useQuery<IUser[]>({
    queryKey: ['recommend'],
    queryFn: async () => {
      const response = await axios.get<IUser[]>(`/api/chat/recommends`);
      return response.data;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  return (
    <section className="mt-[60px] px-[24px]">
      <h2 className="text-xl font-bold">새로운 친구를 만나보세요! 👭</h2>
      <p className="text-xs text-gray-500">새로운 친구, 새로운 인연! 도란도란에서!</p>
      <ul className="flex gap-4">
        {data &&
          data.map((user, key) => {
            return <RecommendItem user={user} key={key} />;
          })}
      </ul>
      <button
        className="flex justify-between gap-3 mt-[16px] border border-gray-400 rounded text-sm px-[12px] py-[4px]"
        onClick={() => refetch()}
      >
        새로 추천받기 <Image src={refresh} alt="새로고침" width={20} height={20} />
      </button>
    </section>
  );
}
