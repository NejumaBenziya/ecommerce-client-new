/**
 * CancelModal Component
 * 
 * Reusable confirmation modal for cancelling actions (e.g., order cancel)
 * 
 * Props:
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Function to close modal
 * @param {function} onConfirm - Function to confirm cancellation
 * @param {string} itemName - Name of the item being cancelled
 */
import React from 'react'

const CancelModal = ({ isOpen, onClose, onConfirm, itemName }) => {

  // If modal is not open, render nothing
  if (!isOpen) return null;

  return (
    // Overlay (dark background)
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">

        {/* Modal Title */}
        <h2 className="text-xl font-bold text-center mb-4">
          Confirm Cancel
        </h2>

        {/* Confirmation Message */}
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to cancel{" "}
          
          {/* Highlight item name */}
          <span className="font-semibold">
            {itemName}
          </span>?  
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">

          {/* Close button (does not perform action) */}
          <button
            onClick={onClose}
            className="btn btn-outline btn-sm"
          >
            Close
          </button>

          {/* Confirm cancel action */}
          <button
            onClick={onConfirm}
            className="btn btn-error btn-sm"
          >
            Cancel
          </button>

        </div>
      </div>
    </div>
  )
}

export default CancelModal