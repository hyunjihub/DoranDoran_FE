import Image from 'next/image';
import plus from '/public/img/icon/plus.svg';

export default function OtherMessage({ message, timestamp }: { message: string; timestamp: string | null }) {
  return (
    <div className="w-full flex justify-start gap-2 my-2">
      <button className="relative w-[30px] h-[30px] rounded-full">
        <Image className="object-cover" src={plus} alt="프로필 이미지" fill />
      </button>

      <div>
        <p className="font-bold text-sm">도란도란</p>

        <div className="flex gap-1.5 items-end">
          <div className="max-w-[200px] bg-gray-200 rounded-lg py-1.5 px-3 text-sm mt-1 font-light">{message}</div>
          {timestamp && <p className="text-xs text-gray-400">{timestamp}</p>}
        </div>
      </div>
    </div>
  );
}
