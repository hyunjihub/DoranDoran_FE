import { AuthStatus } from '@/app/_util/types/types';
import getAuthTime from '@/app/_util/getAuthTime';

interface AuthCodeErrorProps {
  authState: AuthStatus;
  timeLeft: number;
}

export default function AuthCodeError({ authState, timeLeft }: AuthCodeErrorProps) {
  return (
    <>
      {authState === 'inProgress' ? (
        <p className="mt-2 text-xs text-red-500">인증번호가 발송되었습니다. 유효시간 : {getAuthTime(timeLeft)}</p>
      ) : authState === 'failed' ? (
        <p className="mt-2 text-xs text-red-500">인증에 실패하였습니다.</p>
      ) : authState === 'success' ? (
        <p className="mt-2 text-xs text-blue-500">인증이 완료되었습니다.</p>
      ) : (
        <></>
      )}
    </>
  );
}
