'use client';

import { useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

export default function RouteObserver() {
  const pathName = usePathname();
  const previousPage = useRef<string | null>(null);

  useEffect(() => {
    if (previousPage.current) {
      window.sessionStorage.setItem('prev', previousPage.current);
    }

    previousPage.current = pathName;
  }, [pathName]);

  return <></>;
}
