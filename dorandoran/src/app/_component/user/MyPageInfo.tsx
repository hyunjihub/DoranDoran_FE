'use client';

import ChatReceiveInput from '@/app/_component/form/setting/ChatReceiveInput';
import EmailInput from '../form/setting/EmailInput';
import { IMypage } from '@/app/_util/types/types';
import Image from 'next/image';
import ImageInput from '@/app/_component/form/setting/ImageInput';
import InputToLink from '@/app/_component/form/setting/InputToLink';
import Link from 'next/link';
import Loading from '@/app/_component/layout/Loading';
import Logout from '@/app/_component/user/Logout';
import PushNotificationInput from '@/app/_component/form/setting/PushNotificationInput';
import arrow from '/public/img/icon/prevArrow.svg';
import { getFetchUserInfo } from '@/app/_util/getFetchUserInfo';
import { useQuery } from '@tanstack/react-query';
import { userStore } from '@/store/useUserStore';

interface MypageInfoProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MypageInfo({ setIsActive }: MypageInfoProps) {
  const user = userStore((state) => state.user);
  const isLoggedIn = userStore((state) => state.isLoggedIn);

  const { data, isLoading } = useQuery<IMypage, Error>({
    queryKey: ['user'],
    queryFn: getFetchUserInfo,
    enabled: isLoggedIn,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full h-full flex flex-col items-center">
          <div className="w-full border-b border-t">
            <ImageInput image={user.profileImage} type="mypage" />
          </div>
          <div className="w-full border-b">
            <InputToLink name="닉네임 변경" placeHolder="" link="/mypage/nickname" inputData={user.nickname || ''} />
          </div>
          <div className="w-full border-b">
            <EmailInput email={data?.email ?? 'e1ample@gmail.com'} />
          </div>
          <div className="w-full border-b">
            <ChatReceiveInput isPermmited={data?.isPermitted ?? false} />
          </div>
          <Link href={'/find'} className="w-full flex justify-between items-center px-[16px] py-[18px]">
            <p className="font-bold">비밀번호 재설정</p>
            <Image className="rotate-180" src={arrow} alt="비밀번호 재설정" width={8} height={8} />
          </Link>
          <div className="w-full border-y">
            <PushNotificationInput isNotification={data?.isNotification ?? false} />
          </div>
          <Logout />
          <button className="mt-3 text-gray-500 text-xs" onClick={() => setIsActive(true)}>
            회원 탈퇴
          </button>
        </div>
      )}
    </>
  );
}
