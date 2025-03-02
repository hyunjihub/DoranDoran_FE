'use client';

import { useEffect, useState } from 'react';

import { AuthStatus } from '@/app/_util/types/types';
import EmailInput from '@/app/_component/form/EmailInput';
import FindHeader from '@/app/_component/user/FindHeader';
import PasswordInput from '@/app/_component/form/PasswordInput';
import { useSearchParams } from 'next/navigation';

export default function FindForm() {
  const searchParams = useSearchParams();
  const queryType = searchParams.get('type');
  const [type, setType] = useState(queryType === 'password' ? 'password' : 'email');
  const [authState, setAuthState] = useState<AuthStatus>('idle');

  useEffect(() => {
    if (queryType === 'password' || queryType === 'email') {
      setType(queryType);
    }
  }, [queryType]);

  return (
    <div className="h-full flex flex-col">
      <FindHeader type={type} setType={setType} />
      <form className="px-[16px] mt-[24px] flex flex-col gap-8">
        <EmailInput authState={authState} setAuthState={setAuthState} />
        {type === 'password' && <PasswordInput type="find" />}
        <button className="w-full py-[12px] border border-[#7B3796] bg-[#7B3796] rounded text-white text-center font-bold">
          {type === 'email' ? '이메일 찾기' : '비밀번호 찾기'}
        </button>
      </form>
    </div>
  );
}
