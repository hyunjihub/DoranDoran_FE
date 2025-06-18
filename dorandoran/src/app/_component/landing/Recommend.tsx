'use client';

import { IUser } from '@/app/_util/types/types';
import Image from 'next/image';
import RecommendItem from './RecommendItem';
import axios from 'axios';
import refresh from '/public/img/icon/refresh.svg';
import useLogout from '@/app/_util/hooks/useLogout';
import { useQuery } from '@tanstack/react-query';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';
import { userStore } from '@/store/useUserStore';

export default function Recommend() {
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();

  const { data, refetch } = useQuery<IUser[]>({
    queryKey: ['recommend'],
    queryFn: async () => {
      try {
        const response = await axios.get<IUser[]>(`/api/chat/recommends`);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            return await requestWithRetry('get', `/api/chat/recommends`);
          } else if (status === 401 && message === 'refreshToken 만료') {
            executeLogout();
            throw new Error('로그아웃 되었습니다. 다시 로그인 해주세요.');
          } else {
            alert(error.response?.data || error.message);
          }
          throw error;
        } else {
          throw error;
        }
      }
    },
    enabled: isLoggedIn,
    staleTime: 0,
    refetchOnMount: true,
  });

  if (!isLoggedIn) return null;

  return (
    <section className="mt-[60px] px-[24px]">
      <h2 className="text-xl font-bold">새로운 친구를 만나보세요! 👭</h2>
      <p className="text-xs text-gray-500">새로운 친구, 새로운 인연! 도란도란에서!</p>
      <ul className="flex gap-5 mt-[16px] overflow-x-auto scrollbar-hide">
        {data &&
          data.map((user, key) => {
            return <RecommendItem user={user} key={key} />;
          })}
      </ul>
      <button
        className="flex justify-between gap-3 mt-[24px] border border-gray-400 rounded text-sm px-[12px] py-[4px]"
        onClick={() => refetch()}
      >
        새로 추천받기 <Image src={refresh} alt="새로고침" width={20} height={20} />
      </button>
    </section>
  );
}
