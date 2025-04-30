import ProtectedRoute from '@/app/_component/ProtectedRoute';
import RoomInfo from '@/app/_component/form/setting/RoomInfo';

export default function Setting() {
  return (
    <ProtectedRoute>
      <div className="w-full h-full flex flex-col items-center">
        <RoomInfo />
      </div>
    </ProtectedRoute>
  );
}
