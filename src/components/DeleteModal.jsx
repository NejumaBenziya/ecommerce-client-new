import React from "react";

/**
 * DeleteModal Component
 * 
 * Props:
 * - isOpen → controls modal visibility
 * - onClose → function to close modal
 * - onConfirm → function to confirm delete action
 * - itemName → name of item to display in message
 */
const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {

  // If modal is not open → render nothing
  if (!isOpen) return null;

  return (
    // Background overlay (dark transparent layer)
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

      {/* Modal box */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">

        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-4">
          Confirm Delete
        </h2>

        {/* Message */}
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to delete ?{" "}
          
          {/* Highlight item name */}
          <span className="font-semibold">
            {itemName}
          </span>?  
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">

          {/* Cancel button → closes modal */}
          <button
            onClick={onClose}
            className="btn btn-outline btn-sm"
          >
            Cancel
          </button>

          {/* Delete button → triggers delete action */}
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