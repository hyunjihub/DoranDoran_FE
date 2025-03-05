'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';

export default function Logout() {
  const { setData } = useStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post('/api/member/logout');
      setData({
        userId: null,
        profileImg: null,
        nickname: null,
        accessToken: null,
      });
      router.push('/');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <button className="mt-10 w-[200px] text-white font-bold bg-[#7B3796] rounded-lg py-[12px]" onClick={handleLogout}>
      로그아웃
    </button>
  );
}
