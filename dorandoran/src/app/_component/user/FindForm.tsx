'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthStatus } from '@/app/_util/types/types';
import EmailInput from '@/app/_component/form/EmailInput';
import { IFindForm } from '@/app/_util/types/types';
import Loading from '../ui/Loading';
import PasswordInput from '@/app/_component/form/PasswordInput';
import { useState } from 'react';
import useUpdatePassword from '@/app/_util/hooks/useUpdatePassword';

export default function FindForm() {
  const [authState, setAuthState] = useState<AuthStatus>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onBlur' });
  const mutation = useUpdatePassword();

  const onSubmit: SubmitHandler<IFindForm> = (data) => {
    if (authState !== 'success') {
      alert('이메일 인증이 완료되지 않았습니다.\n이메일 인증 후 다시 시도해주세요.');
      return;
    }

    mutation.mutate(data);
  };

  return (
    <>
      <form className="px-[16px] mt-[24px] flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <EmailInput
          authState={authState}
          setAuthState={setAuthState}
          register={register}
          errors={errors}
          watch={watch}
          setIsLoading={setIsLoading}
        />
        <PasswordInput type="find" register={register} watch={watch} errors={errors} />
        <button className="w-full py-[12px] border border-[#7B3796] bg-[#7B3796] rounded text-white text-center font-bold">
          비밀번호 재설정
        </button>
      </form>
      {isLoading && <Loading />}
    </>
  );
}
