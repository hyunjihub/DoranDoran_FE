import Link from 'next/link';

export default function TextMessage({ message }: { message: string }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = message.split(urlRegex);

  return (
    <p className="whitespace-pre-wrap">
      {parts.map((part, index) =>
        urlRegex.test(part) ? (
          <Link key={index} href={part} target="_blank" rel="noopener noreferrer" className="underline text-blue-200">
            {part}
          </Link>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </p>
  );
}
