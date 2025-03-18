'use client';

import { ChangeEvent, useRef } from 'react';

import CameraIcon from '../../ui/CameraIcon';
import Image from 'next/image';
import getImageURL from '@/app/_util/getImageURL';
import plus from '/public/img/icon/plus.svg';

export default function ImageInput() {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleUploadImg = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (image) {
      const url = await getImageURL(image);
      if (url) {
        console.log(url);
      }
    }
    event.target.value = '';
  };

  return (
    <div className="w-full h-[200px] bg-gray-200 flex justify-center items-center">
      <div className="relative w-[140px] h-[140px] rounded-full border">
        <Image className="object-cover rounded-full" src={plus} alt="프로필 이미지" fill />
        <button
          className="w-[40px] h-[40px] absolute bottom-0 right-0 rounded-full bg-gray-300 flex items-center justify-center"
          onClick={handleUploadImg}
        >
          <CameraIcon type="default" size={28} />
        </button>
        <input type="file" className="hidden" ref={fileInput} onChange={handleFileChange} />
      </div>
    </div>
  );
}
