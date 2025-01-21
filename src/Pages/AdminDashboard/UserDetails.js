import React, { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

const UserDetails = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await apiClient.get(`/api/v1/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <div>Loading user details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">User Details</h2>
      <div className="mt-4">
        <p>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(user.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
