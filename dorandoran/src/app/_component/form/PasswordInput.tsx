export default function PasswordInput({ type }: { type: 'signup' | 'find' }) {
  return (
    <label className="flex flex-col gap-1 font-bold">
      {type === 'find' ? '새 ' : ''}비밀번호
      <input
        className="border rounded p-[12px] text-sm outline-none font-normal"
        placeholder="영문, 숫자, 특수문자 조합 8글자 이상"
      />
      <input className="border rounded p-[12px] text-sm outline-none font-normal" placeholder="비밀번호 확인" />
    </label>
  );
}
