export default function getChatDate(timestamp: string): string {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  };

  return date.toLocaleDateString('ko-KR', options).replace(',', '').trim();
}
