'use client';

import { removeDeviceToken } from './useRemoveDeviceToken';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { userStore } from '@/store/useUserStore';
import { websocketStore } from '@/store/useWebsocketStore';

export default function useLogout({ type }: { type: 'logout' | 'session' }): () => void {
  const logout = userStore((state) => state.logout);
  const disconnect = websocketStore((state) => state.disconnect);
  const router = useRouter();

  const executeLogout = useCallback(() => {
    removeDeviceToken();
    disconnect();
    logout();
    localStorage.removeItem('doran-rememberMe');
    alert(`${type === 'logout' ? '로그아웃 되었습니다.' : '세션이 만료되어 로그아웃 되었습니다.'}`);
    setTimeout(() => {
      router.push('/');
    }, 0);
  }, [logout, router, disconnect, type]);

  return executeLogout;
}
