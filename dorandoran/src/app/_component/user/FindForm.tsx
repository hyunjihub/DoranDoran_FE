'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { AuthStatus } from '@/app/_util/types/types';
import EmailInput from '@/app/_component/form/EmailInput';
import FindHeader from '@/app/_component/user/FindHeader';
import { IFindForm } from '@/app/_util/types/types';
import PasswordInput from '@/app/_component/form/PasswordInput';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useStore } from '@/store/useStore';

export default function FindForm() {
  const logout = useStore((state) => state.logout);
  const searchParams = useSearchParams();
  const queryType = searchParams.get('type');
  const [type, setType] = useState(queryType === 'password' ? 'password' : 'email');
  const [authState, setAuthState] = useState<AuthStatus>('idle');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onBlur' });

  const mutation = useMutation({
    mutationFn: async (data: IFindForm) => {
      await axios.post('/api/member/password', data);
    },
    onSuccess: () => {
      logout();
      localStorage.removeItem('doran-rememberMe');
      router.push('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (queryType === 'password' || queryType === 'email') {
      setType(queryType);
    }
  }, [queryType]);

  const onSubmit: SubmitHandler<IFindForm> = (data) => {
    if (authState !== 'success') {
      alert('이메일 인증이 완료되지 않았습니다.\n이메일 인증 후 다시 시도해주세요.');
      return;
    }

    mutation.mutate(data);
  };

  useEffect(() => {
    reset();
  }, [type, reset]);

  return (
    <div className="h-full flex flex-col">
      <FindHeader type={type} setType={setType} />
      <form className="px-[16px] mt-[24px] flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <EmailInput
          authState={authState}
          setAuthState={setAuthState}
          register={register}
          errors={errors}
          watch={watch}
        />
        {type === 'password' && <PasswordInput type="find" register={register} watch={watch} errors={errors} />}
        <button className="w-full py-[12px] border border-[#7B3796] bg-[#7B3796] rounded text-white text-center font-bold">
          {type === 'email' ? '이메일 찾기' : '비밀번호 찾기'}
        </button>
      </form>
    </div>
  );
}
