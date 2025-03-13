'use client';

import Toggle from '../../ui/Toggle';

export default function PushNotificationInput({ isNotification }: { isNotification: boolean }) {
  return (
    <div className="flex justify-between px-[16px] py-[18px]">
      <p className="font-bold">푸시 알림</p>

      <Toggle isActive={isNotification} />
    </div>
  );
}
