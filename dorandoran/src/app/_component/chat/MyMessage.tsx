export default function MyMessage({ message }: { message: string }) {
  return (
    <div className="w-full flex justify-end">
      <div className="max-w-[200px] bg-[#7B3796] text-white rounded-lg py-1.5 px-3 text-sm my-2">{message}</div>
    </div>
  );
}
