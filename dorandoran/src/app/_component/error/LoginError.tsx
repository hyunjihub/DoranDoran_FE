import { FieldErrors } from 'react-hook-form';
import { ILoginForm } from '@/app/_util/types/types';

interface LoginErrorProps {
  errors: FieldErrors<ILoginForm>;
  capsLockFlag: boolean;
  loginFail: boolean;
}

export default function LoginError({ errors, capsLockFlag, loginFail }: LoginErrorProps) {
  return (
    <>
      {errors.email || errors.password ? (
        <span className="text-red-500 text-xs font-normal">{errors.email?.message || errors.password?.message}</span>
      ) : capsLockFlag ? (
        <span className="text-red-500 text-xs font-normal">Caps Lock이 켜져 있습니다.</span>
      ) : loginFail ? (
        <span className="text-red-500 text-xs font-normal">일치하는 계정 정보가 존재하지 않습니다.</span>
      ) : (
        <></>
      )}
    </>
  );
}
