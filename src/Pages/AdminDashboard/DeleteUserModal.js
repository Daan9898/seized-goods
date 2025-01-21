import React from "react";

const DeleteUserModal = ({ userToDelete, closeDeleteModal, handleDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold text-gray-800">Confirm Deletion</h2>
        <p className="text-gray-600 mt-2">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            {userToDelete.firstName} {userToDelete.lastName}
          </span>
          ?
        </p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={closeDeleteModal}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
