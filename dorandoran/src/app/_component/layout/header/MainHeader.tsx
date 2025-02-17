import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/img/logo.png';

export default function MainHeader() {
  return (
    <div className="w-full flex items-center justify-center px-[16px] py-[12px]">
      <h1>
        <Link href={'/'}>
          <Image src={logo} alt="logo" width={100} height={30} />
        </Link>
      </h1>
    </div>
  );
}
