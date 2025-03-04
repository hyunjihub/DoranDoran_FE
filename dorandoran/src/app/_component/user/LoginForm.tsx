'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { ILoginForm } from '@/app/_util/types/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useStore } from '@/store/useStore';

export default function LoginForm() {
  const router = useRouter();
  const { setData } = useStore();
  const [loginFail, setLoginFail] = useState(false);
  const [capsLockFlag, setCapsLockFlag] = useState(false);
  const param = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const response = await axios.post('/api/member/login', data);
      setData(response.data);
      router.push(decodeURIComponent(param.get('redirect') ?? '/'));
    } catch {
      setLoginFail(true);
    }
  };

  const checkCapsLock = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const capsLock = e.getModifierState('CapsLock');
    setCapsLockFlag(capsLock);
  };

  return (
    <form className="mt-[24px] flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
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
      <label className="flex flex-col gap-1 font-bold">
        비밀번호
        <input
          className="border rounded p-[12px] text-sm outline-none font-normal"
          placeholder="영문, 숫자, 특수문자 조합 8글자 이상"
          onKeyUp={(e) => checkCapsLock(e)}
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
          })}
        />
      </label>
      {errors.email || errors.password ? (
        <span className="text-red-500 text-xs font-normal">{errors.email?.message || errors.password?.message}</span>
      ) : capsLockFlag ? (
        <span className="text-red-500 text-xs font-normal">Caps Lock이 켜져 있습니다.</span>
      ) : loginFail ? (
        <span className="text-red-500 text-xs font-normal">일치하는 계정 정보가 존재하지 않습니다.</span>
      ) : (
        <></>
      )}
      <button className="w-full py-[12px] border border-[#7B3796] bg-[#7B3796] rounded text-white text-center font-bold">
        로그인
      </button>
    </form>
  );
}
