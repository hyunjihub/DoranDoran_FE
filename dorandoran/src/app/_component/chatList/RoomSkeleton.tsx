'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

export default function RoomSkeleton() {
  return (
    <li className="max-w-[180px]">
      <div className="relative w-[180px] h-[180px] rounded-lg">
        <Skeleton width={180} height={180} borderRadius={12} />

        <div className="absolute top-[8px] left-[8px]">
          <Skeleton width={40} height={20} borderRadius={4} />
        </div>
      </div>

      <div className="mt-2">
        <Skeleton width={160} height={16} />
      </div>

      <div className="mt-1 flex justify-between items-center">
        <Skeleton width={100} height={12} />
        <Skeleton width={40} height={14} />
      </div>
    </li>
  );
}
