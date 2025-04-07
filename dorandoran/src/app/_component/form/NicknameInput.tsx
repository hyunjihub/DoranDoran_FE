'use client';

import { FieldError, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { ISignupForm } from '@/app/_util/types/types';
import NicknameError from '../error/NicknameError';
import useNicknameCheck from '@/app/_util/hooks/useNicknameCheck';

interface NicknameInput {
  register: UseFormRegister<ISignupForm>;
  watch: UseFormWatch<ISignupForm>;
  errors: {
    nickname?: FieldError;
  };
}

export default function NicknameInput({ register, watch, errors }: NicknameInput) {
  const nickname = watch('nickname');
  const isAvailable = useNicknameCheck(nickname);

  return (
    <label className="flex flex-col gap-1 font-bold">
      닉네임
      <input
        className="border rounded p-[12px] text-sm outline-none font-normal"
        placeholder="한글, 영문자만을 사용하여 2~8글자"
        {...register('nickname', {
          required: '닉네임은 필수입니다.',
          pattern: {
            value: /^[a-zA-Z가-힣]{2,8}$/,
            message: '한글, 영문자만 사용 가능하며 2~8글자여야 합니다.',
          },
        })}
      />
      <NicknameError errors={errors} isAvailable={isAvailable} />
    </label>
  );
}
