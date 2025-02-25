import Image from 'next/image';
import camera from '/public/img/icon/camera.svg';

export default function OtherMessage({ message }: { message: string }) {
  return (
    <div className="w-full flex justify-start gap-2 my-2">
      <button className="relative w-[30px] h-[30px] rounded-full">
        <Image className="object-cover" src={camera} alt="프로필 이미지" fill />
      </button>

      <div>
        <p className="font-bold text-sm">도란도란</p>
        <div className="max-w-[200px] bg-gray-200 rounded-lg py-1.5 px-3 text-sm mt-1">{message}</div>
      </div>
    </div>
  );
}
