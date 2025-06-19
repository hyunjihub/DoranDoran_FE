import Image from 'next/image';
import Link from 'next/link';

interface MyMessageProps {
  type: 'text' | 'image' | 'system';
  message: string;
  timestamp: string | null;
}

export default function MyMessage({ type, message, timestamp }: MyMessageProps) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = message.split(urlRegex);

  return (
    <div className="w-full flex justify-end">
      <div className="flex gap-1.5 items-end my-2">
        {timestamp && <p className="text-xs text-gray-400 font-light">{timestamp}</p>}
        <div className="max-w-[200px] bg-[#7B3796] text-white rounded-lg py-1.5 px-3 text-sm">
          {type === 'text' ? (
            <p className="whitespace-pre-wrap">
              {parts.map((part, index) =>
                urlRegex.test(part) ? (
                  <Link
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-200"
                  >
                    {part}
                  </Link>
                ) : (
                  <span key={index}>{part}</span>
                )
              )}
            </p>
          ) : (
            <Image className="py-1" src={message} alt="이미지" width={180} height={0} unoptimized />
          )}
        </div>
      </div>
    </div>
  );
}
