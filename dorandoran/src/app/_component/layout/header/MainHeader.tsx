import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/img/logo.png';
import search from '/public/img/icon/search.svg';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';
import user from '/public/img/icon/user.svg';

export default function MainHeader() {
  const { userId } = useStore();
  const pathname = usePathname();

  return (
    <div className="relative w-full h-full flex items-center justify-center px-[16px] py-[12px]">
      <h1>
        <Link href={'/'}>
          <Image src={logo} alt="logo" width={100} height={30} />
        </Link>
      </h1>
      <div className="absolute right-[5%] flex gap-3">
        <Link href={'/search'}>
          <Image src={search} alt="검색" width={28} height={28} />
        </Link>
        <Link href={`${userId ? '/mypage' : `/login?redirect=${encodeURIComponent(pathname)}`}`}>
          <Image src={user} alt="마이페이지" width={28} height={28} />
        </Link>
      </div>
    </div>
  );
}
