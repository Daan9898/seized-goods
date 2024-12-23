import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

const Login = ({ onSwitch, onForgot }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await apiClient.post(
        "/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );
      navigate("/browse-items");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Login
      </button>
      <div className="mt-4 text-sm">
        <button onClick={onForgot} className="text-blue-500 hover:underline">
          Forgot Password?
        </button>
      </div>
      <div className="mt-4 text-sm flex">
        <p className="mr-1">Don't have an account?</p>
        <button onClick={onSwitch} className="text-blue-500 hover:underline">
          Register
        </button>
      </div>
    </form>
  );
};

export default Login;
