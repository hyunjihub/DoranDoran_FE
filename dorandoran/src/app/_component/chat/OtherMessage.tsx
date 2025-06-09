import { IMessage } from '@/app/_util/types/types';
import Image from 'next/image';
import profile from '/public/img/profile.jpg';

interface OtherMessageProps {
  message: IMessage;
  time: string | null;
  setModalOpen: React.Dispatch<React.SetStateAction<number>>;
}

export default function OtherMessage({ message, time, setModalOpen }: OtherMessageProps) {
  const handleClickProfile = () => {
    setModalOpen(message.senderId);
  };

  return (
    <div className="w-full flex justify-start gap-2 my-2">
      <button className="relative w-[40px] h-[40px] rounded-full" onClick={handleClickProfile}>
        <Image
          className="object-cover rounded-full"
          src={message.senderProfileImage || profile}
          alt="프로필 이미지"
          fill
        />
      </button>

      <div>
        <p className="font-bold text-sm">{message.senderNickname}</p>

        <div className="flex gap-1.5 items-end">
          <div className="max-w-[200px] bg-gray-200 rounded-lg py-1.5 px-3 text-sm mt-1 font-light">
            {message.type === 'text' ? (
              <p>{message.content}</p>
            ) : (
              <Image src={message.content} alt="이미지" width={180} height={0} unoptimized />
            )}
          </div>
          {time && <p className="text-xs text-gray-400">{message.time}</p>}
        </div>
      </div>
    </div>
  );
}
