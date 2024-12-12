import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";

const BrowseItems = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Define categories array
  const categories = ["Electronics", "Furniture", "Toys", "Clothing"];

  useEffect(() => {
    // Mock data for items
    const mockItems = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      photo: "https://via.placeholder.com/150",
      description: `Description for Item ${i + 1}`,
      condition: i % 2 === 0 ? "New" : "Used",
      value: `$${(i + 1) * 10}`,
      category: categories[i % categories.length], // Assign categories cyclically
    }));
    setItems(mockItems);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="py-6 flex justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Browse Items</h1>
          <p className="text-lg font-medium">Find the perfect item for your organization</p>
        </div>
      </header>

      {/* Search Bar */}
        <main>
        <div className="max-w-6xl mx-auto">
            <form className="rounded-lg bg-white px-10 py-4 shadow-lg">
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
                    category === cat ? "bg-blue-500 text-white" : "dark:hover:bg-gray-800"
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


      {/* Product Grid */}
      <div className="p-6">
        <div className="grid max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items
            .filter(
              (item) =>
                (!search || item.name.toLowerCase().includes(search.toLowerCase())) &&
                (!category || item.category === category)
            )
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseItems;
