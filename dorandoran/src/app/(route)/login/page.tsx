import Link from 'next/link';
import LoginForm from '@/app/_component/user/LoginForm';

export default function Login() {
  return (
    <div className="h-full px-[16px] flex flex-col">
      <LoginForm />
      <Link className="mt-[8px] text-center text-xs" href={'/find'}>
        아이디 | 비밀번호 찾기
      </Link>
      <Link
        className="mt-[40px] w-full py-[12px] border border-[#7B3796] rounded text-[#7B3796] text-center font-bold"
        href={'/signup'}
        role="button"
      >
        회원가입
      </Link>
    </div>
  );
}
