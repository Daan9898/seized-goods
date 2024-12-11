// ForgotPassword.js
import React, { useState } from "react";

const ForgotPassword = ({ onReset, onSwitch }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onReset(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-5 py-3 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Reset Password
      </button>
      <div className="mt-4 text-sm">
        <button onClick={onSwitch} className="text-blue-500 hover:underline">
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
