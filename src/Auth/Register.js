import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const Register = ({ onRegister, onSwitch }) => {
  const [accountType, setAccountType] = useState("organization");
  const [selectedCategoryId, setSelectedCategoryId] = useState([]);
  const [organizationName, setOrganizationName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [categories, setCategories] = useState([]); // e.g., [1,2]
  const [streetName, setStreetName] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Netherlands");
  const [zipCode, setZipCode] = useState("");
  const [qualifications, setQualifications] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  // Fetch all categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/api/v1/categories");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch categories.");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const accountData = {
      name: organizationName,
      firstName,
      lastName,
      email,
      contactPerson,
      phone,
      categories: selectedCategoryId,
      streetName,
      number,
      city,
      country,
      zipCode,
      qualifications,
      password,
      accountType,
    };

    onRegister(accountData);
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

          <div className="col-span-1">
            <label className="block mb-2 text-sm text-gray-600">
              Contact Person Name
            </label>
            <input
              type="text"
              placeholder="Contact Person"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="block w-full px-5 py-3 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-sm text-gray-600">Phone</label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block w-full px-5 py-3 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-sm text-gray-600">
              Qualifications
            </label>
            <input
              type="text"
              placeholder="Qualifications"
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
              className="block w-full px-5 py-3 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Address Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm text-gray-600">
            Street Name
          </label>
          <input
            type="text"
            placeholder="Street Name"
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
            className="block w-full px-5 py-3 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-600">Number</label>
          <input
            type="text"
            placeholder="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="block w-full px-5 py-3 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-600">City</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="block w-full px-5 py-3 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-600">Country</label>
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="block w-full px-5 py-3 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-600">Zip Code</label>
          <input
            type="text"
            placeholder="Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="block w-full px-5 py-3 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Category select input */}
      <div>
        <label className="block mb-2 text-sm text-gray-600">
          Select Interested Categories
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                value={category.id}
                checked={selectedCategoryId?.includes(category.id)}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setSelectedCategoryId((prev) =>
                    e.target.checked
                      ? [...(prev || []), value]
                      : prev.filter((id) => id !== value)
                  );
                }}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-500"
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-2 text-sm text-gray-600"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>
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
          <label className="block mb-2 text-sm text-gray-600">
            Email Address
          </label>
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
        <div>
          <label className="block mb-2 text-sm text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        <p className="mr-1 dark:text-gray-500">Already have an account?</p>
        <button onClick={onSwitch} className="text-blue-500 hover:underline">
          Login
        </button>
      </div>
    </form>
  );
};

export default Register;
