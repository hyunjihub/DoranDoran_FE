import { IMessage } from '@/app/_util/types/types';
import Image from 'next/image';
import TextMessage from './TextMessage';

interface MyMessageProps {
  message: IMessage;
  time: string | null;
  onImageLoad: () => void;
}

export default function MyMessage({ message, time, onImageLoad }: MyMessageProps) {
  return (
    <div className="w-full flex justify-end">
      <div className="flex gap-1.5 items-end my-2">
        {time && <p className="text-xs text-gray-400 font-light">{time}</p>}
        <div className="max-w-[200px] bg-[#7B3796] text-white rounded-lg py-1.5 px-3 text-sm">
          {message.type === 'text' ? (
            <TextMessage message={message.content} />
          ) : (
            <Image
              className="py-1"
              src={message.content}
              alt="이미지"
              width={180}
              height={0}
              unoptimized
              onLoad={onImageLoad}
            />
          )}
        </div>
      </div>
    </div>
  );
}
