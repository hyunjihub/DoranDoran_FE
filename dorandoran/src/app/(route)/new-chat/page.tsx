import CreateChatForm from '@/app/_component/chat/CreateChatForm';
import ProtectedRoute from '@/app/_component/ProtectedRoute';

export default function NewChat() {
  return (
    <ProtectedRoute>
      <CreateChatForm />
    </ProtectedRoute>
  );
}
