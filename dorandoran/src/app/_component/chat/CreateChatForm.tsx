'use client';

import CreateButton from './CreateButton';
import ImageInput from '../form/setting/ImageInput';
import InputToLink from '../form/setting/InputToLink';
import MaxCountInput from '../form/setting/MaxCountInput';
import createChatStore from '@/store/useCreateChatStore';

export default function CreateChatForm() {
  const chatRoomImage = createChatStore((state) => state.chatRoomImage);
  const chatRoomTitle = createChatStore((state) => state.chatRoomTitle);
  const description = createChatStore((state) => state.description);
  const maxCount = createChatStore((state) => state.maxCount);
  const setImage = createChatStore((state) => state.setImage);
  const setMax = createChatStore((state) => state.setMax);

  const handleSetImage = (profileImage: string) => {
    setImage(profileImage);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full border-b border-t">
        <ImageInput image={chatRoomImage} onChange={handleSetImage} />
      </div>
      <div className="w-full border-b">
        <InputToLink
          name="채팅방 이름"
          placeHolder="채팅방 이름을 설정해주세요"
          inputData={chatRoomTitle as string}
          link="/new-chat/title"
        />
      </div>
      <div className="w-full border-b">
        <InputToLink
          name="채팅방 소개"
          placeHolder="채팅방 소개 문구를 작성해주세요"
          inputData={description as string}
          link="/new-chat/description"
        />
      </div>
      <div className="w-full border-b">
        <MaxCountInput isManager={true} count={maxCount} setCount={setMax} />
      </div>
      <CreateButton />
    </div>
  );
}
