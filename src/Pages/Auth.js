import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ForgotPassword from "../Auth/ForgotPassword";
import apiClient from "../services/apiClient";

const Auth = ({ onLogin }) => {
  const [view, setView] = useState("login"); // "login", "register", or "forgot"
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    onLogin(email, password);
    navigate("/browse-items");
  };

  const handleRegister = async (accountData) => {
    try {
      const response = await apiClient.post(
        "/api/v1/organizations/register",
        accountData
      );
      console.log("Registration successful:", response.data);
      alert("Registration successful! Please log in.");
      setView("login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex flex-col lg:flex-row justify-center min-h-screen">
        <div
          className="hidden lg:block lg:w-2/5 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')",
          }}
        ></div>

        <div className="flex flex-col items-center w-full px-6 py-8 md:px-12 lg:px-16 lg:w-3/5">
          <div className="w-full text-center">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {view === "login"
                ? "Login"
                : view === "register"
                ? "Register"
                : "Forgot Password"}
            </h1>

            <p className="mt-4 text-gray-600">
              {view === "login"
                ? "Welcome back! Please log in to your account."
                : view === "register"
                ? "Create a new account to get started."
                : "Recover your password."}
            </p>
          </div>

          <div className="mt-6 w-full">
            {view === "login" && (
              <Login
                onLogin={handleLogin}
                onSwitch={() => setView("register")}
                onForgot={() => setView("forgot")}
              />
            )}
            {view === "register" && (
              <Register
                onRegister={handleRegister}
                onSwitch={() => setView("login")}
              />
            )}
            {view === "forgot" && (
              <ForgotPassword onSwitch={() => setView("login")} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
