import React, { useState } from "react";
import AddNewItemForm from "../../Components/AddNewItemForm";
// Icons
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import UserRequests from "./UsersRequests";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "addItem":
        return <AddNewItemForm />;
      case "editItem":
        return <div>Edit Item Form Placeholder</div>;
      case "deleteItem":
        return <div>Delete Item Confirmation Placeholder</div>;
      case "viewRequests":
        return <UserRequests />;
      case "viewUsers":
        return <div>View Users Placeholder</div>;
      default:
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome to the Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Select an action from the options above.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage products, users, and requests efficiently.
        </p>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product Management */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <MdOutlineInventory size={24} className="text-blue-500" />
            Product Management
          </h2>
          <p className="text-gray-600 mt-2">Add, edit, or delete products.</p>
          <div className="mt-4 space-y-3">
            <button
              onClick={() => setCurrentView("addItem")}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full"
            >
              <FaPlus />
              Add New Product
            </button>
            <button
              onClick={() => setCurrentView("editItem")}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md w-full"
            >
              <FaEdit />
              Edit Product
            </button>
            <button
              onClick={() => setCurrentView("deleteItem")}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-full"
            >
              <FaTrash />
              Delete Product
            </button>
          </div>
        </div>

        {/* User Requests */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaClipboardList size={24} className="text-green-500" />
            User Requests
          </h2>
          <p className="text-gray-600 mt-2">
            View requests made by users for products.
          </p>
          <button
            onClick={() => setCurrentView("viewRequests")}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mt-4 w-full"
          >
            View Requests
          </button>
        </div>

        {/* User Management */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaUsers size={24} className="text-purple-500" />
            User Management
          </h2>
          <p className="text-gray-600 mt-2">
            View and manage registered users.
          </p>
          <button
            onClick={() => setCurrentView("viewUsers")}
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md mt-4 w-full"
          >
            View Users
          </button>
        </div>
      </div>

      {/* Render Content */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
