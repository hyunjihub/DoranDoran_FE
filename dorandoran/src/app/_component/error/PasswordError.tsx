import { FieldErrors, FieldValues } from 'react-hook-form';
import { IFindForm, ISignupForm } from '@/app/_util/types/types';

interface PasswordErrorProps<T extends FieldValues> {
  errors: FieldErrors<T>;
}

export default function PasswordError<T extends ISignupForm | IFindForm>({ errors }: PasswordErrorProps<T>) {
  return (
    <>
      {errors.password ? (
        <span className="text-red-500 text-xs font-normal">{errors.password.message as string}</span>
      ) : errors.passwordConfirm ? (
        <span className="text-red-500 text-xs font-normal">{errors.passwordConfirm.message as string}</span>
      ) : (
        <></>
      )}
    </>
  );
}
