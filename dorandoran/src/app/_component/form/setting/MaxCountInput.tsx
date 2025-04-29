import Image from 'next/image';
import arrow from '/public/img/icon/prevArrow.svg';
import { createChatStore } from '@/store/useCreateChat';

export default function MaxCountInput() {
  const maxCount = createChatStore((state) => state.maxCount);

  return (
    <div className="flex justify-between px-[16px] py-[18px]">
      <p className="font-bold">최대 참여자 수</p>

      <div className="flex items-center gap-5">
        <p>{maxCount}명</p>
        <Image className="rotate-180" src={arrow} alt="최대 참여자 수" width={8} height={8} />
      </div>
    </div>
  );
}
