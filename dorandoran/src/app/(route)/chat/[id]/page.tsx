import Chatting from '@/app/_component/chat/Chatting';
import TextInput from '@/app/_component/chat/TextInput';

export default function Chat() {
  return (
    <div className="h-full px-[16px] flex flex-col">
      <Chatting />
      <TextInput />
    </div>
  );
}
