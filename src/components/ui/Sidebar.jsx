import React from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaPlus, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-black text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-6">Virtual Deal Room</h1>

      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="flex items-center space-x-2 hover:text-gray-300">
            <FaChartLine /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/createDeal" className="flex items-center space-x-2 hover:text-gray-300">
            <FaPlus /> <span>My Deal</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/incoming_deal" className="flex items-center space-x-2 hover:text-gray-300">
            <FaCog /><span>Incoming Deal</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
