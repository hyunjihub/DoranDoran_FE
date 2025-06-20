import CreateButton from '@/app/_component/ui/CreateButton';
import MyChatList from '@/app/_component/chatList/MyChatList';
import ProtectedRoute from '@/app/_component/ProtectedRoute';

export default function MyChat() {
  return (
    <ProtectedRoute>
      <div className="h-full flex flex-col">
        <MyChatList />
        <CreateButton />
      </div>
    </ProtectedRoute>
  );
}
