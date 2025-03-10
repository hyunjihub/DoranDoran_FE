'use client';

import axios from 'axios';

export default function Recommend() {
  const handleRecommend = async () => {
    try {
      const response = await axios.post('https://api.dorandoran.online/member/login', {
        email: 'test1234@example.com',
        password: 'test1234!',
      });
      console.log('추천 결과:', response.data);
    } catch (error) {
      console.error('추천 요청 실패:', error);
    }
  };

  return (
    <section className="mt-[32px] px-[24px]">
      <h2 className="text-xl font-bold">새로운 친구를 만나보세요! ️👭</h2>
      <p className="text-xs text-gray-500">새로운 친구, 새로운 인연! 도란도란에서!</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600"
        onClick={handleRecommend}
      >
        친구 추천받기
      </button>
    </section>
  );
}
