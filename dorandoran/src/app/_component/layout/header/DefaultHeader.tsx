'use client';

import Image from 'next/image';
import { TITLE } from '@/app/_util/types/constants';
import arrow from '/public/img/icon/prevArrow.svg';
import { useNavigationHistory } from '@/app/_util/hooks/useNavigationHistory';
import { useRouter } from 'next/navigation';

interface TitleMap {
  [key: string]: string;
}

export default function DefaultHeader({ pathname }: { pathname: string }) {
  const pageTitle = (TITLE as TitleMap)[pathname] || '채팅방 설정';

  const router = useRouter();
  const { goBack } = useNavigationHistory();

  const handleBack = () => {
    const previousPage = goBack();
    router.push(previousPage);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center px-[16px] py-[12px]">
      <button className="absolute left-[16px]" onClick={handleBack}>
        <Image src={arrow} alt="이전페이지" width={12} height={24} />
      </button>
      <h1 className="font-semibold">{pageTitle}</h1>
    </div>
  );
}
