'use client';

import { ChangeEvent, useRef, useState } from 'react';

import CameraIcon from '../ui/CameraIcon';
import Image from 'next/image';
import send from '/public/img/icon/send.svg';

export default function MessageInput() {
  const [message, setMessage] = useState<string>('');
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleUploadImg = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('파일 업로드:', file.name);
    }
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
        <input className="hidden" type="file" ref={fileInput} onChange={handleFileChange} />

        <button onClick={handleUploadImg}>
          <CameraIcon type="purple" size={30} />
        </button>

        <button className="ml-2">
          <Image src={send} alt="메시지 전송" width={40} height={40} />
        </button>
      </div>
    </div>
  );
}
