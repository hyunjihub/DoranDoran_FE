'use client';

import { ChangeEvent, useRef } from 'react';

import CameraIcon from '../ui/CameraIcon';
import getImageURL from '@/app/_util/getImageURL';
import { websocketStore } from '@/store/useWebsocketStore';

export default function ImageSend() {
  const sendMessage = websocketStore((state) => state.sendMessage);
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
        sendMessage(url, 'image');
      }
    } else {
      alert('이미지 파일만 업로드 가능합니다.');
    }
    event.target.value = '';
  };

  return (
    <>
      <input className="hidden" type="file" ref={fileInput} onChange={handleFileChange} />

      <button onClick={handleUploadImg}>
        <CameraIcon type="purple" size={30} />
      </button>
    </>
  );
}
