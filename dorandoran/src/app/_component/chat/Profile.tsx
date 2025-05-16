'use client';

import { IUserProfile } from '@/app/_util/types/types';
import Image from 'next/image';
import PrivateButton from './PrivateButton';
import axios from 'axios';
import cancel from '/public/img/icon/cancel.svg';
import { useQuery } from '@tanstack/react-query';

interface ProfileProps {
  id: number;
  setModalOpen: React.Dispatch<React.SetStateAction<number>>;
}

export default function Profile({ id, setModalOpen }: ProfileProps) {
  const { data } = useQuery<IUserProfile>({
    queryKey: ['chatMessages', id],
    queryFn: async () => {
      const response = await axios.get<IUserProfile>(`/api/chat/profile?id=${id}`);
      return response.data;
    },
    enabled: id > 0,
    staleTime: 0,
    refetchOnMount: true,
  });

  return (
    <div
      className="absolute inset-0 bg-black bg-opacity-30 z-40 flex justify-center items-end"
      onClick={() => setModalOpen(-1)}
    >
      <div className="w-full absolute bottom-0 border bg-white px-[12px] py-[24px] flex flex-col items-center rounded-t-3xl">
        <button className="absolute top-[12px] right-[12px]" onClick={() => setModalOpen(-1)}>
          <Image src={cancel} alt="닫기" width={32} height={32} />
        </button>
        <p className="text-2xl font-bold mb-[12px]">{data?.nickname}님의 프로필</p>
        <div className="border relative w-[140px] h-[140px] rounded-full mb-[40px]">
          <Image
            className="w-[140px] h-[140px] object-cover rounded-full"
            src={data?.profileImage as string}
            alt="프로필 이미지"
            fill
          />
        </div>
        <PrivateButton chatPermitted={data?.chatPermitted} id={id} />
      </div>
    </div>
  );
}
