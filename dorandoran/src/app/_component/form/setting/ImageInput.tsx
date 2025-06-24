'use client';

import { ChangeEvent, useRef, useState } from 'react';

import CameraIcon from '../../ui/CameraIcon';
import Image from 'next/image';
import Loading from '../../ui/Loading';
import getImageURL from '@/app/_util/getImageURL';
import profile from '/public/img/profile.jpg';

interface ImageInputProps {
  image: string | null;
  onChange: (imageUrl: string) => void;
}

export default function ImageInput({ image, onChange }: ImageInputProps) {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadImg = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    try {
      const image = event.target.files?.[0];
      if (image) {
        const url = await getImageURL(image);
        if (url) {
          onChange(url);
        } else {
          alert('이미지를 업로드하는 데 실패했습니다.');
        }
      } else {
        alert('이미지 파일만 업로드 가능합니다.');
      }
    } catch (err) {
      console.error(err);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      event.target.value = '';
      setIsLoading(false);
    }
  };

  return (
    <>
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
      {isLoading && <Loading />}
    </>
  );
}
