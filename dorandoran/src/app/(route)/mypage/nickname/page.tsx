'use client';

import { useEffect, useState } from 'react';

import ProtectedRoute from '@/app/_component/ProtectedRoute';
import TextInput from '@/app/_component/form/setting/TextInput';
import axios from 'axios';
import useLogout from '@/app/_util/hooks/useLogout';
import { useMutation } from '@tanstack/react-query';
import { useNavigationHistory } from '@/app/_util/hooks/useNavigationHistory';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';
import { useRouter } from 'next/navigation';
import { userStore } from '@/store/useUserStore';

export default function Nickname() {
  const { updateData, user } = userStore();
  const [nickname, setNickname] = useState('');
  const router = useRouter();
  const { goBack } = useNavigationHistory();
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();

  useEffect(() => {
    if (user.nickname) setNickname(user.nickname);
  }, [user]);

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        await axios.patch('/api/member/mypage/nickname', { nickname });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            return await requestWithRetry('patch', '/api/member/mypage/nickname', { nickname });
          } else if (status === 401 && message === 'refreshToken 만료') {
            executeLogout();
            throw new Error('로그아웃 되었습니다. 다시 로그인 해주세요.');
          } else {
            alert(error.response?.data || error.message);
          }
          throw error;
        } else {
          throw error;
        }
      }
    },
    onSuccess: () => {
      updateData({ profileImage: user.profileImage || '', nickname: nickname });
      const previousPage = goBack();
      router.push(previousPage);
    },
    onError: () => {
      alert('닉네임 형식이 올바르지 않거나 이미 사용 중인 닉네임입니다.');
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
