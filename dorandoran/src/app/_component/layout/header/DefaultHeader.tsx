'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { TITLE } from '@/app/_util/types/constants';
import arrow from '/public/img/icon/prevArrow.svg';

interface TitleMap {
  [key: string]: string;
}

export default function DefaultHeader({ pathname }: { pathname: string }) {
  const [previousPage, setPreviousPage] = useState('/');

  useEffect(() => {
    setPreviousPage(document.referrer || '/');
  }, []);

  const pageTitle = (TITLE as TitleMap)[pathname] || '기본 제목';

  return (
    <div className="relative w-full h-full flex items-center justify-center px-[16px] py-[12px]">
      <Link className="absolute left-[16px]" href={previousPage}>
        <Image src={arrow} alt="이전페이지" width={12} height={24} />
      </Link>
      <h1 className="font-semibold">{pageTitle}</h1>
    </div>
  );
}
