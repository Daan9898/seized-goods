import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, setError } from "../store/authSlice";
const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
  return (
    <nav className="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white shadow sm:items-baseline w-full">
      {/* Logo Section */}
      <div className="mb-2 sm:mb-0 flex flex-row">
        <div>
          <Link to="/" className="h-10 w-10 self-center mr-2">
            <span className="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold">
              Renieuw
            </span>
            <br />
            <span className="text-xs text-grey-dark">
              Beautiful New Tagline
            </span>
          </Link>
        </div>
      </div>

      {/* Links Section */}
      <div className="flex items-center self-center space-x-4">
        <Link
          to="/browse-items"
          className="text-md text-black hover:text-blue-dark"
        >
          Browse Items
        </Link>
        {user && user.role !== "ADMIN" && (
          <Link
            to="/my-requests"
            className="text-md text-black hover:text-blue-dark"
          >
            My Requests
          </Link>
        )}
      </div>

      {/* User Info Section */}
      <div className="sm:mb-0 self-center flex items-center">
        <span className="text-md no-underline text-black hover:text-blue-dark ml-2 px-1">
          {user ? `${user.firstName} ${user.lastName}` : "Guest"}
        </span>
        {user?.image && (
          <img
            src={user.image}
            alt="User Avatar"
            className="h-10 w-10 rounded-full ml-4"
          />
        )}
        {user && (
          <button
            onClick={handleLogout}
            className="bg-slate-900 text-gray-400 p-2 rounded-md m-4"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
