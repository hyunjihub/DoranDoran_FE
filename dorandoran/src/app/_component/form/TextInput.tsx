import { ChangeEvent } from 'react';
import Image from 'next/image';
import deleteIcon from '/public/img/icon/delete.svg';

interface TextInputProps {
  setInputData: React.Dispatch<React.SetStateAction<string>>;
  inputData: string;
}

export default function TextInput({ setInputData, inputData }: TextInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };

  const handleClear = () => {
    setInputData('');
  };

  return (
    <div className="w-full relative">
      <input
        className="w-full mt-3 py-[12px] pl-[16px] pr-[40px] outline-none"
        placeholder="닉네임"
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
