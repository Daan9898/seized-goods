import React, { useState } from "react";

const Register = ({ onRegister, onSwitch }) => {
  const [accountType, setAccountType] = useState("organization");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organizationName, setOrganizationName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      email,
      password,
      firstName,
      lastName,
      organizationName,
      accountType,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
      {/* Account Type Selector */}
      <div className="flex justify-center gap-4">
        <button
          type="button"
          className={`px-6 py-2 rounded-md ${
            accountType === "organization"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setAccountType("organization")}
        >
          Register as Company
        </button>
        <button
          type="button"
          className={`px-6 py-2 rounded-md ${
            accountType === "individual"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setAccountType("individual")}
        >
          Register as Individual
        </button>
      </div>

      {accountType === "organization" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Organization Name */}
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2 text-sm text-gray-600">
              Organization Name
            </label>
            <input
              type="text"
              placeholder="Organization Name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="block w-full px-5 py-3 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Organization Registration Number */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm text-gray-600">
              Organization Registration Number
            </label>
            <input
              type="text"
              placeholder="Registration Number"
              className="block w-full px-5 py-3 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Proof of Eligibility */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm text-gray-600">
              Proof of Eligibility
            </label>
            <input
              type="file"
              className="block w-full px-5 py-3 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Common Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm text-gray-600">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="block w-full px-5 py-3 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-600">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="block w-full px-5 py-3 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-600">Email Address</label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-5 py-3 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-5 py-3 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-6 py-3 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Register
      </button>
      <div className="mt-4 text-sm flex justify-center">
        <p className="mr-1">Already have an account?</p>
        <button onClick={onSwitch} className="text-blue-500 hover:underline">
          Login
        </button>
      </div>
    </form>
  );
};

export default Register;
