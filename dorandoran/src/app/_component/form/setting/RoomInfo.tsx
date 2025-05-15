'use client';

import { useParams, useRouter } from 'next/navigation';

import DeleteChatRoom from '@/app/_component/chat/DeleteChatRoom';
import { IRoomInfo } from '@/app/_util/types/types';
import Image from 'next/image';
import ImageInput from '@/app/_component/form/setting/ImageInput';
import InputToLink from '@/app/_component/form/setting/InputToLink';
import MaxCountInput from '@/app/_component/form/setting/MaxCountInput';
import ReadOnlyInputText from './ReadOnlyInputText';
import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function RoomInfo() {
  const router = useRouter();
  const { id } = useParams();

  const { data } = useQuery<IRoomInfo>({
    queryKey: ['room'],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/chat/chatrooms?id=${123}`);
        return response.data;
      } catch {
        return null;
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
    refetchInterval: false,
  });

  useEffect(() => {
    if (data === null) {
      alert('접근 가능한 페이지가 아닙니다.');
      router.push('/');
    }
  }, [data, router]);

  return (
    data && (
      <>
        <div className="w-full border-b border-t">
          {data.isManager ? (
            <ImageInput image={data.chatRoomImage} type="chat" />
          ) : (
            <div className="w-full h-[200px] bg-gray-200 flex justify-center items-center">
              <div className="relative w-[140px] h-[140px] rounded-full border">
                <Image className="object-cover rounded-full" src={data.chatRoomImage} alt="프로필 이미지" fill />
              </div>
            </div>
          )}
        </div>
        <div className="w-full border-b">
          {data.isManager ? (
            <InputToLink
              name="채팅방 이름"
              placeHolder="채팅방 이름을 설정해주세요"
              inputData={data.chatRoomTitle}
              link={`/chat/${id}/info/title`}
            />
          ) : (
            <ReadOnlyInputText name="채팅방 이름" inputData={data.chatRoomTitle} />
          )}
        </div>
        <div className="w-full border-b">
          {data.isManager ? (
            <InputToLink
              name="채팅방 소개"
              placeHolder="채팅방 소개 문구를 작성해주세요"
              inputData={data.description}
              link={`/chat/${id}/info/description`}
            />
          ) : (
            <ReadOnlyInputText name="채팅방 소개" inputData={data.description} />
          )}
        </div>
        <div className="w-full flex justify-between items-center px-[16px] py-[18px] border-b">
          <p className="font-bold">현재 참여자 수</p>
          <p className="text-gray-400">{data.currentCount}명</p>
        </div>
        <div className="w-full border-b">
          {data.isManager ? (
            <MaxCountInput isManager={data.isManager} />
          ) : (
            <div className="flex justify-between items-center px-[16px] py-[18px]">
              <p className="font-bold">최대 참여자 수</p>

              <div className="flex items-center gap-5">
                <p>{data.maxCount}명</p>
              </div>
            </div>
          )}
        </div>
        <DeleteChatRoom isManager={data.isManager} />
      </>
    )
  );
}
