import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleRequestClick = () => {
    navigate(`/product/${product.id}`);
  };

  const getConditionStyle = (condition) => {
    if (condition === "New") {
      return "bg-green-100 text-green-800";
    } else if (condition === "Used") {
      return "bg-orange-100 text-orange-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  return (
    <article className="flex flex-col rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transform duration-300 hover:scale-105">
      <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-gray-100">
        <img
          src={product.images?.[0]?.url || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-full object-contain aspect-square"
        />
      </div>
      <div className="mt-4 flex flex-col flex-1 p-2">
        <h2 className="text-slate-700 text-lg font-semibold min-h-[3rem]">
          {product.name.length > 20
            ? product.name.slice(0, 17) + "..."
            : product.name}
        </h2>
        <p className="mt-1 text-sm text-slate-500 line-clamp-2 min-h-[3rem]">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-2 gap-2">
          <span
            className={`px-2 py-1 text-sm font-medium rounded-lg ${getConditionStyle(
              product.condition
            )}`}
          >
            {product.condition}
          </span>
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-lg">
            {product.category?.name || "Unknown"}
          </span>
        </div>
        <div className="mt-3 flex flex-col flex-1 items-center justify-between">
          <p className="text-lg self-start font-bold text-black">
            {`$${product.value?.toFixed(2)}`}
          </p>
          <button
            onClick={handleRequestClick}
            className="mt-2 flex items-center w-full space-x-1.5 rounded-lg bg-green-500 px-4 py-1.5 text-white hover:bg-green-600"
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
            <span className="text-sm">More Details</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
