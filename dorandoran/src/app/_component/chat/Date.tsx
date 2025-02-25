import getChatDate from '@/app/_util/getChatDate';

export default function Date({ timestamp }: { timestamp: string }) {
  return (
    <div className="w-[150px] text-center text-xs text-gray-700 bg-gray-200 rounded-xl px-4 py-1 my-3">
      {getChatDate(timestamp)}
    </div>
  );
}
