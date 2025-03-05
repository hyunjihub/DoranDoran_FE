import ChatReceiveInput from '@/app/_component/form/setting/ChatReceiveInput';
import EmailInput from '@/app/_component/form/setting/EmailInput';
import Image from 'next/image';
import ImageInput from '@/app/_component/form/setting/ImageInput';
import InputToLink from '@/app/_component/form/setting/InputToLink';
import Link from 'next/link';
import Logout from '@/app/_component/user/Logout';
import ProtectedRoute from '@/app/_component/ProtectedRoute';
import PushNotificationInput from '@/app/_component/form/setting/PushNotificationInput';
import arrow from '/public/img/icon/prevArrow.svg';

export default function MyPage() {
  return (
    <ProtectedRoute>
      <div className="w-full h-full flex flex-col items-center">
        <div className="w-full border-b border-t">
          <ImageInput />
        </div>
        <div className="w-full border-b">
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
            <Image className="rotate-180" src={arrow} alt="비밀번호 재설정" width={8} height={8} />
          </Link>
        </div>
        <div className="w-full border-y">
          <PushNotificationInput />
        </div>
        <Logout />
        <button className="mt-3 text-gray-500 text-xs">회원 탈퇴</button>
      </div>
    </ProtectedRoute>
  );
}
