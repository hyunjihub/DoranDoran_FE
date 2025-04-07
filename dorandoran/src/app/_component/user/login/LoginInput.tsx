'use client';

import { ILoginForm } from '@/app/_util/types/types';
import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';
import eye from '/public/img/icon/eye.svg';
import eyeClose from '/public/img/icon/eyeClose.svg';
import { useState } from 'react';

interface LoginInputProps {
  register: UseFormRegister<ILoginForm>;
  setCapsLockFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginInput({ register, setCapsLockFlag }: LoginInputProps) {
  const [passwordClosed, setPasswordClosed] = useState(true);

  const checkCapsLock = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const capsLock = e.getModifierState('CapsLock');
    setCapsLockFlag(capsLock);
  };

  return (
    <>
      <label className="flex flex-col gap-1 font-bold">
        이메일
        <input
          className="border rounded p-[12px] text-sm outline-none font-normal"
          placeholder="doran123@example.com"
          {...register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '올바른 이메일 주소를 입력해주세요.',
            },
          })}
        />
      </label>
      <label className="mt-5 flex flex-col gap-1 font-bold">
        비밀번호
        <div className="relative w-full">
          <input
            type={passwordClosed ? 'password' : 'text'}
            className="w-full border rounded p-[12px] text-sm outline-none font-normal"
            placeholder="영문, 숫자, 특수문자 조합 8글자 이상"
            onKeyUp={(e) => checkCapsLock(e)}
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
            })}
          />
          <Image
            className="absolute right-[12px] top-[10px]"
            src={passwordClosed ? eye : eyeClose}
            alt="비밀번호 표시"
            width={24}
            height={24}
            onClick={() => setPasswordClosed(!passwordClosed)}
          />
        </div>
      </label>
    </>
  );
}
