import React, { useState } from "react";
// icons
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaProductHunt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

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
  },
  {
    icons: <IoLogoBuffer size={30} />,
    label: "Log",
  },
  {
    icons: <TbReportSearch size={30} />,
    label: "Report",
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <nav
      className={`min-h-screen shadow-md p-2 flex flex-col duration-500 bg-gray-500 dark:bg-gray-800 text-white ${
        open ? "w-60" : "w-16"
      }`}
    >
      {/* Header */}
      <div className=" px-3 py-2 h-20 flex justify-between items-center">
        <div>
          <MdMenuOpen
            size={34}
            className={` duration-500 cursor-pointer ${!open && " rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      {/* Body */}

      <ul className="flex-1">
        {menuItems.map((item, index) => {
          return (
            <Link to={item.toPage}>
              <li
                key={index}
                className="px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group"
              >
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
                 w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16
                `}
                >
                  {item.label}
                </p>
              </li>
            </Link>
          );
        })}
      </ul>
      {/* footer */}
      <div className="flex items-center gap-2 px-3 py-2">
        <div>
          <FaUserCircle size={30} />
        </div>
        <div
          className={`leading-5 ${
            !open && "w-0 translate-x-24"
          } duration-500 overflow-hidden`}
        >
          <p>Saheb</p>
          <span className="text-xs">saheb@gmail.com</span>
        </div>
      </div>
    </nav>
  );
}
