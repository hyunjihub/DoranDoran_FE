import LoginComponent from '@/app/_component/user/LoginComponent';
import { Suspense } from 'react';

export default function Login() {
  return (
    <Suspense>
      <LoginComponent />
    </Suspense>
  );
}
