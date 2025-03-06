import { FieldValues, Path, UseFormWatch } from 'react-hook-form';
import { IFindForm, ISignupForm } from '@/app/_util/types/types';

import { AuthStatus } from '@/app/_util/types/types';
import axios from 'axios';

interface AuthButtonProps<T extends FieldValues> {
  authState: AuthStatus;
  setAuthState: React.Dispatch<React.SetStateAction<AuthStatus>>;
  watch: UseFormWatch<T>;
}

export default function AuthButton<T extends ISignupForm | IFindForm>({
  authState,
  setAuthState,
  watch,
}: AuthButtonProps<T>) {
  const email = watch('email' as Path<T>);

  const handleAuthActive = async () => {
    if (!email) {
      alert('이메일을 입력해주세요');
      return;
    }

    try {
      await axios.post('/api/member/email', {
        email: email,
        isSignUp: true,
      });
      setAuthState('inProgress');
    } catch (error) {
      console.log(error);
    }
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
