import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../services/apiClient";

const RequestSubmission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    seizedGoodId: product?.id || "", 
    purpose: "",
    quantity: 1,
    impactEstimate: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = name === "quantity" ? parseInt(value, 10) : value;

    if (name === "quantity" && product?.availableQuantity != null) {
      // Validate quantity against availableQuantity
      if (numericValue > product.availableQuantity) {
        setError(`Requested quantity exceeds available stock (${product.availableQuantity}).`);
      } else {
        setError("");
      }
    }

    setFormData((prev) => ({ ...prev, [name]: numericValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product?.availableQuantity == null) {
      setError("Product stock information is unavailable. Please try again later.");
      return;
    }

    if (formData.quantity > product.availableQuantity) {
      setError(`Requested quantity exceeds available stock (${product.availableQuantity}).`);
      return;
    }

    try {
      const response = await apiClient.post("/api/v1/requests", formData);

      navigate("/confirmation", {
        state: {
          product,
          requestDetails: formData,
          serverResponse: response.data,
        },
      });
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to submit request.";
      console.error("Error:", errorMsg);
    }
  };

  if (!product) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-red-500">
          No product selected for the request.
        </h1>
      </div>
    );
  }

  if (product?.availableQuantity == null) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-yellow-500">
          Product stock information is unavailable.
        </h1>
        <p className="text-gray-500">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Submit Your Request</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex mb-6">
          <img
            src={product.photo}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-lg mr-4"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-semibold">Value:</span> {product.value}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-semibold">Available Stock:</span> {product.availableQuantity}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="purpose" className="block text-gray-700 font-medium">
              Purpose to use these items
            </label>
            <textarea
              id="purpose"
              name="purpose"
              rows="3"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
              placeholder="Describe how you intend to use this item..."
              value={formData.purpose}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="impactEstimate" className="block text-gray-700 font-medium">
              Expected Social Impact
            </label>
            <textarea
              id="impactEstimate"
              name="impactEstimate"
              rows="3"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
              placeholder="Describe the social impact of this request..."
              value={formData.impactEstimate}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-gray-700 font-medium">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max={product.availableQuantity} // Add max to restrict input
              className={`mt-1 block w-full rounded-lg border ${
                error ? "border-red-500" : "border-gray-300"
              } p-2`}
              placeholder="Enter the number of items you need"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 ${
              error ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            } text-white font-bold rounded-lg`}
            disabled={!!error} // Disable button if there's an error
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestSubmission;

