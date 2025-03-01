import ChatReceiveInput from '@/app/_component/form/ChatReceiveInput';
import EmailInput from '@/app/_component/form/EmailInput';
import Image from 'next/image';
import ImageInput from '@/app/_component/form/ImageInput';
import InputToLink from '@/app/_component/form/InputToLink';
import Link from 'next/link';
import PushNotificationInput from '@/app/_component/form/PushNotificationInput';
import arrow from '/public/img/icon/prevArrow.svg';

export default function MyPage() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full border-b border-t">
        <ImageInput />
      </div>
      <div className="w-full  border-b">
        <InputToLink name="닉네임 변경" placeHolder="" link="/mypage/nickname" inputData="임시닉네임" />
      </div>
      <div className="w-full border-b">
        <EmailInput />
      </div>
      <div className="w-full border-b">
        <ChatReceiveInput />
      </div>
      <div className="w-full flex justify-between items-center px-[16px] py-[18px]">
        <p className="font-bold">비밀번호 재설정</p>
        <Link href={'/find?type=password'}>
          <Image className="rotate-180" src={arrow} alt="닉네임 변경" width={8} height={8} />
        </Link>
      </div>
      <div className="w-full border-y">
        <PushNotificationInput />
      </div>
      <button className="mt-10 w-[200px] text-white font-bold bg-[#7B3796] rounded-lg py-[12px]">로그아웃</button>
      <button className="mt-3 text-gray-500 text-xs">회원 탈퇴</button>
    </div>
  );
}
