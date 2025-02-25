import Image from 'next/image';
import Link from 'next/link';
import plus from '/public/img/icon/plus.svg';

export default function CreateButton() {
  return (
    <Link
      className="absolute w-[60px] h-[60px] bottom-[10%] right-5 rounded-full bg-[#7B3796] flex justify-center items-center"
      href={'/new-chat'}
      role="button"
    >
      <Image src={plus} alt="채팅방 생성" width={40} height={40} />
    </Link>
  );
}
