'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IRoomInfo } from '@/app/_util/types/types';
import Image from 'next/image';
import ImageInput from '@/app/_component/form/setting/ImageInput';
import axios from 'axios';
import useLogout from '@/app/_util/hooks/useLogout';
import { useParams } from 'next/navigation';
import { useRequestWithAuthRetry } from '@/app/_util/hooks/useRequestWithAuthRetry';

export default function RoomImage({ info }: { info: IRoomInfo }) {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const executeLogout = useLogout({ type: 'session' });
  const requestWithRetry = useRequestWithAuthRetry();

  const mutation = useMutation({
    mutationFn: async (profileImage: string) => {
      try {
        await axios.patch('/api/chat/info/image', { chatRoomId: id, chatRoomImage: profileImage });
        return profileImage;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === 'accessToken 만료') {
            await requestWithRetry('patch', '/api/chat/info/image', { chatRoomId: id, chatRoomImage: profileImage });
            return profileImage;
          } else if (status === 401 && message === 'refreshToken 만료') {
            executeLogout();
            throw new Error('로그아웃 되었습니다. 다시 로그인 해주세요.');
          } else {
            alert(error.response?.data || error.message);
          }
          throw error;
        } else {
          throw error;
        }
      }
    },
    onSuccess: (profileImage) => {
      queryClient.setQueryData<IRoomInfo>(['room', id], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          chatRoomImage: profileImage,
        };
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full border-b border-t">
      {info.isManager ? (
        <ImageInput image={info.chatRoomImage} onChange={(profileImage) => mutation.mutate(profileImage)} />
      ) : (
        <div className="w-full h-[200px] bg-gray-200 flex justify-center items-center">
          <div className="relative w-[140px] h-[140px] rounded-full border">
            <Image className="object-cover rounded-full" src={info.chatRoomImage} alt="채팅방 이미지" fill />
          </div>
        </div>
      )}
    </div>
  );
}
