'use client';

import { IUserProfile } from '@/app/_util/types/types';
import Image from 'next/image';
import PrivateButton from './PrivateButton';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function Profile({ id }: { id: number }) {
  const { data } = useQuery<IUserProfile>({
    queryKey: ['chatMessages', id],
    queryFn: async () => {
      const response = await axios.get<IUserProfile>(`/profile?id=${id}`);
      return response.data;
    },
    enabled: id > 0,
    staleTime: 0,
    refetchOnMount: true,
  });

  return (
    <div>
      <p className="text-2xl font-bold">{data?.nickname}님의 프로필</p>
      <div className="relative w-[100px] h-[100px] rounded-full">
        <Image className="object-cover" src={data?.profileImage as string} alt="프로필 이미지" fill />
      </div>
      <PrivateButton chatPermitted={data?.chatPermitted} id={id} />
    </div>
  );
}
