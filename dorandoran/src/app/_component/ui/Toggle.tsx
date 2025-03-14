export default function Toggle({ isActive, onToggle }: { isActive: boolean; onToggle: () => void }) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={isActive} onChange={onToggle} value="" className="sr-only peer" role="switch" />
      <div className="relative w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#7B3796] dark:peer-checked:bg-[#7B3796]"></div>
    </label>
  );
}
