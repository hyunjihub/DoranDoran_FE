export default function PasswordFind() {
  return (
    <form className="px-[16px] mt-[24px] flex flex-col gap-8">
      <label className="flex flex-col gap-1 font-bold">
        이메일
        <input
          className="border rounded p-[12px] text-sm outline-none font-normal"
          placeholder="doran123@example.com"
        />
      </label>
      <label className="flex flex-col gap-1 font-bold">
        비밀번호
        <input
          className="border rounded p-[12px] text-sm outline-none font-normal"
          placeholder="영문, 숫자, 특수문자 조합 8글자 이상"
        />
        <input className="border rounded p-[12px] text-sm outline-none font-normal" placeholder="비밀번호 확인" />
      </label>
      <button className="w-full py-[12px] border border-[#7B3796] bg-[#7B3796] rounded text-white text-center font-bold">
        비밀번호 재설정
      </button>
    </form>
  );
}
