'use client';

import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { userStore } from '@/store/useUserStore';

export default function Logout() {
  const logout = userStore((state) => state.logout);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.post(
        '/api/member/logout',
        {},
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      logout();
      localStorage.removeItem('doran-rememberMe');
      router.push('/');
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <button
      className="mt-10 w-[200px] text-white font-bold bg-[#7B3796] rounded-lg py-[12px]"
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
    >
      로그아웃
    </button>
  );
}
