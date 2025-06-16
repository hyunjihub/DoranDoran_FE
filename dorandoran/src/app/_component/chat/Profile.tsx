'use client';

import { IUserProfile } from '@/app/_util/types/types';
import Image from 'next/image';
import PrivateButton from './PrivateButton';
import axios from 'axios';
import cancel from '/public/img/icon/cancel.svg';
import profile from '/public/img/profile.jpg';
import useLogout from '@/app/_util/hooks/useLogout';
import { useQuery } from '@tanstack/react-query';

interface ProfileProps {
  id: number;
  setModalOpen: React.Dispatch<React.SetStateAction<number>>;
}

export default function Profile({ id, setModalOpen }: ProfileProps) {
  const executeLogout = useLogout({ type: 'session' });

  const { data } = useQuery<IUserProfile>({
    queryKey: ['chatMessages', id],
    queryFn: async () => {
      try {
        const res = await axios.get<IUserProfile>(`/api/chat/profile?id=${id}`);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            try {
              await axios.get('/api/member/reissue');
              const retry = await axios.get<IUserProfile>(`/api/chat/profile?id=${id}`);
              return retry.data;
            } catch {
              executeLogout();
              throw new Error('로그아웃 되었습니다. 다시 로그인 해주세요.');
            }
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
            src={data?.profileImage || profile}
            alt="프로필 이미지"
            fill
          />
        </div>
        <PrivateButton chatPermitted={data?.chatPermitted} id={id} />
      </div>
    </div>
  );
}
