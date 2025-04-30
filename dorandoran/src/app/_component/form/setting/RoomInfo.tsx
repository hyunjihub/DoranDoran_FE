'use client';

import DeleteChatRoom from '@/app/_component/chat/DeleteChatRoom';
import Image from 'next/image';
import ImageInput from '@/app/_component/form/setting/ImageInput';
import InputToLink from '@/app/_component/form/setting/InputToLink';
import MaxCountInput from '@/app/_component/form/setting/MaxCountInput';
import ReadOnlyInputText from './ReadOnlyInputText';
import axios from 'axios';
import { chatStore } from '@/store/useChatStore';
import { useQuery } from '@tanstack/react-query';

export default function RoomInfo() {
  const isManager = chatStore((state) => state.isManager);

  const { data } = useQuery<boolean | null>({
    queryKey: ['room'],
    queryFn: async () => {
      try {
        await axios.get(`/api/chat/chatrooms?id=${123}`);
        return true;
      } catch {
        return false;
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
    refetchInterval: false,
  });

  console.log(data); // data 미사용으로 인한 오류 방지를 위한 임시 출력 코드

  return (
    <>
      <div className="w-full border-b border-t">
        {isManager ? (
          <ImageInput image={''} type="chat" />
        ) : (
          <div className="w-full h-[200px] bg-gray-200 flex justify-center items-center">
            <div className="relative w-[140px] h-[140px] rounded-full border">
              <Image className="object-cover rounded-full" src={''} alt="프로필 이미지" fill />
            </div>
          </div>
        )}
      </div>
      <div className="w-full border-b">
        {isManager ? (
          <InputToLink
            name="채팅방 이름"
            placeHolder="채팅방 이름을 설정해주세요"
            inputData="임시 채팅방 이름"
            link="/new-chat/title"
          />
        ) : (
          <ReadOnlyInputText name="채팅방 이름" inputData="임시 채팅방 이름" />
        )}
      </div>
      <div className="w-full border-b">
        {isManager ? (
          <InputToLink
            name="채팅방 소개"
            placeHolder="채팅방 소개 문구를 작성해주세요"
            inputData="임시 채팅방 소개 문구를 작성해둔 모습임"
            link="/new-chat/description"
          />
        ) : (
          <ReadOnlyInputText name="채팅방 소개" inputData="임시 채팅방 소개 문구를 작성해둔 모습임" />
        )}
      </div>
      <div className="w-full flex justify-between items-center px-[16px] py-[18px] border-b">
        <p className="font-bold">현재 참여자 수</p>
        <p className="text-gray-400">{30}명</p>
      </div>
      <div className="w-full border-b">
        <MaxCountInput />
      </div>
      <DeleteChatRoom />
    </>
  );
}
