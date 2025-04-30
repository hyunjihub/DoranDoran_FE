interface ReadOnlyInputTextProps {
  name: string;
  inputData: string;
}

export default function ReadOnlyInputText({ name, inputData }: ReadOnlyInputTextProps) {
  return (
    <div className="flex justify-between px-[16px] py-[18px]">
      <p className="font-bold">{name}</p>
      <div className="flex items-center gap-5">
        <p className="max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">{inputData}</p>
      </div>
    </div>
  );
}
