import React, { useState } from "react";
import apiClient from "../services/apiClient";

const ResetPassword = ({ token, onResetSuccess }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await apiClient.post("/api/v1/users/reset-password", { token, newPassword });
      setMessage("Password reset successfully.");
      onResetSuccess(); // Navigate back to login
    } catch (err) {
      setError("Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
      <div>
        <label className="block mb-2 text-sm text-gray-600">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="block w-full px-4 py-2 border rounded-md"
        />
      </div>
      <button type="submit" disabled={loading} className="w-full py-2 bg-blue-500 text-white rounded-md">
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPassword;

