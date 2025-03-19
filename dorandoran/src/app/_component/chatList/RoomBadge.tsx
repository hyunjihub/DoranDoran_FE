'use client';

export default function RoomBadge({ type }: { type: string }) {
  return (
    <>
      {type === 'hot' ? (
        <div className="absolute top-[8px] left-[8px] flex items-center justify-center rounded-lg w-[40px] h-[20px] text-white bg-[#7B3796] text-xs">
          인기
        </div>
      ) : type === 'new' ? (
        <div className="absolute top-[8px] left-[8px] flex items-center justify-center rounded-lg w-[40px] h-[20px] text-white bg-[#FC84A7] text-xs">
          NEW
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
