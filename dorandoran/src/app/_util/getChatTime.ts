export default function getChatTime(timestamp: string): string {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const period = hours < 12 ? '오전' : '오후';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  return `${period} ${formattedHours}:${minutes}`;
}
