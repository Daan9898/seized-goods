import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ProductDetails = ({ products }) => {
  const { id } = useParams(); // Get the product ID from the URL
  const product = products.find((item) => item.id === parseInt(id));
  const [currentImage, setCurrentImage] = useState(0); // State for the currently displayed image
  
  const navigate = useNavigate();

  const getConditionStyle = (condition) => {
    if (condition === "New") {
      return "bg-green-100 text-green-800";
    } else if (condition === "Used") {
      return "bg-orange-100 text-orange-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  // Filter recommended items (excluding the current product)
  const recommendedItems = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  const handleRequestClick = () => {
    navigate("/request-submission", {
      state: { product }, // Pass the product details to the RequestSubmission page
    });
  };

  if (!product) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-red-500">Product not found!</h1>
      </div>
    );
  }

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
              <svg
                className="h-5 w-5 leading-none text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <span className="capitalize">{product.category}</span>
            <span>
              <svg
                className="h-5 w-5 leading-none text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <span>{product.name}</span>
          </div>
        </div>
      </div>
      {/* ./ Breadcrumbs */}

      <div className="flex flex-col md:flex-row -mx-4">
        {/* Product Images */}
        <div className="md:flex-1 px-4">
          <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
            <img
              src={product.images[currentImage] || "https://via.placeholder.com/300"}
              alt={`${product.name}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex -mx-2 mb-4">
            {product.images.map((image, index) => (
              <div key={index} className="flex-1 px-2">
                <button
                  onClick={() => setCurrentImage(index)}
                  className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${
                    currentImage === index ? "ring-2 ring-green-300 ring-inset" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:flex-1 px-4">
          <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
            {product.name}
          </h2>
          <p className="text-gray-500 text-sm">
            <span
            className={`px-2 py-1 text-sm font-medium rounded-lg ${getConditionStyle(
              product.condition
            )}`}
          >
            {product.condition}
          </span>
          </p>

          <div className="flex items-center space-x-4 my-4">
            <div>
              <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                <span className="font-bold text-blue-600 text-3xl">{product.value}</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-green-500 text-xl font-semibold">Save 12%</p>
              <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
            </div>
          </div>

          <p className="text-gray-500 mt-4">
            {product.description ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae exercitationem porro saepe ea harum corrupti vero id laudantium enim, libero blanditiis expedita cupiditate a est."}
          </p>

          <div className="flex py-4 space-x-4 mt-6">
            <div className="relative">
              <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                Qty
              </div>
              <div className="rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-center justify-center">
                <span className="text-lg font-semibold">1</span>
              </div>
            </div>

            <button
              onClick={handleRequestClick}
              type="button"
              className="h-14 px-6 py-2 font-semibold rounded-xl bg-green-500 hover:bg-green-600 text-white"
            >
              Request Item
            </button>
          </div>

        </div>
      </div>

      {/* Recommended Items Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedItems.length > 0 ? (
            recommendedItems.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-lg">
                {/* Product Image */}
                <img
                  src={product.photo || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />

                {/* Product Details */}
                <div className="mt-4 p-2">
                  <h2 className="text-slate-700 text-lg font-semibold">{product.name}</h2>
                  <p className="mt-1 text-sm text-slate-500 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span
                      className={`px-2 py-1 text-sm font-medium rounded-lg ${getConditionStyle(
                        product.condition
                      )}`}
                    >
                      {product.condition}
                    </span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-lg">
                      Urgency: {product.urgency || "Normal"}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-lg font-bold text-black">{product.value}</p>
                    <Link
                      to={`/product-details/${product.id}`}
                      className="flex items-center space-x-1.5 rounded-lg bg-green-500 px-4 py-1.5 text-white hover:bg-green-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                      <span className="text-sm">More details</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recommended items available.</p>
          )}
        </div>
      </div>

     
    </div>
  );
};

export default ProductDetails;
