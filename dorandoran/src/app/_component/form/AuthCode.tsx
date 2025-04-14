import { AuthStatus, IFindForm, ISignupForm } from '@/app/_util/types/types';
import { FieldValues, Path, UseFormWatch } from 'react-hook-form';

import AuthCodeError from '../error/AuthCodeError';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface AuthCodeProps<T extends FieldValues> {
  authState: AuthStatus;
  setAuthState: React.Dispatch<React.SetStateAction<AuthStatus>>;
  watch: UseFormWatch<T>;
  timeLeft: number;
}

export default function AuthCode<T extends ISignupForm | IFindForm>({
  authState,
  setAuthState,
  timeLeft,
  watch,
}: AuthCodeProps<T>) {
  const email = watch('email' as Path<T>);
  const [authCode, setAuthCode] = useState('');

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.post('/api/member/auth/code', {
        authCode: Number(authCode),
        email: email,
      });
    },
    onSuccess: () => {
      setAuthState('success');
    },
    onError: () => {
      setAuthState('failed');
    },
  });

  const handleAuthState = async () => {
    if (!authCode) {
      alert('인증번호를 입력해주세요');
      return;
    }

    mutation.mutate();
  };

  return (
    <div className="font-normal">
      <div className="w-full relative">
        <input
          className="w-full border rounded p-[12px] text-sm outline-none"
          placeholder="인증번호 입력"
          disabled={authState === 'success'}
          onChange={(e) => setAuthCode(e.target.value)}
        />
        <button
          className={`absolute top-[9px] right-[12px] w-[90px] rounded py-[6px] text-xs text-white font-normal ${
            authState === 'success' ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#7B3796]'
          }`}
          onClick={handleAuthState}
          type="button"
        >
          인증번호 확인
        </button>
      </div>
      <AuthCodeError authState={authState} timeLeft={timeLeft} />
    </div>
  );
}
