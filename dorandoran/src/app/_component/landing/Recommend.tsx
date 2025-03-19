'use client';

import { useStore } from '@/store/useStore';

export default function Recommend() {
  const { login } = useStore();

  const handleLogin = () => {
    login({
      userId: 1,
      profileImg: null,
      nickname: '임시로그인',
    });
  };

  return (
    <section className="mt-[60px] px-[24px]">
      <h2 className="text-xl font-bold">새로운 친구를 만나보세요! ️👭</h2>
      <p className="text-xs text-gray-500">새로운 친구, 새로운 인연! 도란도란에서!</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600"
        onClick={handleLogin}
      >
        임시 로그인
      </button>
    </section>
  );
}
