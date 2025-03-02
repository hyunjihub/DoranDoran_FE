'use client';

import { AuthStatus } from '@/app/_util/types/types';
import EmailInput from '../form/EmailInput';
import PasswordInput from '../form/PasswordInput';
import { useState } from 'react';

export default function SignupForm() {
  const [authState, setAuthState] = useState<AuthStatus>('idle');

  return (
    <form className="mt-[24px] flex flex-col gap-8">
      <EmailInput authState={authState} setAuthState={setAuthState} />
      <PasswordInput type="signup" />
      <label className="flex flex-col gap-1 font-bold">
        닉네임
        <input
          className="border rounded p-[12px] text-sm outline-none font-normal"
          placeholder="한글, 영문자만을 사용하여 2~8글자"
        />
      </label>
      <button className="w-full py-[12px] border border-[#7B3796] bg-[#7B3796] rounded text-white text-center font-bold">
        가입하기
      </button>
    </form>
  );
}
