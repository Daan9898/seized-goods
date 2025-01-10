import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();

  const getConditionStyle = (condition) => {
    if (condition === "New") {
      return "bg-green-100 text-green-800";
    } else if (condition === "Used") {
      return "bg-orange-100 text-orange-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await apiClient(`/api/v1/seized-goods/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleRequestClick = () => {
    navigate("/request-submission", {
      state: { product },
    });
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-gray-500">Loading...</h1>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-red-500">
          {error || "Product not found!"}
        </h1>
      </div>
    );
  }

  const placeholders = ["1", "2", "3", "4"];
  const recommendedPlaceholders = [
    { id: "placeholder-1", name: "Placeholder Item 1", description: "This is a placeholder for a recommended item.", imageUrl: "https://via.placeholder.com/150" },
    { id: "placeholder-2", name: "Placeholder Item 2", description: "This is a placeholder for a recommended item.", imageUrl: "https://via.placeholder.com/150" },
    { id: "placeholder-3", name: "Placeholder Item 3", description: "This is a placeholder for a recommended item.", imageUrl: "https://via.placeholder.com/150" },
    { id: "placeholder-4", name: "Placeholder Item 4", description: "This is a placeholder for a recommended item.", imageUrl: "https://via.placeholder.com/150" },
  ];

  const recommendedItems = product.recommendedItems?.length > 0 ? product.recommendedItems : recommendedPlaceholders;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      {/* Breadcrumbs */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <Link to="/browse-items" className="hover:underline hover:text-gray-600">
              Home
            </Link>
            <span>
              <svg className="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <span className="capitalize">{product.category?.name || "Uncategorized"}</span>
            <span>
              <svg className="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <span>{product.name}</span>
          </div>
        </div>
      </div>
      {/* ./ Breadcrumbs */}

      <div className="flex flex-col md:flex-row -mx-4">
        {/* Product Images Section */}
        <div className="md:flex-1 px-4">
          {/* Main Image Display */}
          <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
            <img
              src={product.images?.[currentImageIndex]?.url || "https://via.placeholder.com/300"}
              alt="Main Product"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Image Thumbnails */}
          <div className="flex -mx-2">
            {placeholders.map((placeholder, index) => (
              <div key={index} className="flex-1 px-2">
                <button
                  onClick={() => setCurrentImageIndex(index)}
                  className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${
                    currentImageIndex === index ? "ring-2 ring-green-300" : ""
                  }`}
                >
                  {product.images?.[index] ? (
                    <img
                      src={product.images[index]?.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-5xl text-gray-400">{placeholder}</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="md:flex-1 px-4">
          <h2 className="mb-2 leading-tight tracking-tight font-extrabold text-gray-800 text-3xl">{product.name}</h2>
          <p className="text-gray-500 text-sm">
            <span className={`px-2 py-1 text-sm font-medium rounded-lg ${getConditionStyle(product.condition)}`}>
              {product.condition}
            </span>
          </p>

          <div className="flex items-center space-x-4 my-4">
            <div>
              <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                <span className="font-bold text-blue-600 text-3xl">{`$${product.value}`}</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-green-500 text-xl font-semibold">Save 12%</p>
              <p className="text-gray-400 text-sm">Inclusive of all taxes.</p>
            </div>
          </div>

          <p className="text-gray-500 mt-4">{product.description || "No description available for this product."}</p>

          <div className="flex py-4 space-x-4 mt-6">
            <button onClick={handleRequestClick} type="button" className="h-14 px-6 py-2 font-semibold rounded-xl bg-green-500 hover:bg-green-600 text-white">
              Request Item
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Items Section */}
      <div className="my-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow-sm hover:shadow-lg">
              <img
                src={item.imageUrl || item.photo || "https://via.placeholder.com/150"}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-slate-700 text-lg font-semibold">{item.name}</h2>
              <p className="text-slate-500 text-sm mt-1 line-clamp-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
