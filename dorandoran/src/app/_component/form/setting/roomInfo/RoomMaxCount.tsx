import { IRoomInfo } from '@/app/_util/types/types';
import MaxCountInput from '../MaxCountInput';

export default function RoomMaxCount({ info }: { info: IRoomInfo }) {
  return (
    <div className="w-full border-b">
      {info.isManager ? (
        <MaxCountInput isManager={info.isManager} />
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
