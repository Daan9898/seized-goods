import Sidebar from "../../Components/Sidebar";

const ManageProducts = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex ml-32 p-4">
      <Sidebar />
      <button>Add new product</button>
      <button>Update product</button>
      <button>List all products</button>
      <button>Delete product</button>
    </div>
  );
};

export default ManageProducts;
