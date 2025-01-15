import AddNewItemForm from "../../Components/AddNewItemForm";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <Link
        to="/create-item"
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Create New Item
      </Link>
      <AddNewItemForm />
    </div>
  );
};

export default AdminDashboard;
