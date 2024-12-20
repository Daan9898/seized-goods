import React from "react";

const MyRequests = ({ requests }) => {
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
              <h2 className="text-lg font-semibold text-gray-800">{request.productName}</h2>
              <p className="text-sm text-gray-600 mt-2">{request.details}</p>
              <p className="text-sm mt-2">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded-lg ${
                    request.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : request.status === "Rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {request.status}
                </span>
              </p>
              {request.status === "Approved" && (
                <p className="text-sm text-gray-500 mt-2">
                  Pickup/Delivery Details: {request.instructions}
                </p>
              )}
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
