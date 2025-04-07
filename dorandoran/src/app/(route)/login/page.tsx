import LoginComponent from '@/app/_component/user/login/LoginComponent';
import { Suspense } from 'react';

export default function Login() {
  return (
    <Suspense>
      <LoginComponent />
    </Suspense>
  );
}
