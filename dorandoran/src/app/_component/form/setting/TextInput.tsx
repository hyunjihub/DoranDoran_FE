'use client';

import { ChangeEvent, useEffect, useRef } from 'react';

import Image from 'next/image';
import deleteIcon from '/public/img/icon/delete.svg';

interface TextInputProps {
  setInputData: React.Dispatch<React.SetStateAction<string>>;
  inputData: string;
  placeholder: string;
}

export default function TextInput({ setInputData, inputData, placeholder }: TextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };

  const handleClear = () => {
    setInputData('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="fixed bottom-0 w-full">
      <input
        ref={inputRef}
        className="w-full mt-3 py-[12px] pl-[16px] pr-[40px] outline-none"
        placeholder={placeholder}
        value={inputData}
        onChange={handleChange}
      />
      {inputData && (
        <Image
          src={deleteIcon}
          alt="전체 지우기"
          width={28}
          height={28}
          className="absolute right-4 top-[34px] transform -translate-y-1/2 cursor-pointer"
          onClick={handleClear}
        />
      )}
    </div>
  );
}
