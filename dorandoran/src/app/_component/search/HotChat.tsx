import RoomItem from '@/app/_component/chatList/RoomItem';
import chatroomSample from '@/app/_util/json/chatroom.json';

export default function HotChat() {
  return (
    <section className="mt-[60px]">
      <h2 className="text-lg font-bold">현재 가장 HOT한 채팅 🔥</h2>
      <ul className="mt-4 grid grid-cols-2 gap-4">
        {chatroomSample.room.slice(0, 4).map((room, key) => {
          return <RoomItem room={room} key={key} />;
        })}
      </ul>
    </section>
  );
}
