'use client';

import { ChangeEvent, KeyboardEvent, useState } from 'react';

import Image from 'next/image';
import ImageSend from './ImageSend';
import send from '/public/img/icon/send.svg';
import { websocketStore } from '@/store/useWebsocketStore';

export default function MessageInput() {
  const sendMessage = websocketStore((state) => state.sendMessage);
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (message.trim() !== '') {
        sendMessage(message, 'text');
        setMessage('');
      }
    }
  };

  const handleSendMessage = () => {
    sendMessage(message, 'text');
    setMessage('');
  };

  return (
    <div className="absolute bottom-0 left-0 w-full border-t border-[#EAEAEA] px-[16px] py-[12px] bg-white">
      <div className="flex items-center justify-between">
        <textarea
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
          className="w-full h-full outline-none resize-none scrollbar-hide"
        />
        <ImageSend />
        <button className="ml-2" onClick={handleSendMessage}>
          <Image src={send} alt="메시지 전송" width={40} height={40} />
        </button>
      </div>
    </div>
  );
}
