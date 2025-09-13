import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-center mb-4">Confirm Delete</h2>
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{itemName}</span>?  
          
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="btn btn-outline btn-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-error btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
