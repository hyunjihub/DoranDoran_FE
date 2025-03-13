import Toggle from '../../ui/Toggle';

export default function ChatReceiveInput({ isPermmited }: { isPermmited: boolean }) {
  return (
    <div className="flex justify-between px-[16px] py-[18px]">
      <div>
        <p className="font-bold">1:1 채팅 수신 여부</p>
        <small className="text-gray-400">수신 거부 시 추천 친구에서 프로필이 표시되지 않습니다.</small>
      </div>

      <Toggle isActive={isPermmited} />
    </div>
  );
}
