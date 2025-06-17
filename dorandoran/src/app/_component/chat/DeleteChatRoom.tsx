import useDeleteRoom from '@/app/_util/hooks/useDeleteRoom';

export default function DeleteChatRoom({ isManager }: { isManager: boolean }) {
  const mutation = useDeleteRoom(isManager);

  return (
    <>
      <button
        className="mt-10 w-[200px] text-white font-bold bg-[#7B3796] rounded-lg py-[12px]"
        onClick={() => mutation.mutate()}
      >
        채팅방 {isManager ? '폐쇄' : '나가기'}
      </button>
      {isManager && (
        <p className="mt-2 text-xs text-gray-400">
          ※ 채팅방 폐쇄 시 남아있는 참여자 모두 채팅 메시지 전송이 제한 됩니다.
          <br />※ 폐쇄한 채팅방은 다시 복구가 불가능합니다.
        </p>
      )}
    </>
  );
}
