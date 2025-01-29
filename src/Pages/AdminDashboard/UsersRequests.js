import apiClient from "../../services/apiClient.js";
import React, { useState, useEffect } from "react";
import ApproveRequestModal from "../../Components/ApproveRequestModal";

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [requestToApprove, setRequestToApprove] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await apiClient.get("/api/v1/requests");
        setRequests(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const openApproveModal = (request) => {
    setRequestToApprove(request);
    setIsApproveModalOpen(true);
  };

  const closeApproveModal = () => {
    setIsApproveModalOpen(false);
    setRequestToApprove(null);
  };

  const handleApproveSuccess = (approvedRequest) => {
    // Update the requests list by replacing the approved request
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === approvedRequest.id ? approvedRequest : request
      )
    );
  };

  if (loading) {
    return <div className="text-center py-6">Loading requests...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        User Requests
      </h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">No requests found.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((request) => (
            <li
              key={request.id}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {request.seizedGood.name || "Unnamed Request"}
                  </h3>
                  <button
                    onClick={() => openApproveModal(request)}
                    className="justify-self-center bg-blue-600 text-white p-2 rounded-md"
                  >
                    Approve
                  </button>
                </div>
                <p className="text-gray-600 mt-2">
                  {request.seizedGood.description}
                </p>
                <div className="text-sm text-gray-500 mt-2">
                  <span>
                    Requested by: {request.organization?.name || "Anonymous"}
                  </span>
                  <div className="justify-between">
                    <p className="text-gray-600 mt-2">
                      Contact:{" "}
                      {request.organization?.contactPerson || "Not available"}
                    </p>
                    <span className="text-gray-500 text-sm">
                      {new Date(request?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Render the ApproveRequestModal */}
      {isApproveModalOpen && (
        <ApproveRequestModal
          requestToApprove={requestToApprove}
          closeApproveModal={closeApproveModal}
          onApproveSuccess={handleApproveSuccess}
        />
      )}
    </div>
  );
};

export default UserRequests;
