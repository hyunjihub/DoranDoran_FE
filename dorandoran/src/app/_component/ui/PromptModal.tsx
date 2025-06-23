'use client';

import { useState } from 'react';
import useWithdraw from '@/app/_util/hooks/useWithdraw';

interface PromptModalProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PromptModal({ setIsActive }: PromptModalProps) {
  const [input, setInput] = useState('');
  const mutation = useWithdraw(input);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="mb-2 text-xl font-bold text-center">비밀번호 입력</h2>
        <p className="mb-2 text-center text-xs text-gray-500">
          회원님의 계정 보호를 위해 비밀번호를 한 번 더 입력해주세요.
          <br />
          ⚠️ 탈퇴 후에는 모든 데이터가 삭제되며 복구할 수 없습니다.
        </p>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded mb-4 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        <div className="flex justify-end space-x-3 text-sm">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded" onClick={() => setIsActive(false)}>
            취소
          </button>
          <button
            className="px-4 py-2 bg-[#7B3796] text-white rounded"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
