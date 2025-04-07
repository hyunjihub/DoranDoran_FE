'use client';

import MypageInfo from '@/app/_component/user/MyPageInfo';
import ProtectedRoute from '@/app/_component/ProtectedRoute';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const PromptModal = dynamic(() => import('@/app/_component/user/PromptModal'));

export default function MyPage() {
  const [isActive, setIsActive] = useState(false);

  return (
    <ProtectedRoute>
      <MypageInfo setIsActive={setIsActive} />
      {isActive && <PromptModal setIsActive={setIsActive} />}
    </ProtectedRoute>
  );
}
