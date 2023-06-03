"use client";
const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="p-4">
      <div className="text-lg font-medium mb-4 dark:text-slate-200">{message}</div>
      <div className="flex justify-end">
        <button
          className="mr-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
          onClick={onConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
