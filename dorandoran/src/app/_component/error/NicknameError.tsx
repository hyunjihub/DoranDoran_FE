import { FieldErrors } from 'react-hook-form';
import { ISignupForm } from '@/app/_util/types/types';

interface NicknameErrorProps {
  errors: FieldErrors<ISignupForm>;
  isAvailable: boolean | null;
}

export default function NicknameError({ errors, isAvailable }: NicknameErrorProps) {
  return (
    <>
      {errors.nickname ? (
        <span className="text-red-500 text-xs font-normal">{errors.nickname.message}</span>
      ) : isAvailable === false ? (
        <span className="text-red-500 text-xs font-normal">이미 사용 중인 닉네임입니다.</span>
      ) : isAvailable === true ? (
        <span className="text-green-500 text-xs font-normal">사용 가능한 닉네임입니다.</span>
      ) : (
        <span className="h-[16px]"></span>
      )}
    </>
  );
}
