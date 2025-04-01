'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

import CameraIcon from '../../ui/CameraIcon';
import Image from 'next/image';
import axios from 'axios';
import getImageURL from '@/app/_util/getImageURL';
import plus from '/public/img/icon/plus.svg';
import { useMutation } from '@tanstack/react-query';
import { useStore } from '@/store/useStore';

export default function ImageInput() {
  const user = useStore((state) => state.user);
  const updateData = useStore((state) => state.updateData);

  const fileInput = useRef<HTMLInputElement | null>(null);
  const [profileImg, setProfileImg] = useState('');

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.post('/api/member/mypage/profile', { profileImage: profileImg });
    },
    onSuccess: () => {
      updateData({ profileImg: profileImg, nickname: user.nickname || '' });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (profileImg !== '' && profileImg !== user.profileImg) mutation.mutate();
  }, [profileImg, mutation, user]);

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
        setProfileImg(url);
      }
    }
    event.target.value = '';
  };

  return (
    <div className="w-full h-[200px] bg-gray-200 flex justify-center items-center">
      <div className="relative w-[140px] h-[140px] rounded-full border">
        <Image className="object-cover rounded-full" src={profileImg || plus} alt="프로필 이미지" fill />
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
