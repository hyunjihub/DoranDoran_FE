'use client';

import { useEffect, useState } from 'react';

import { IRoomInfo } from '@/app/_util/types/types';
import MaxCountInput from '../MaxCountInput';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function RoomMaxCount({ info }: { info: IRoomInfo }) {
  const { id } = useParams();
  const [count, setCount] = useState(100);

  useEffect(() => {
    setCount(info.maxCount);
  }, [info.maxCount]);

  const mutation = useMutation({
    mutationFn: async (num: number) => {
      await axios.patch('/api/chat/info/count', { chatRoomId: id, maxCount: num });
    },
    onSuccess: (_data, num) => {
      setCount(num);
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <div className="w-full border-b">
      {info.isManager ? (
        <MaxCountInput isManager={info.isManager} count={count} setCount={(num) => mutation.mutate(num)} />
      ) : (
        <div className="flex justify-between items-center px-[16px] py-[18px]">
          <p className="font-bold">최대 참여자 수</p>

          <div className="flex items-center gap-5">
            <p>{info.maxCount}명</p>
          </div>
        </div>
      )}
    </div>
  );
}
