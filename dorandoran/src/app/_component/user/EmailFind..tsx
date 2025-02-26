export default function EmailFind() {
  return (
    <form className="px-[16px] mt-[24px] flex flex-col gap-8">
      <label className="flex flex-col gap-1 font-bold">
        이메일
        <input
          className="border rounded p-[12px] text-sm outline-none font-normal"
          placeholder="doran123@example.com"
        />
      </label>
      <button className="w-full py-[12px] border border-[#7B3796] bg-[#7B3796] rounded text-white text-center font-bold">
        이메일 찾기
      </button>
    </form>
  );
}
