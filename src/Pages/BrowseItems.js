import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import apiClient from "../services/apiClient";

const BrowseItems = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); // Current page
  const [limit] = useState(9); // Items per page
  const [totalItems, setTotalItems] = useState(0); // Total items in the database

  // Fetch all items to calculate totalItems
  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const response = await apiClient.get("/api/v1/seized-goods");
        setTotalItems(response.data.length); // Set total items
      } catch (err) {
        console.error(err);
        setError("Failed to fetch total items.");
      }
    };

    fetchAllItems();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/api/v1/categories");
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          throw new Error("Invalid data format from API.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  // Fetch paginated items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const params = {
          ...(category && { categoryId: category }),
          ...(search && { searchTerm: search }),
          page, // Add page to the request
          limit, // Add limit to the request
        };

        const response = await apiClient.get("/api/v1/seized-goods", {
          params,
        });

        setItems(response.data); // Set paginated items
      } catch (err) {
        console.error(err);
        setError("Failed to fetch items.");
        setItems([]);
      }
    };

    fetchItems();
  }, [category, search, page, limit]); // Add page and limit to the dependency array

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / limit);

  // Handle page navigation
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="min-h-screen px-4">
      <header className="py-6 flex justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Browse Items</h1>
          <p className="text-lg font-medium">
            Find the perfect item for your organization
          </p>
        </div>
      </header>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md max-w-6xl mx-auto mb-4">
          {error}
        </div>
      )}

      <main>
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              className="flex-grow w-full rounded-lg border border-gray-400 p-2"
              placeholder="Search ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setPage(1)} // Reset to page 1 when searching
              className="rounded-lg bg-orange-500 px-6 py-2 text-white hover:bg-orange-600"
            >
              Search
            </button>
          </div>

          {/* Categories */}
          <div className="mt-4 flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`px-4 py-2 text-gray-500 capitalize hover:bg-gray-100 rounded-lg ${
                  category === cat.id
                    ? "bg-orange-500 text-white"
                    : "dark:hover:bg-gray-800"
                }`}
                onClick={() => {
                  setCategory(cat.id);
                  setPage(1); // Reset to page 1 when changing category
                }}
              >
                {cat.name}
              </button>
            ))}
            {category && (
              <button
                onClick={() => {
                  setCategory("");
                  setPage(1); // Reset to page 1 when clearing filters
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Product Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.length === 0 ? (
            <p className="text-gray-700 text-lg">No products to display</p>
          ) : (
            items.map((item) => <ProductCard key={item.id} product={item} />)
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 my-6">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BrowseItems;
