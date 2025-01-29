import React, { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import { useNavigate, useParams } from "react-router-dom";

const OrganizationEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState({
    name: "",
    contactPerson: "",
    email: "",
    city: "",
    country: "",
    qualifications: "",
    streetName: "",
    number: "",
    zipCode: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        const response = await apiClient.get(`/api/v1/organizations/${id}`);
        setOrganization(response.data);
      } catch (err) {
        setError("Error fetching organization details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizationDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrganization((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(`/api/v1/organizations/${id}`, organization);
      navigate(`/organization/${id}`);
    } catch (err) {
      alert("Error updating organization");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Edit Organization
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6"
      >
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Organization Name
          </label>
          <input
            type="text"
            name="name"
            value={organization.name}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Organization Email
          </label>
          <input
            type="text"
            name="email"
            value={organization.email}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Contact Person
          </label>
          <input
            type="text"
            name="contactPerson"
            value={organization.contactPerson}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-gray-600 my-2">Address:</h1>
          <label
            id="streetName"
            className="block text-sm font-semibold text-gray-700"
          >
            Street Name
          </label>
          <input
            type="text"
            name="streetName"
            value={organization.streetName}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            id="number"
            className="block text-sm font-semibold text-gray-700"
          >
            Street Name
          </label>
          <input
            type="text"
            name="number"
            value={organization.number}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default OrganizationEdit;
