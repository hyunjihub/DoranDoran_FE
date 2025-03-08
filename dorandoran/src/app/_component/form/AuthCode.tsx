import { AuthStatus } from '@/app/_util/types/types';
import axios from 'axios';
import getAuthTime from '@/app/_util/getAuthTime';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface AuthCodeProps {
  authState: AuthStatus;
  setAuthState: React.Dispatch<React.SetStateAction<AuthStatus>>;
  timeLeft: number;
}

export default function AuthCode({ authState, setAuthState, timeLeft }: AuthCodeProps) {
  const [authCode, setAuthCode] = useState('');

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.post('/api/member/auth', {
        authCode: authCode,
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
      {authState === 'inProgress' ? (
        <p className="mt-2 text-xs text-red-500">인증번호가 발송되었습니다. 유효시간 : {getAuthTime(timeLeft)}</p>
      ) : authState === 'failed' ? (
        <p className="mt-2 text-xs text-red-500">인증에 실패하였습니다.</p>
      ) : authState === 'success' ? (
        <p className="mt-2 text-xs text-blue-500">인증이 완료되었습니다.</p>
      ) : (
        <></>
      )}
    </div>
  );
}
