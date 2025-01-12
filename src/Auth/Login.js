import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setError } from "../store/authSlice";

const Login = ({ onSwitch, onForgot }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(setError(null));

    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/browse-items");
    } catch (err) {
      console.error("Login failed:", err);
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
        disabled={loading}
        className={`w-full px-6 py-3 text-sm text-white ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } rounded-md focus:outline-none`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <div className="mt-4 text-sm">
        <button onClick={onForgot} className="text-blue-500 hover:underline">
          Forgot Password?
        </button>
      </div>
      <div className="mt-4 text-sm flex">
        <p className="mr-1 dark:text-gray-500">Don't have an account?</p>
        <button onClick={onSwitch} className="text-blue-500 hover:underline">
          Register
        </button>
      </div>
    </form>
  );
};

export default Login;
