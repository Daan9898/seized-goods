import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import mockProducts from "../data/mockProducts.json"; 


const BrowseItems = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Define categories array
  const categories = [...new Set(mockProducts.map((product) => product.category))]; // Get unique categories

  useEffect(() => {
    // Load items from JSON
    setItems(mockProducts);
  }, []);
  

  return (
    <div className="min-h-screen">
      <header className="py-6 flex justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Browse Items</h1>
          <p className="text-lg font-medium">Find the perfect item for your organization</p>
        </div>
      </header>

      {/* Search Bar */}
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
                className="rounded-lg bg-orange-500 px-6 py-2 text-white hover:bg-orange-600"
              >
                Search
              </button>
            </div>
            {/* Categories */}
            <div className="mt-4 flex flex-wrap gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 text-gray-500 capitalize hover:bg-gray-100 rounded-lg ${
                    category === cat ? "bg-orange-500 text-white" : "dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
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
