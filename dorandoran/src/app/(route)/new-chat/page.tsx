import ImageInput from '@/app/_component/form/ImageInput';
import InputToLink from '@/app/_component/form/InputToLink';
import MaxCountInput from '@/app/_component/form/MaxCountInput';

export default function NewChat() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full border-b border-t">
        <ImageInput />
      </div>
      <div className="w-full  border-b">
        <InputToLink name="채팅방 이름" placeHolder="채팅방 이름을 설정해주세요" inputData="" link="/new-chat/title" />
      </div>
      <div className="w-full border-b">
        <InputToLink
          name="채팅방 소개"
          placeHolder="채팅방 소개 문구를 작성해주세요"
          inputData=""
          link="/new-chat/description"
        />
      </div>
      <div className="w-full border-b">
        <MaxCountInput />
      </div>
      <button className="mt-10 w-[200px] text-white font-bold bg-[#7B3796] rounded-lg py-[12px]">채팅방 생성</button>
    </div>
  );
}
