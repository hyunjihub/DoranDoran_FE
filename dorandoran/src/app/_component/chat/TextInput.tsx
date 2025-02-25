'use client';

import { ChangeEvent, useState } from 'react';

import Image from 'next/image';
import camera from '/public/img/icon/camera.svg';
import send from '/public/img/icon/send.svg';

export default function TextInput() {
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div className="absolute bottom-0 left-0 w-full border-t border-[#EAEAEA] px-[16px] py-[12px] bg-white">
      <div className="flex items-center justify-between">
        <textarea
          value={message}
          onChange={handleInputChange}
          placeholder="메시지를 입력하세요..."
          className="w-full h-full outline-none resize-none scrollbar-hide"
        />
        <Image src={camera} alt="이미지 첨부" width={36} height={36} />
        <button>
          <Image className="ml-2" src={send} alt="메시지 전송" width={36} height={36} />
        </button>
      </div>
    </div>
  );
}
