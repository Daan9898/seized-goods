import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, setError } from "../store/authSlice";
// icons
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaProductHunt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

const menuItems = [
  {
    icons: <IoHomeOutline size={30} />,
    label: "Home",
    toPage: "/",
  },
  {
    icons: <FaProductHunt size={30} />,
    label: "Products",
    toPage: "/browse-items",
  },
  {
    icons: <MdOutlineDashboard size={30} />,
    label: "Dashboard",
    toPage: "/admin",
    adminOnly: true,
  },

  {
    icons: <TbReportSearch size={30} />,
    label: "Requests",
    toPage: "/my-requests",
    usersOnly: true,
  },
];

export default function Sidebar({ user }) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };

  return (
    <nav
      className={`min-h-screen shadow-md p-2 flex flex-col duration-500 bg-gray-500 dark:bg-gray-800 text-white ${
        open ? "w-60" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="px-3 py-2 h-20 flex justify-between items-center">
        <div>
          <MdMenuOpen
            size={34}
            className={`duration-500 cursor-pointer ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      {/* Body */}
      <ul className="flex-1">
        {menuItems
          .filter(
            (item) =>
              (!item.adminOnly || (user && user.role === "ADMIN")) &&
              (!item.usersOnly || (user && user.role === "USER"))
          )
          .map((item, index) => (
            <Link to={item.toPage} key={index}>
              <li className="px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group">
                <div>{item.icons}</div>
                <p
                  className={`${
                    !open && "w-0 translate-x-24"
                  } duration-500 overflow-hidden`}
                >
                  {item.label}
                </p>
                <p
                  className={`${
                    open && "hidden"
                  } absolute left-32 shadow-md rounded-md
                  w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}
                >
                  {item.label}
                </p>
              </li>
            </Link>
          ))}
        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 mt-4 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full "
          >
            <FiLogOut size={20} />
            <span className={`${!open && "hidden"} duration-500`}>Logout</span>
          </button>
        )}
      </ul>

      {/* Footer */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-2">
          {user?.image ? (
            <img
              src={user.image}
              alt="User Avatar"
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <FaUserCircle size={30} />
          )}
          <div
            className={`leading-5 ${
              !open && "w-0 translate-x-24"
            } duration-500 overflow-hidden`}
          >
            <p>{user ? `${user.firstName} ${user.lastName}` : "Guest"}</p>
            <span className="text-xs">
              {user?.email || "guest@example.com"}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
