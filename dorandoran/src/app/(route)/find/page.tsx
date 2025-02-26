'use client';

import EmailFind from '@/app/_component/user/EmailFind.';
import FindHeader from '@/app/_component/user/FindHeader';
import PasswordFind from '@/app/_component/user/PasswordFind';
import { useState } from 'react';

export default function Find() {
  const [type, setType] = useState('email');

  return (
    <div className="h-full flex flex-col">
      <FindHeader type={type} setType={setType} />
      {type === 'email' ? <EmailFind /> : <PasswordFind />}
    </div>
  );
}
