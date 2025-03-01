export default function ChatReceiveInput() {
  return (
    <div className="flex justify-between px-[16px] py-[18px]">
      <div>
        <p className="font-bold">1:1 채팅 수신 여부</p>
        <small className="text-gray-400">수신 거부 시 추천 친구에서 프로필이 표시되지 않습니다.</small>
      </div>

      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" role="switch" />
        <div className="relative w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#7B3796] dark:peer-checked:bg-[#7B3796]"></div>
      </label>
    </div>
  );
}
