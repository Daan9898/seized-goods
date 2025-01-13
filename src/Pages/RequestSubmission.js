import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../services/apiClient";

const RequestSubmission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    seizedGoodId: product.id, 
    purpose: "",
    quantity: 1,
    impactEstimate: "",   
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Submitted Request:", formData);
    
     try {
      // Make the POST request using apiClient
      const response = await apiClient.post("api/v1/requests", formData);
       
      console.log("Response data on Request:", response.data);
      // Redirect to a confirmation page or My Requests page with the response data
      navigate("/confirmation", {
        state: {
          product,
          requestDetails: formData,
          serverResponse: response.data, // Include the server response
        },
      });
    } catch (error) {
      // Handle errors, show error message to the user
      console.error("Error making request:", error);
      alert("Failed to submit request. Please try again.");
    }

    // Redirect to a confirmation page or My Requests page
    navigate("/confirmation", {
      state: {
        product,
        requestDetails: formData,
      },
    });
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

             <div>
          <label htmlFor="quantity" className="block text-gray-700 font-medium">
            Quantity
          </label>
            <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
            placeholder="Enter the number of items you need"
            value={formData.quantity}
            onChange={handleInputChange}
            required
        />
  </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestSubmission;
