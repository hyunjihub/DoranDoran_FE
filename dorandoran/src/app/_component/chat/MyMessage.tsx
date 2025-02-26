export default function MyMessage({ message, timestamp }: { message: string; timestamp: string | null }) {
  return (
    <div className="w-full flex justify-end">
      <div className="flex gap-1.5 items-end my-2">
        {timestamp && <p className="text-xs text-gray-400 font-light">{timestamp}</p>}
        <div className="max-w-[200px] bg-[#7B3796] text-white rounded-lg py-1.5 px-3 text-sm">{message}</div>
      </div>
    </div>
  );
}
