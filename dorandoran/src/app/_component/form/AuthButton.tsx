import { FieldValues, Path, UseFormWatch } from 'react-hook-form';
import { IFindForm, ISignupForm } from '@/app/_util/types/types';

import { AuthStatus } from '@/app/_util/types/types';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

interface AuthButtonProps<T extends FieldValues> {
  authState: AuthStatus;
  setAuthState: React.Dispatch<React.SetStateAction<AuthStatus>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  watch: UseFormWatch<T>;
}

export default function AuthButton<T extends ISignupForm | IFindForm>({
  authState,
  setAuthState,
  setIsLoading,
  watch,
}: AuthButtonProps<T>) {
  const email = watch('email' as Path<T>);

  const mutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      const response = await axios.post('/api/member/auth/email', {
        email: email,
        isSignUp: true,
      });
      return response.data;
    },
    onSuccess: () => {
      setIsLoading(false);
      setAuthState('inProgress');
    },
    onError: (error) => {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.error;
        if (errorMessage === '이미 가입된 이메일입니다.') {
          alert('이미 가입된 계정입니다.');
        } else if (errorMessage === '회원정보를 찾을 수 없습니다.') {
          alert('해당 이메일로 가입된 계정이 존재하지 않습니다.');
        }
      }
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
