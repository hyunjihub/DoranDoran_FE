'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthStatus } from '@/app/_util/types/types';
import EmailInput from '@/app/_component/form/EmailInput';
import { IFindForm } from '@/app/_util/types/types';
import PasswordInput from '@/app/_component/form/PasswordInput';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useStore } from '@/store/useStore';

export default function FindForm() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const logout = useStore((state) => state.logout);
  const [authState, setAuthState] = useState<AuthStatus>('idle');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onBlur' });

  const mutation = useMutation({
    mutationFn: async (data: IFindForm) => {
      await axios.post('/api/member/password', data);
    },
    onSuccess: () => {
      if (isLoggedIn) {
        logout();
        localStorage.removeItem('doran-rememberMe');
      }
      router.push('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<IFindForm> = (data) => {
    if (authState !== 'success') {
      alert('이메일 인증이 완료되지 않았습니다.\n이메일 인증 후 다시 시도해주세요.');
      return;
    }

    mutation.mutate(data);
  };

  return (
    <form className="px-[16px] mt-[24px] flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <EmailInput authState={authState} setAuthState={setAuthState} register={register} errors={errors} watch={watch} />
      <PasswordInput type="find" register={register} watch={watch} errors={errors} />
      <button className="w-full py-[12px] border border-[#7B3796] bg-[#7B3796] rounded text-white text-center font-bold">
        비밀번호 재설정
      </button>
    </form>
  );
}
