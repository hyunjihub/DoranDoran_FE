'use client';

import { ChangeEvent, useRef } from 'react';

import Image from 'next/image';
import plus from '/public/img/icon/plus.svg';

export default function ImageInput() {
  const fileInput = useRef<HTMLInputElement | null>(null);

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
    <div className="w-full h-[200px] bg-gray-200 flex justify-center items-center">
      <div className="relative w-[140px] h-[140px] rounded-full border">
        <Image className="object-cover rounded-full" src={plus} alt="프로필 이미지" fill />
        <button
          className="w-[40px] h-[40px] absolute bottom-0 right-0 rounded-full bg-gray-300"
          onClick={handleUploadImg}
        >
          카메라
        </button>
        <input type="file" className="hidden" ref={fileInput} onChange={handleFileChange} />
      </div>
    </div>
  );
}
