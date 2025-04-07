import { FieldValues, Path, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { IFindForm, ISignupForm } from '@/app/_util/types/types';

import Image from 'next/image';
import eye from '/public/img/icon/eye.svg';
import eyeClose from '/public/img/icon/eyeClose.svg';
import { useState } from 'react';

interface PasswordProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
}

export default function Password<T extends ISignupForm | IFindForm>({ name, register, watch }: PasswordProps<T>) {
  const [passwordClosed, setPasswordClosed] = useState(true);
  const password = watch('password' as Path<T>);

  const finalRules =
    name === 'passwordConfirm'
      ? {
          required: '비밀번호 확인은 필수입니다.',
          validate: (value: string) => value === password || '비밀번호가 일치하지 않습니다.',
        }
      : {
          required: '비밀번호는 필수입니다.',
          pattern: {
            value:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
            message: '영문, 숫자, 특수문자 조합 8글자 이상이어야 합니다.',
          },
        };

  return (
    <div className="relative w-full">
      <input
        className="w-full border rounded py-[12px] pl-[12px] pr-[40px] text-sm outline-none font-normal"
        type={passwordClosed ? 'password' : 'text'}
        placeholder={name === 'password' ? '영문, 숫자, 특수문자 조합 8글자 이상' : '비밀번호 확인'}
        {...register(name, finalRules)}
      />
      <Image
        className="absolute right-[12px] top-[10px]"
        src={passwordClosed ? eye : eyeClose}
        alt="비밀번호 표시"
        width={24}
        height={24}
        onClick={() => setPasswordClosed(!passwordClosed)}
      />
    </div>
  );
}
