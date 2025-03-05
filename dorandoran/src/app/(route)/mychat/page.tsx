import ChatListItem from '@/app/_component/chat/ChatListItem';
import CreateButton from '@/app/_component/chat/CreateButton';
import ProtectedRoute from '@/app/_component/ProtectedRoute';

export default function MyChat() {
  return (
    <ProtectedRoute>
      <div className="h-full flex flex-col">
        <ul>
          <ChatListItem />
          <ChatListItem />
        </ul>
        <CreateButton />
      </div>
    </ProtectedRoute>
  );
}
