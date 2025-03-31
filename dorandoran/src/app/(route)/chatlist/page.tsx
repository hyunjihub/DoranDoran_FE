import CreateButton from '@/app/_component/chat/CreateButton';
import RoomItem from '@/app/_component/chatList/RoomItem';
import chatroomSample from '@/app/_util/json/chatroom.json';

export default function ChatList() {
  return (
    <div className="px-[24px] pb-[86px] flex flex-col">
      <ul className="mt-4 grid grid-cols-2 gap-4">
        {chatroomSample.room.map((room, key) => {
          return <RoomItem room={room} key={key} />;
        })}
      </ul>
      <CreateButton />
    </div>
  );
}
