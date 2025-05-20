'use client';

import TextInput from '../setting/TextInput';

interface InfoInputProps {
  setInputData: React.Dispatch<React.SetStateAction<string>>;
  inputData: string;
  type: 'title' | 'description';
  onChange: () => void;
}

export default function InfoInput({ inputData, setInputData, type, onChange }: InfoInputProps) {
  return (
    <div className="h-full flex flex-col bg-[#eaeaea]">
      <label className="mt-[40px] ml-[16px] font-bold">{type === 'title' ? '채팅방 이름' : '채팅방 소개'}</label>
      <TextInput
        inputData={inputData}
        setInputData={setInputData}
        placeholder={type === 'title' ? '채팅방 이름' : '채팅방 소개'}
      />
      <p className="ml-[16px] mt-2 text-gray-400 text-xs">
        {type === 'title'
          ? '채팅방 이름은 최대 15글자까지 가능합니다.'
          : '채팅방 소개 문구는 최대 255글자까지 가능합니다.'}
      </p>
      <button className="mt-5 text-white font-bold bg-[#7B3796] py-[12px]" onClick={onChange}>
        변경
      </button>
    </div>
  );
}
