export default function getCurrentTimeWith30Min(): string {
  const now = new Date();
  now.setHours(now.getHours() + 9);

  const month = now.getUTCMonth() + 1;
  const date = now.getUTCDate();
  const hours = now.getUTCHours();
  let minutes = now.getUTCMinutes();

  if (minutes >= 30) {
    minutes = 30;
  } else {
    minutes = 0;
  }

  return `${month.toString().padStart(2, '0')}.${date.toString().padStart(2, '0')} ${hours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
