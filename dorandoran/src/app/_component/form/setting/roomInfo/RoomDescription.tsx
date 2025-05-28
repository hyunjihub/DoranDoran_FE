'use client';

import { IRoomInfo } from '@/app/_util/types/types';
import InputToLink from '../InputToLink';
import ReadOnlyInputText from '../ReadOnlyInputText';
import { useParams } from 'next/navigation';

export default function RoomDescription({ info }: { info: IRoomInfo }) {
  const { id } = useParams();

  return (
    <div className="w-full border-b">
      {info.isManager ? (
        <InputToLink
          name="채팅방 이름"
          placeHolder="채팅방 이름을 설정해주세요"
          inputData={info.chatRoomTitle}
          link={`/chat/${id}/info/title`}
        />
      ) : (
        <ReadOnlyInputText name="채팅방 이름" inputData={info.chatRoomTitle} />
      )}
    </div>
  );
}
