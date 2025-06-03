'use client';

import NumberButton from '../../ui/NumberButton';
import NumberSelect from '../../ui/NumberSelect';
import { isMobile } from 'react-device-detect';

interface MaxCountInputProps {
  count: number;
  setCount: (count: number) => void;
  isManager: boolean;
}

export default function MaxCountInput({ isManager, count, setCount }: MaxCountInputProps) {
  return (
    <div className="flex justify-between items-center px-[16px] py-[18px]">
      <p className="font-bold">최대 참여자 수</p>

      <div className="flex items-center gap-5">
        {isMobile ? (
          <NumberSelect count={count} setCount={setCount} />
        ) : (
          <NumberButton count={count} setCount={setCount} isManager={isManager} />
        )}
      </div>
    </div>
  );
}
