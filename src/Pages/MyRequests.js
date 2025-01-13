import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await apiClient.get("/api/v1/requests/my-requests"); // Fetch user-specific requests
        setRequests(response.data); // Update state with the fetched requests
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Requests</h1>
      {requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((request) => (
            <div
              key={request.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-lg"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {request.seizedGood?.name || "Unknown Good"}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{request.purpose}</p>
              <p className="text-sm mt-2">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded-lg ${
                    request.status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : request.status === "REJECTED"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {request.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You have no requests yet.</p>
      )}
    </div>
  );
};

export default MyRequests;

