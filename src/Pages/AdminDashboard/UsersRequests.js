import React, { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await apiClient.get("/api/v1/requests");
        console.log("response data request:", response.data);
        setRequests(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <div className="text-center py-6">Loading requests...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">Error: {error}</div>;
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
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  {request.seizedGood.name || "Unnamed Request"}
                </h3>
                <span className="text-gray-500 text-sm">
                  {new Date(request?.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600 mt-2">
                {request.seizedGood.description}
              </p>
              <div className="text-sm text-gray-500 mt-2">
                <span>
                  Requested by: {request.organization?.name || "Anonymous"}
                </span>
                <p className="text-gray-600 mt-2">
                  Contact:{" "}
                  {request.organization?.contactPerson || "Not available"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserRequests;
