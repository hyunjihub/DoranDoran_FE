import { AuthStatus } from '@/app/_util/types/types';

interface AuthButtonProps {
  authState: AuthStatus;
  setAuthState: React.Dispatch<React.SetStateAction<AuthStatus>>;
}

export default function AuthButton({ authState, setAuthState }: AuthButtonProps) {
  const handleAuthActive = () => {
    setAuthState('inProgress');
  };

  return (
    <button
      className={`absolute top-[38px] right-[12px] w-[90px] rounded py-[6px] text-xs text-white font-normal ${
        authState === 'success' ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#7B3796]'
      }`}
      onClick={handleAuthActive}
      disabled={authState === 'success'}
      type="button"
    >
      {authState === 'idle' ? '인증번호 받기' : '인증번호 재전송'}
    </button>
  );
}
