export default function FindHeader({
  type,
  setType,
}: {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <header>
      <ul className="flex">
        <li
          className={`w-1/2 text-center py-1.5 ${type === 'email' ? 'font-bold border-b-2 border-[#7B3796] ' : ''}`}
          onClick={() => setType('email')}
        >
          이메일 찾기
        </li>
        <li
          className={`w-1/2 text-center py-1.5 ${type === 'password' ? 'font-bold border-b-2 border-[#7B3796] ' : ''}`}
          onClick={() => setType('password')}
        >
          비밀번호 재설정
        </li>
      </ul>
    </header>
  );
}
