'use client';

import ImageInput from '../form/setting/ImageInput';
import InputToLink from '../form/setting/InputToLink';
import MaxCountInput from '../form/setting/MaxCountInput';
import axios from 'axios';
import { createChatStore } from '@/store/useCreateChat';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { userStore } from '@/store/useUserStore';

export default function CreateChatForm() {
  const chatRoomImage = createChatStore((state) => state.chatRoomImage);
  const chatRoomTitle = createChatStore((state) => state.chatRoomTitle);
  const maxCount = createChatStore((state) => state.maxCount);
  const description = createChatStore((state) => state.description);
  const router = useRouter();
  const user = userStore((state) => state.user);
  const updateData = userStore((state) => state.updateData);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!chatRoomTitle) {
        alert('채팅방 이름을 설정해주세요.');
        return;
      }
      const response = await axios.post('/api/chat/chatrooms', {
        chatRoomImage,
        chatRoomTitle,
        maxCount,
        description,
      });
      return response.data;
    },
    onSuccess: (id) => {
      router.push(`/chat/${id}`);
    },
    onError: (error) => {
      alert(error);
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (profileImage: string) => {
      await axios.patch('/api/member/mypage/profile', { profileImage });
    },
    onSuccess: (_data, profileImage) => {
      updateData({ profileImage, nickname: user.nickname || '' });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full border-b border-t">
        <ImageInput
          image={chatRoomImage}
          type="chat"
          onChange={(profileImage) => uploadMutation.mutate(profileImage)}
        />
      </div>
      <div className="w-full border-b">
        <InputToLink
          name="채팅방 이름"
          placeHolder="채팅방 이름을 설정해주세요"
          inputData={chatRoomTitle as string}
          link="/new-chat/title"
        />
      </div>
      <div className="w-full border-b">
        <InputToLink
          name="채팅방 소개"
          placeHolder="채팅방 소개 문구를 작성해주세요"
          inputData={description as string}
          link="/new-chat/description"
        />
      </div>
      <div className="w-full border-b">
        <MaxCountInput isManager={true} />
      </div>
      <button
        className="mt-10 w-[200px] text-white font-bold bg-[#7B3796] rounded-lg py-[12px]"
        onClick={() => mutation.mutate()}
      >
        채팅방 생성
      </button>
    </div>
  );
}
