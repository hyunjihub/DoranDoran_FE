'use client';

interface PromptModalProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  confirmText?: string;
  onConfirm?: () => void;
  isPending?: boolean;
}

export default function ConfirmModal({
  setIsActive,
  title,
  description,
  confirmText = '확인',
  onConfirm,
  isPending = false,
}: PromptModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="mb-2 text-xl font-bold text-center">{title}</h2>
        <p className="mb-2 text-center text-sm text-gray-500">{description}</p>
        <div className="mt-5 flex justify-end space-x-3 text-sm">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded" onClick={() => setIsActive(false)}>
            취소
          </button>
          <button className="px-4 py-2 bg-[#7B3796] text-white rounded" onClick={onConfirm} disabled={isPending}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
