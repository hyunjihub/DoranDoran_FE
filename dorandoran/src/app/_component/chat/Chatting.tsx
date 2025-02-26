import Date from './Date';
import MyMessage from './MyMessage';
import OtherMessage from './OtherMessage';
import SystemMessage from './SystemMessage';
import getChatDate from '@/app/_util/getChatDate';
import getChatTime from '@/app/_util/getChatTime';
import { useMemo } from 'react';

export default function Chatting() {
  const messages = [
    { id: 1, sender: 'me', content: '안녕하세요!', timestamp: '2025-02-25 12:00:00' },
    { id: 2, sender: 'other', content: '안녕하세요! 어떻게 도와드릴까요?', timestamp: '2025-02-25 12:01:00' },
    { id: 3, sender: 'me', content: '채팅방 UI 구현 중이에요.', timestamp: '2025-02-25 12:02:00' },
    { id: 4, sender: 'system', content: '도란2님이 퇴장하셨습니다.', timestamp: '2025-02-25 12:02:00' },
  ];

  const processedMessages = useMemo(() => {
    return messages.map((message, index, arr) => {
      const isDateChanged = index === 0 || getChatDate(message.timestamp) !== getChatDate(arr[index - 1].timestamp);

      const isLastInGroup =
        index === arr.length - 1 ||
        message.timestamp !== arr[index + 1].timestamp ||
        message.sender !== arr[index + 1].sender;

      return { ...message, isDateChanged, isLastInGroup };
    });
  }, [messages]);

  return (
    <div className="w-full">
      {processedMessages.map((message) => (
        <div className="w-full flex flex-col items-center" key={message.id}>
          {message.isDateChanged && <Date timestamp={message.timestamp} />}
          {message.sender === 'me' ? (
            <MyMessage
              message={message.content}
              timestamp={message.isLastInGroup ? getChatTime(message.timestamp) : null}
            />
          ) : message.sender === 'other' ? (
            <OtherMessage
              message={message.content}
              timestamp={message.isLastInGroup ? getChatTime(message.timestamp) : null}
            />
          ) : (
            <SystemMessage />
          )}
        </div>
      ))}
    </div>
  );
}
