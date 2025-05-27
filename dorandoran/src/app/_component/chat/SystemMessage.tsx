import { IMessage } from '@/app/_util/types/types';

export default function SystemMessage({ message }: { message: IMessage }) {
  return <p className="text-xs text-gray-400 my-3">{message.content}</p>;
}
