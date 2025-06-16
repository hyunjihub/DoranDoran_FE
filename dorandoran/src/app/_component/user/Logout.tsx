'use client';

import axios from 'axios';
import useLogout from '@/app/_util/hooks/useLogout';
import { useMutation } from '@tanstack/react-query';

export default function Logout() {
  const executeLogout = useLogout({ type: 'logout' });

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
      executeLogout();
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
