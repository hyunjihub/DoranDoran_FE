import AuthButton from './AuthButton';
import AuthCode from './AuthCode';
import { AuthStatus } from '@/app/_util/types/types';
import { useState } from 'react';
import { useTimer } from '@/app/_util/useTimer';

interface EmailInputProps {
  authState: AuthStatus;
  setAuthState: React.Dispatch<React.SetStateAction<AuthStatus>>;
}

export default function EmailInput({ authState, setAuthState }: EmailInputProps) {
  const [timeLeft, setTimeLeft] = useState(180);
  useTimer(timeLeft, setTimeLeft, authState, setAuthState);

  return (
    <label className="flex flex-col gap-1 font-bold relative">
      이메일
      <input
        className="border rounded p-[12px] text-sm outline-none font-normal"
        disabled={authState !== 'idle'}
        placeholder="doran123@example.com"
      />
      <AuthButton authState={authState} setAuthState={setAuthState} />
      {authState !== 'idle' && <AuthCode authState={authState} setAuthState={setAuthState} timeLeft={timeLeft} />}
    </label>
  );
}
