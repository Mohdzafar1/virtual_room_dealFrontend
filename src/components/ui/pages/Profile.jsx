import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../../helper/helper";

export const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleLogout=()=>{
    localStorage.removeItem('Auth_Token')
    localStorage.removeItem('User')
    navigate("/login");
  }
  const userData =getUserData('User')
  

  return (
    <div className="relative">
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full text-gray-600 hover:text-gray-800 transition duration-200 focus:outline-none"
      >
        <div className="relative">
          <FaUserCircle size={30} />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200 animate-fade-in">
          {/* Header */}
          <div className="px-4 py-3 bg-gray-100 border-b">
            <h3 className="text-sm font-semibold text-gray-700">{userData.name}</h3>
          </div>
          
          {/* Role */}
          <div className="px-4 py-3">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Role:</span> {userData.role}
            </p>
          </div>

          {/* Logout Button */}
          <div className="px-4 py-3 border-t">
            <button
            onClick={handleLogout}
              className="w-full flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
            >
              <IoMdLogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
