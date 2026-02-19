import Button from "../common/Button";

const ConfirmDeleteModal = ({ open, onClose, confirmDelete }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow w-80">
        <h3 className="text-lg font-semibold mb-2">
          Delete Student?
        </h3>

        <p className="text-gray-500 text-sm mb-4">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <Button
            className="bg-gray-300 text-black hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
