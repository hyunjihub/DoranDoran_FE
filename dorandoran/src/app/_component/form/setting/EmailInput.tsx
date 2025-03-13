export default function EmailInput({ email }: { email: string }) {
  return (
    <div className="flex justify-between px-[16px] py-[18px]">
      <p className="font-bold">이메일</p>
      <p className="text-gray-400">{email}</p>
    </div>
  );
}
