import React, { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteUserModal from "./DeleteUserModal";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [setUserToEdit] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get("/api/v1/users");
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    try {
      if (userToDelete) {
        await apiClient.delete(`/api/v1/users/${userToDelete.id}`);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== userToDelete.id)
        );
        setUserToDelete(null);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
    // Placeholder for edit functionality
    console.log("Editing user:", user);
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setShowModal(false);
  };

  if (loading) {
    return <div className="text-center py-6">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Role: {user.role}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => openDeleteModal(user)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Delete Modal */}
      {showModal && userToDelete && (
        <DeleteUserModal
          userToDelete={userToDelete}
          closeDeleteModal={closeDeleteModal}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ManageUsers;
