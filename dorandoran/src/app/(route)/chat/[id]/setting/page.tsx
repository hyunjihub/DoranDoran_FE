import ImageInput from '@/app/_component/form/ImageInput';
import InputToLink from '@/app/_component/form/InputToLink';
import MaxCountInput from '@/app/_component/form/MaxCountInput';

export default function Setting() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full border-b border-t">
        <ImageInput />
      </div>
      <div className="w-full  border-b">
        <InputToLink
          name="채팅방 이름"
          placeHolder="채팅방 이름을 설정해주세요"
          inputData="임시 채팅방 이름"
          link="/new-chat/title"
        />
      </div>
      <div className="w-full border-b">
        <InputToLink
          name="채팅방 소개"
          placeHolder="채팅방 소개 문구를 작성해주세요"
          inputData="임시 채팅방 소개 문구를 작성해둔 모습임"
          link="/new-chat/description"
        />
      </div>
      <div className="w-full flex justify-between items-center px-[16px] py-[18px] border-b">
        <p className="font-bold">현재 참여자 수</p>
        <p className="text-gray-400">30명</p>
      </div>
      <div className="w-full border-b">
        <MaxCountInput />
      </div>
      <button className="mt-10 w-[200px] text-white font-bold bg-[#7B3796] rounded-lg py-[12px]">채팅방 폐쇄</button>
      <p className="mt-2 text-xs text-gray-400">
        ※ 채팅방 폐쇄 시 남아있는 참여자 모두 채팅 메시지 전송이 제한 됩니다.
        <br />※ 폐쇄한 채팅방은 다시 복구가 불가능합니다.
      </p>
    </div>
  );
}
