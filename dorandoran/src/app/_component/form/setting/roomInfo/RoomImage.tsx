'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IRoomInfo } from '@/app/_util/types/types';
import Image from 'next/image';
import ImageInput from '@/app/_component/form/setting/ImageInput';
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function RoomImage({ info }: { info: IRoomInfo }) {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (profileImage: string) => {
      await axios.patch('/api/chat/info/image', { chatRoomId: id, chatRoomImage: profileImage });
      return profileImage;
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
