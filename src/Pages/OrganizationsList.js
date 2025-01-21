import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const OrganizationsList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await apiClient.get("/api/v1/organizations");
        setOrganizations(response.data);
      } catch (err) {
        setError("Error fetching organizations");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

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
        Social Organizations
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {organizations.map((organization) => (
          <div
            key={organization.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform duration-300"
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {organization.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                {organization.contactPerson}
              </p>
              <p className="text-sm text-gray-600 mb-4">{organization.email}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                  {organization.city}, {organization.country}
                </span>
                <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                  {organization.qualifications}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Address: {organization.streetName} {organization.number},{" "}
                {organization.zipCode}
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-100 flex justify-between items-center">
              <a
                href={`/organization/${organization.id}`}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationsList;
