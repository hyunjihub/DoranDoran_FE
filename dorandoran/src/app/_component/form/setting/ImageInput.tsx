'use client';

import { ChangeEvent, useRef } from 'react';

import CameraIcon from '../../ui/CameraIcon';
import Image from 'next/image';
import { createChatStore } from '@/store/useCreateChat';
import getImageURL from '@/app/_util/getImageURL';
import profile from '/public/img/profile.jpg';

interface ImageInputProps {
  image: string | null;
  type: 'mypage' | 'chat';
  onChange: (imageUrl: string) => void;
}

export default function ImageInput({ image, type, onChange }: ImageInputProps) {
  const setImage = createChatStore((state) => state.setImage);

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
        if (type === 'chat') {
          setImage(url);
        } else {
          onChange(url);
        }
      }
    } else {
      alert('이미지 파일만 업로드 가능합니다.');
    }
    event.target.value = '';
  };

  return (
    <div className="w-full h-[200px] bg-gray-200 flex justify-center items-center">
      <div className="relative w-[140px] h-[140px] rounded-full border">
        <Image className="object-cover rounded-full" src={image || profile} alt="프로필 이미지" fill />
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
