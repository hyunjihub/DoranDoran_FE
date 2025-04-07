import AllChatList from '@/app/_component/chatList/AllChatList';
import CreateButton from '@/app/_component/chat/CreateButton';

export default function ChatList() {
  return (
    <div className="h-full px-[24px] pb-[86px] flex flex-col">
      <AllChatList />
      <CreateButton />
    </div>
  );
}
