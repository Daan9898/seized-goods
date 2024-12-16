import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";

const BrowseItems = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Define categories array
  const categories = ["Electronics", "Furniture", "Toys", "Clothing"];

  // Fetch items from API
  const fetchItems = async () => {
    setLoading(true);
    setError("");
    try {
      const queryParams = new URLSearchParams({
        ...(search && { searchTerm: search }),
        ...(category && { categoryId: categories.indexOf(category) + 1 }), // Map category name to ID
      });

      const response = await fetch(
        `http://localhost:3000/api/v1/seized-goods?${queryParams}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch items.");
      }

      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Run fetchItems on mount or when filters change
  useEffect(() => {
    fetchItems();
  }, [search, category]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="py-6 flex justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Browse Items</h1>
          <p className="text-lg font-medium">
            Find the perfect item for your organization
          </p>
        </div>
      </header>

      {/* Search Bar */}
      <main>
        <div className="max-w-6xl mx-auto">
          <form
            className="rounded-lg bg-white px-10 py-4 shadow-lg"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-4 flex items-center">
              <input
                type="text"
                className="w-full rounded-lg border border-gray-400 p-2"
                placeholder="Search ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="button"
                className="ml-2 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
                onClick={fetchItems}
              >
                Search
              </button>
            </div>
            {/* Categories */}
            <div className="mt-6 overflow-x-auto flex items-center gap-x-4 whitespace-nowrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-3 py-1.5 text-gray-500 capitalize hover:bg-gray-100 rounded-lg ${
                    category === cat
                      ? "bg-blue-500 text-white"
                      : "dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
              {category && (
                <button
                  onClick={() => setCategory("")}
                  className="px-3 py-1.5 bg-red-500 text-white rounded-lg"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </form>
        </div>
      </main>

      {/* Loading and Error States */}
      <div className="p-6">
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Product Grid */}
        <div className="grid max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!loading && items.length > 0
            ? items.map((item) => <ProductCard key={item.id} product={item} />)
            : !loading && <p className="text-center">No items found.</p>}
        </div>
      </div>
    </div>
  );
};

export default BrowseItems;
