'use client';

import Image from 'next/image';
import arrow from '/public/img/icon/prevArrow.svg';
import search from '/public/img/icon/search.svg';
import { useNavigationHistory } from '@/app/_util/useNavigationHistory';
import { useRouter } from 'next/navigation';

export default function SearchHeader() {
  const router = useRouter();
  const { goBack } = useNavigationHistory();

  const handleBack = () => {
    const previousPage = goBack();
    router.push(previousPage);
  };

  return (
    <div className="w-full h-full flex items-center justify-center px-[16px] py-[12px]">
      <button onClick={handleBack}>
        <Image src={arrow} alt="이전페이지" width={14} height={26} />
      </button>
      <div className="relative ml-[24px] flex-1">
        <input
          type="text"
          className="w-full pl-[16px] pr-[42px] py-[12px] rounded-lg bg-[#f5f5f5] text-sm text-semibold outline-none"
          placeholder="채팅 검색하기"
        />
        <button className="absolute top-[15%] right-[3%] z-10">
          <Image src={search} alt="검색" width={28} height={28} />
        </button>
      </div>
    </div>
  );
}
