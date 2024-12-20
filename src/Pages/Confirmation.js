import React from "react";
import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Request Submitted</h1>
      <p className="text-gray-600">
        Thank you for your request! We will review it and get back to you within 3-5 business days.
      </p>
      <div className="mt-6">
        <Link
          to="/my-requests"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          View My Requests
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
