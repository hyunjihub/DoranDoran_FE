'use client';

import { ChangeEvent } from 'react';

interface NumberButtonProps {
  count: number;
  setCount: (count: number) => void;
  isManager: boolean;
}

export default function NumberButton({ count, setCount, isManager }: NumberButtonProps) {
  const handleIncrease = () => {
    if (count < 100) setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 2) setCount(count - 1);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      const newValue = Math.min(100, Math.max(2, value));
      setCount(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isManager ? (
        <>
          <button
            onClick={handleDecrease}
            className="w-7 h-7 flex items-center justify-center rounded bg-gray-200 font-bold"
          >
            -
          </button>
          <div className="relative flex items-center">
            <input
              type="number"
              min={2}
              max={100}
              value={count}
              onChange={handleInputChange}
              className="w-[28px] text-center outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="ml-1 font-medium">명</span>
          </div>

          <button
            onClick={handleIncrease}
            className="w-7 h-7 flex items-center justify-center rounded bg-gray-200 font-bold"
          >
            +
          </button>
        </>
      ) : (
        <p>{count} 명</p>
      )}
    </div>
  );
}
