import RoomItem from '../chatList/RoomItem';
import chatroomSample from '@/app/_util/json/chatroom.json';

export default function NewChat() {
  return (
    <section className="mt-[32px]">
      <div className="px-[24px]">
        <h2 className="text-xl font-bold">방금 생성된 따끈따끈 채팅 ️💬</h2>
        <p className="text-xs text-gray-500">여러분들을 기다리고 있어요 ~ </p>
        <ul className="mt-4 grid grid-cols-2 gap-4">
          {chatroomSample.room.slice(0, 4).map((room, key) => {
            return <RoomItem room={room} key={key} />;
          })}
        </ul>
      </div>
    </section>
  );
}
