'use client';

interface NumberSelectProps {
  count: number;
  setCount: (count: number) => void;
}

export default function NumberSelect({ count, setCount }: NumberSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(Number(e.target.value));
  };

  return (
    <select className="border rounded px-3 py-1 text-sm" value={count} onChange={handleChange}>
      {[...Array(99)].map((_, i) => {
        const val = i + 2;
        return (
          <option key={val} value={val}>
            {val}명
          </option>
        );
      })}
    </select>
  );
}
