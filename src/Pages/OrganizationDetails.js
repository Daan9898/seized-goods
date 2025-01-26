import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import apiClient from "../services/apiClient";
import { useNavigate, useParams } from "react-router-dom";

const OrganizationDetails = () => {
  const { id } = useParams(); // Get the organization ID from the URL
  const navigate = useNavigate();
  const [organization, setOrganization] = useState(null);
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

  const handleEdit = () => {
    navigate(`/organization/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this organization?")) {
      try {
        await apiClient.delete(`/api/v1/organizations/${id}`);
        alert("Organization deleted successfully!");
        navigate("/organizations");
      } catch (err) {
        alert("Error deleting organization");
      }
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
        {organization.name} Details
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-semibold text-gray-800">
            {organization.name}
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleEdit}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 flex items-center gap-2"
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          <strong>Contact Person:</strong> {organization.contactPerson}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Email:</strong> {organization.email}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
            {organization.city}, {organization.country}
          </span>
          <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
            {organization.qualifications}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Address:</strong> {organization.streetName}{" "}
          {organization.number}, {organization.zipCode}
        </p>
      </div>
    </div>
  );
};

export default OrganizationDetails;
