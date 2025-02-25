import ChatListItem from '@/app/_component/chat/ChatListItem';
import CreateButton from '@/app/_component/chat/CreateButton';

export default function MyChat() {
  return (
    <div className="h-full flex flex-col">
      <ul>
        <ChatListItem />
        <ChatListItem />
      </ul>
      <CreateButton />
    </div>
  );
}
