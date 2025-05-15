'use client';

import NumberButton from '../../ui/NumberButton';
import { createChatStore } from '@/store/useCreateChat';
import { isMobile } from 'react-device-detect';

export default function MaxCountInput({ isManager }: { isManager: boolean }) {
  const maxCount = createChatStore((state) => state.maxCount);
  const setMax = createChatStore((state) => state.setMax);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMax(Number(e.target.value));
  };

  return (
    <div className="flex justify-between items-center px-[16px] py-[18px]">
      <p className="font-bold">최대 참여자 수</p>

      <div className="flex items-center gap-5">
        {isMobile ? (
          <select className="border rounded px-3 py-1 text-sm" value={maxCount} onChange={handleChange}>
            {[...Array(99)].map((_, i) => {
              const val = i + 2;
              return (
                <option key={val} value={val}>
                  {val}명
                </option>
              );
            })}
          </select>
        ) : (
          <NumberButton count={maxCount} setCount={setMax} isManager={isManager} />
        )}
      </div>
    </div>
  );
}
