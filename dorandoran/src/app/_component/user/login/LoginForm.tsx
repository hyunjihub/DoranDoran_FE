'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { ILoginForm } from '@/app/_util/types/types';
import LoginError from '../../error/LoginError';
import LoginInput from './LoginInput';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { userStore } from '@/store/useUserStore';

export default function LoginForm() {
  const router = useRouter();
  const { login } = userStore();
  const [loginFail, setLoginFail] = useState(false);
  const [capsLockFlag, setCapsLockFlag] = useState(false);
  const param = useSearchParams();

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
      login(data);
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

  return (
    <form className="mt-[24px] flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <LoginInput register={register} setCapsLockFlag={setCapsLockFlag} />
      <LoginError errors={errors} capsLockFlag={capsLockFlag} loginFail={loginFail} />
      <button
        className="w-full mt-5 py-[12px] border border-[#7B3796] bg-[#7B3796] rounded text-white text-center font-bold"
        disabled={mutation.isPending}
      >
        로그인
      </button>
    </form>
  );
}
