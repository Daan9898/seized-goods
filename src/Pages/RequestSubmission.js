import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RequestSubmission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    intendedUse: "",
    socialImpact: "",
    urgency: "Medium",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Request:", formData);

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
            <label htmlFor="intendedUse" className="block text-gray-700 font-medium">
              Intended Use
            </label>
            <textarea
              id="intendedUse"
              name="intendedUse"
              rows="3"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
              placeholder="Describe how you intend to use this item..."
              value={formData.intendedUse}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="socialImpact" className="block text-gray-700 font-medium">
              Expected Social Impact
            </label>
            <textarea
              id="socialImpact"
              name="socialImpact"
              rows="3"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
              placeholder="Describe the social impact of this request..."
              value={formData.socialImpact}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="urgency" className="block text-gray-700 font-medium">
              Urgency Level
            </label>
            <select
              id="urgency"
              name="urgency"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
              value={formData.urgency}
              onChange={handleInputChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
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
