import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../services/apiClient";

function EditItemForm() {
  const { itemId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await apiClient.get(`/api/v1/seized-goods/${itemId}`);
        const item = response.data;
        setName(item.name);
        setDescription(item.description);
        setValue(item.value);
        setQuantity(item.quantity);
        setSelectedCategory(item.categoryId);
        setCondition(item.condition);
      } catch (error) {
        console.error("Error fetching item:", error);
        setError("Failed to fetch item data.");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/api/v1/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories.");
      }
    };

    fetchItem();
    fetchCategories();
  }, [itemId]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("Authorization token is missing.");
      return;
    }

    if (!selectedCategory) {
      setError("Please select a category.");
      return;
    }
    if (!name.trim() || !description.trim() || !value) {
      setError("All fields are required.");
      return;
    }
    if (isNaN(value) || value <= 0) {
      setError("Value must be a positive number.");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("value", parseFloat(value).toFixed(2));
    formData.append("quantity", parseInt(quantity, 10).toString());
    formData.append("categoryId", parseInt(selectedCategory, 10).toString());
    formData.append("condition", condition);

    for (let file of files) {
      formData.append("files", file);
    }

    try {
      await apiClient.put(`/api/v1/seized-goods/${itemId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/browse-items");
    } catch (error) {
      console.error("Error updating item:", error);
      if (error.response) {
        console.error("Server response data:", error.response.data); // Log detailed error
        setError(error.response.data.message || "Failed to update the item.");
      } else {
        setError("Failed to update the item. Please try again.");
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center p-4">
      <div className="max-w-xlg w-full max-w-[800px] bg-white shadow-lg rounded-lg p-6 border">
        <h2 className="text-3xl font-bold text-gray-700 mb-8">Edit Item</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter good's name"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter description"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="condition"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Condition
            </label>
            <select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Select Condition --</option>
              <option value="NEW">New</option>
              <option value="USED">Used</option>
              <option value="REFURBISHED">Refurbished</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="value"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Value
            </label>
            <input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter value (e.g., 59.99)"
            />
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter quantity"
            />
          </div>

          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Upload Images
            </label>
            <input
              id="images"
              type="file"
              name="files"
              onChange={handleFileChange}
              multiple
              accept="image/*"
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Update Good
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditItemForm;
