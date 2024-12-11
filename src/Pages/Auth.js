import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ForgotPassword from "../Auth/ForgotPassword";

const Auth = () => {
  const [view, setView] = useState("login"); // "login", "register", or "forgot"
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    console.log("Logging in with:", { email, password });
    navigate("/dashboard");
  };

  const handleRegister = (accountData) => {
    console.log("Registering with:", accountData);
    setView("login");
  };

  const handleForgotPassword = (email) => {
    console.log("Password reset for:", email);
    setView("login");
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex flex-col lg:flex-row justify-center min-h-screen">
        {/* Left Section - Background Image */}
        <div
          className="hidden lg:block lg:w-2/5 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')",
          }}
        ></div>

        {/* Right Section - Form */}
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
            {view === "login" && <Login onLogin={handleLogin} onSwitch={() => setView("register")} onForgot={() => setView("forgot")} />}
            {view === "register" && <Register onRegister={handleRegister} onSwitch={() => setView("login")} />}
            {view === "forgot" && <ForgotPassword onReset={handleForgotPassword} onSwitch={() => setView("login")} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;