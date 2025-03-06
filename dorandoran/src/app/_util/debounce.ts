export default function debounce<T extends (...args: unknown[]) => Promise<void>>(callback: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      void callback(...args);
    }, delay);
  };
}
