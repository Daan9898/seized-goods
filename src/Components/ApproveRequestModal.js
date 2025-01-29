import React from "react";
import apiClient from "../services/apiClient";

const ApproveRequestModal = ({
  requestToApprove,
  closeApproveModal,
  onApproveSuccess,
}) => {
  const handleApprove = async () => {
    try {
      const response = await apiClient.patch(
        `/api/v1/requests/${requestToApprove.id}/approve`
      );

      // Notify the parent component that the request was approved successfully
      onApproveSuccess(response.data.request);

      closeApproveModal();
    } catch (error) {
      console.error("Failed to approve request:", error);
      alert("Failed to approve request. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold text-gray-800">Confirm Approval</h2>
        <p className="text-gray-600 mt-2">
          Are you sure you want to approve the request for{" "}
          <span className="font-semibold">
            {requestToApprove.seizedGood.name || "Unnamed Request"}
          </span>
          ?
        </p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={closeApproveModal}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleApprove}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveRequestModal;
