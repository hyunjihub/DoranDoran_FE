import { FieldError, FieldValues, Path, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { IFindForm, ISignupForm } from '@/app/_util/types/types';

import AuthButton from './AuthButton';
import AuthCode from './AuthCode';
import { AuthStatus } from '@/app/_util/types/types';
import { useState } from 'react';
import { useTimer } from '@/app/_util/hooks/useTimer';

interface EmailInputProps<T extends FieldValues> {
  authState: AuthStatus;
  setAuthState: React.Dispatch<React.SetStateAction<AuthStatus>>;
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  errors: {
    email?: FieldError;
  };
}

export default function EmailInput<T extends ISignupForm | IFindForm>({
  authState,
  setAuthState,
  register,
  watch,
  errors,
}: EmailInputProps<T>) {
  const [timeLeft, setTimeLeft] = useState(180);
  useTimer(timeLeft, setTimeLeft, authState, setAuthState);

  return (
    <label className="flex flex-col gap-1 font-bold relative">
      이메일
      <input
        className="border rounded p-[12px] text-sm outline-none font-normal"
        disabled={authState !== 'idle'}
        placeholder="doran123@example.com"
        {...register('email' as Path<T>, {
          required: '이메일은 필수입니다.',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '올바른 이메일 주소를 입력해주세요.',
          },
        })}
      />
      <AuthButton authState={authState} setAuthState={setAuthState} watch={watch} />
      {authState !== 'idle' && <AuthCode authState={authState} setAuthState={setAuthState} timeLeft={timeLeft} />}
      {errors.email ? <span className="text-red-500 text-xs font-normal">{errors.email.message}</span> : <></>}
    </label>
  );
}
