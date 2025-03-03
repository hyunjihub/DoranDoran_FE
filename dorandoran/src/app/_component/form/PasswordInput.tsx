import { FieldError, FieldValues, Path, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { IFindForm, ISignupForm } from '@/app/_util/types/types';

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
  const password = watch('password' as Path<T>);

  return (
    <label className="flex flex-col gap-1 font-bold">
      {type === 'find' ? '새 ' : ''}비밀번호
      <input
        className="border rounded p-[12px] text-sm outline-none font-normal"
        type="password"
        placeholder="영문, 숫자, 특수문자 조합 8글자 이상"
        {...register('password' as Path<T>, {
          required: '비밀번호는 필수입니다.',
          pattern: {
            value:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
            message: '영문, 숫자, 특수문자 조합 8글자 이상이어야 합니다.',
          },
        })}
      />
      <input
        className="border rounded p-[12px] text-sm outline-none font-normal"
        type="password"
        placeholder="비밀번호 확인"
        {...register('passwordConfirm' as Path<T>, {
          required: '비밀번호 확인은 필수입니다.',
          validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
        })}
      />
      {errors.password ? (
        <span className="text-red-500 text-xs font-normal">{errors.password.message}</span>
      ) : errors.passwordConfirm ? (
        <span className="text-red-500 text-xs font-normal">{errors.passwordConfirm.message}</span>
      ) : (
        <></>
      )}
    </label>
  );
}
