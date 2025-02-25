import HotChat from '@/app/_component/search/HotChat';
import HotKeyword from '@/app/_component/search/HotKeyword';

export default function Search() {
  return (
    <div className="h-full px-[16px] flex flex-col">
      <HotKeyword />
      <HotChat />
    </div>
  );
}
