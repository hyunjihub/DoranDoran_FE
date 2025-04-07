'use client';

import { useEffect, useState } from 'react';

import ProtectedRoute from '@/app/_component/ProtectedRoute';
import TextInput from '@/app/_component/form/setting/TextInput';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigationHistory } from '@/app/_util/hooks/useNavigationHistory';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';

export default function Nickname() {
  const { updateData, user } = useStore();
  const [nickname, setNickname] = useState('');
  const router = useRouter();
  const { goBack } = useNavigationHistory();

  useEffect(() => {
    if (user.nickname) setNickname(user.nickname);
  }, [user]);

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.patch('/api/member/mypage/nickname', { nickname });
    },
    onSuccess: () => {
      updateData({ profileImage: user.profileImage || '', nickname: nickname });
      const previousPage = goBack();
      router.push(previousPage);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <ProtectedRoute>
      <div className="h-full flex flex-col bg-[#eaeaea]">
        <label className="mt-[40px] ml-[16px] font-bold">변경하실 닉네임</label>
        <TextInput inputData={nickname} setInputData={setNickname} placeholder={'닉네임'} />
        <p className="ml-[16px] mt-2 text-gray-400 text-xs">
          닉네임은 최소 2글자, 최대 8글자만 가능합니다.
          <br />
          띄어쓰기는 불가능하며 한글과 영문자만 가능합니다.
        </p>
        <button className="mt-5 text-white font-bold bg-[#7B3796] py-[12px]" onClick={() => mutation.mutate()}>
          닉네임 변경
        </button>
      </div>
    </ProtectedRoute>
  );
}
