import Image from 'next/image';
import Link from 'next/link';
import arrow from '/public/img/icon/prevArrow.svg';

interface InputToLinkProps {
  name: string;
  inputData: string;
  placeHolder: string;
  link: string;
}

export default function InputToLink({ name, inputData = '', placeHolder, link }: InputToLinkProps) {
  return (
    <Link href={link} className="flex justify-between px-[16px] py-[18px]">
      <p className="font-bold">{name}</p>
      <div className="flex items-center gap-5">
        <p className="max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">
          {inputData ? inputData : placeHolder}
        </p>
        <Image className="rotate-180" src={arrow} alt={name} width={8} height={8} />
      </div>
    </Link>
  );
}
