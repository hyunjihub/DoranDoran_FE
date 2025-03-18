import { FieldValues, Path, UseFormWatch } from 'react-hook-form';
import { IFindForm, ISignupForm } from '@/app/_util/types/types';

import { AuthStatus } from '@/app/_util/types/types';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

interface AuthButtonProps<T extends FieldValues> {
  authState: AuthStatus;
  setAuthState: React.Dispatch<React.SetStateAction<AuthStatus>>;
  setClientCode: React.Dispatch<React.SetStateAction<string | null>>;
  watch: UseFormWatch<T>;
}

export default function AuthButton<T extends ISignupForm | IFindForm>({
  authState,
  setAuthState,
  watch,
  setClientCode,
}: AuthButtonProps<T>) {
  const email = watch('email' as Path<T>);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/member/email', {
        email: email,
        isSignUp: true,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setClientCode(data.clientCode);
      setAuthState('inProgress');
    },
    onError: (error) => {
      alert(error);
    },
  });

  const handleAuthActive = async () => {
    if (!email) {
      alert('이메일을 입력해주세요');
      return;
    }
    mutation.mutate();
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
