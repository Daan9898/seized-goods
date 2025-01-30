import { useState } from "react";
import apiClient from "../services/apiClient";

const ForgotPassword = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter an email");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await apiClient.post(
        "/api/v1/users/reset-password/request",
        { email }
      );
      setMessage("Password reset email sent.");
      console.log(response.data);
    } catch (error) {
      setError("Failed to request password reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
      <div>
        <label className="block mb-2 text-sm text-gray-600">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-500 text-white rounded-md"
      >
        {loading ? "Requesting..." : "Reset Password"}
      </button>
      <div className="mt-4 text-sm">
        <button
          type="button"
          onClick={onSwitch}
          className="text-blue-500 hover:underline"
        >
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
