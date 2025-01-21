import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import apiClient from "../services/apiClient";

const BrowseItems = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/api/v1/categories");
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          throw new Error("Invalid data format from API.");
        }
        setCategories(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const params = {
          ...(category && { categoryId: category }),
          ...(search && { searchTerm: search }),
        };

        const response = await apiClient.get("/api/v1/seized-goods", {
          params,
        });

        setItems(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch items.");
        setItems([]);
      }
    };

    fetchItems();
  }, [category, search]);

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
              onClick={() => setSearch(search)}
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
                onClick={() => setCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
            {category && (
              <button
                onClick={() => setCategory("")}
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
        <div className="grid max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.length === 0 ? (
            <p className="text-gray-700 text-lg">No products to display</p>
          ) : (
            items.map((item) => <ProductCard key={item.id} product={item} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseItems;
