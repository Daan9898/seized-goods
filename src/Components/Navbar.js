import React from "react";

const Navbar = ({ user }) => {
  return (
    <nav className="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white shadow sm:items-baseline w-full">
      {/* Logo Section */}
      <div className="mb-2 sm:mb-0 flex flex-row">
        <div className="h-10 w-10 self-center mr-2">
         
        </div>
        <div>
          <span className="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold">
            Renieuw
          </span>
          <br />
          <span className="text-xs text-grey-dark">Beautiful New Tagline</span>
        </div>
      </div>

      {/* User Info Section */}
      <div className="sm:mb-0 self-center flex items-center">
        <span className="text-md no-underline text-black hover:text-blue-dark ml-2 px-1">
          {user?.name || "Guest"}
        </span>
        {user?.image && (
          <img
            src={user.image}
            alt="User Avatar"
            className="h-10 w-10 rounded-full ml-4"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
