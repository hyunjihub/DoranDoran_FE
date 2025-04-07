import { FieldError, FieldValues, Path, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { IFindForm, ISignupForm } from '@/app/_util/types/types';

import Password from './Password';
import PasswordError from '../error/PasswordError';

interface PasswordInputProps<T extends FieldValues> {
  type: 'signup' | 'find';
  register: UseFormRegister<T>;
  errors: {
    password?: FieldError;
    passwordConfirm?: FieldError;
  };
  watch: UseFormWatch<T>;
}

export default function PasswordInput<T extends ISignupForm | IFindForm>({
  type,
  register,
  errors,
  watch,
}: PasswordInputProps<T>) {
  return (
    <label className="flex flex-col gap-1 font-bold">
      {type === 'find' ? '새 ' : ''}비밀번호
      <Password name={'password' as Path<T>} register={register} watch={watch} />
      <Password name={'passwordConfirm' as Path<T>} register={register} watch={watch} />
      <PasswordError errors={errors} />
    </label>
  );
}
