'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { AuthStatus } from '@/app/_util/types/types';
import EmailInput from '@/app/_component/form/EmailInput';
import FindHeader from '@/app/_component/user/FindHeader';
import { IFindForm } from '@/app/_util/types/types';
import PasswordInput from '@/app/_component/form/PasswordInput';
import { useSearchParams } from 'next/navigation';

export default function FindForm() {
  const searchParams = useSearchParams();
  const queryType = searchParams.get('type');
  const [type, setType] = useState(queryType === 'password' ? 'password' : 'email');
  const [authState, setAuthState] = useState<AuthStatus>('idle');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IFindForm> = (data) => {
    if (authState !== 'success') {
      alert('이메일 인증이 완료되지 않았습니다.\n이메일 인증 후 다시 시도해주세요.');
      return;
    }

    console.log(data);
  };

  useEffect(() => {
    if (queryType === 'password' || queryType === 'email') {
      setType(queryType);
    }
  }, [queryType]);

  return (
    <div className="h-full flex flex-col">
      <FindHeader type={type} setType={setType} />
      <form className="px-[16px] mt-[24px] flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <EmailInput authState={authState} setAuthState={setAuthState} register={register} errors={errors} />
        {type === 'password' && <PasswordInput type="find" register={register} watch={watch} errors={errors} />}
        <button className="w-full py-[12px] border border-[#7B3796] bg-[#7B3796] rounded text-white text-center font-bold">
          {type === 'email' ? '이메일 찾기' : '비밀번호 찾기'}
        </button>
      </form>
    </div>
  );
}
