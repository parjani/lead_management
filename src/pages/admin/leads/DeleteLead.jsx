import { FiAlertTriangle, FiX } from "react-icons/fi";

function DeleteLeadModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
  leadName,
}) {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-red-100 p-3">
              <FiAlertTriangle
                className="text-red-600"
                size={24}
              />
            </div>

            <h2 className="text-xl font-semibold">
              Delete Lead
            </h2>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <FiX size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="px-6 py-6">

          <p className="text-gray-600 leading-7">

            Are you sure you want to delete

            <span className="font-semibold text-gray-900">
              {" "}
              {leadName}
            </span>

            ?

          </p>

          <p className="mt-3 text-sm text-red-500">
            This action cannot be undone.
          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 px-6 py-4">

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border px-5 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteLeadModal;