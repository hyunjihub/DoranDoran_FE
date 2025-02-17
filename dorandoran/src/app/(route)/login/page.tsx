import Link from 'next/link';

export default function Login() {
  return (
    <div className="h-full px-[16px] flex flex-col">
      <form className="mt-[24px] flex flex-col gap-10">
        <label className="flex flex-col gap-1">
          이메일
          <input className="border rounded p-[12px] text-sm outline-none" placeholder="doran123@example.com" />
        </label>
        <label className="flex flex-col gap-1">
          비밀번호
          <input
            className="border rounded p-[12px] text-sm outline-none"
            placeholder="영문, 숫자, 특수문자 조합 8글자 이상"
          />
        </label>
        <button className="w-full py-[12px] border border-[#7B3796] bg-[#7B3796] rounded text-white text-center font-bold">
          로그인
        </button>
      </form>
      <Link className="mt-[8px] text-center text-xs" href={'/find'}>
        아이디/비밀번호 찾기
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
