'use client';

import ProtectedRoute from '@/app/_component/ProtectedRoute';
import TextInput from '@/app/_component/form/setting/TextInput';
import { useState } from 'react';

export default function Nickname() {
  const [nickname, setNickname] = useState('');

  return (
    <ProtectedRoute>
      <div className="h-full flex flex-col bg-[#eaeaea]">
        <label className="mt-[40px] ml-[16px] font-bold">변경하실 닉네임</label>
        <TextInput inputData={nickname} setInputData={setNickname} />
        <p className="ml-[16px] mt-2 text-gray-400 text-xs">
          닉네임은 최소 2글자, 최대 8글자만 가능합니다.
          <br />
          띄어쓰기는 불가능하며 한글과 영문자만 가능합니다.
        </p>
        <button className="mt-5 text-white font-bold bg-[#7B3796] py-[12px]">닉네임 변경</button>
      </div>
    </ProtectedRoute>
  );
}
