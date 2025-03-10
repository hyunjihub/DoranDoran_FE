'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { ILoginForm } from '@/app/_util/types/types';
import Image from 'next/image';
import axios from 'axios';
import eye from '/public/img/icon/eye.svg';
import eyeClose from '/public/img/icon/eyeClose.svg';
import { useMutation } from '@tanstack/react-query';
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
  const [passwordClosed, setPasswordClosed] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const mutation = useMutation({
    mutationFn: async (data: ILoginForm) => {
      const response = await axios.post('/api/member/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      setData(data);
      localStorage.setItem('doran-rememberMe', '1');
      router.push(decodeURIComponent(param.get('redirect') ?? '/'));
    },
    onError: () => {
      setLoginFail(true);
    },
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    mutation.mutate(data);
  };

  const checkCapsLock = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const capsLock = e.getModifierState('CapsLock');
    setCapsLockFlag(capsLock);
  };

  return (
    <form className="mt-[24px] flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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
            type="password"
            className="w-full border rounded p-[12px] text-sm outline-none font-normal"
            placeholder="영문, 숫자, 특수문자 조합 8글자 이상"
            onKeyUp={(e) => checkCapsLock(e)}
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
            })}
          />
          <Image
            className="absolute right-[12px] top-[10px]"
            src={passwordClosed ? eyeClose : eye}
            alt="비밀번호 표시"
            width={24}
            height={24}
            onClick={() => setPasswordClosed(!passwordClosed)}
          />
        </div>
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
      <button
        className="w-full mt-5 py-[12px] border border-[#7B3796] bg-[#7B3796] rounded text-white text-center font-bold"
        disabled={mutation.isPending}
      >
        로그인
      </button>
    </form>
  );
}
