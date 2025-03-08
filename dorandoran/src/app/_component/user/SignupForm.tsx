'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthStatus } from '@/app/_util/types/types';
import EmailInput from '../form/EmailInput';
import { ISignupForm } from '@/app/_util/types/types';
import NicknameInput from '../form/NicknameInput';
import PasswordInput from '../form/PasswordInput';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupForm() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthStatus>('idle');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignupForm>({ mode: 'onBlur' });

  const mutation = useMutation({
    mutationFn: async (data: ISignupForm) => {
      await axios.post('/api/member/signup', data);
    },
    onSuccess: () => {
      alert('회원가입이 완료되었습니다!');
      router.push('/');
    },
    onError: (error) => {
      alert(error);
    },
  });

  const onSubmit: SubmitHandler<ISignupForm> = (data) => {
    if (authState !== 'success') {
      alert('이메일 인증이 완료되지 않았습니다.\n이메일 인증 후 다시 시도해주세요.');
      return;
    }
    mutation.mutate(data);
  };

  return (
    <form className="mt-[24px] flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <EmailInput authState={authState} setAuthState={setAuthState} register={register} errors={errors} watch={watch} />
      <PasswordInput type="signup" register={register} errors={errors} watch={watch} />
      <NicknameInput register={register} watch={watch} errors={errors} />

      <button
        className="w-full py-[12px] border border-[#7B3796] bg-[#7B3796] rounded text-white text-center font-bold"
        disabled={mutation.isPending}
      >
        가입하기
      </button>
    </form>
  );
}
