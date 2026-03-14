import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaHome, FaLaptopCode, FaImage, FaFileAlt, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <nav className="bg-blue-600 shadow-md px-4 py-3 md:px-6">
      <div className="flex items-center justify-between">
        {/* Logo / Brand Name */}
        <div className="text-2xl font-bold text-white">WorkWagon</div>

        {/* Desktop Search Box (hidden on mobile) */}
        <div className="hidden md:flex flex-1 mx-4">
          <input
            type="text"
            placeholder="Search for tasks..."
            className="w-full max-w-md px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Mobile Search Icon (hidden on desktop) */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleSearch}
            className="text-white mr-4"
          >
            <FaSearch size={20} />
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="text-white"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Links (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => navigate("/")} 
            className="text-white hover:text-gray-200 transition flex items-center gap-1"
          >
            <FaHome /> <span>Home</span>
          </button>
          <button 
            onClick={() => navigate("/website")} 
            className="text-white hover:text-gray-200 transition flex items-center gap-1"
          >
            <FaLaptopCode /> <span>Website</span>
          </button>
          <button 
            onClick={() => navigate("/logogigs")} 
            className="text-white hover:text-gray-200 transition flex items-center gap-1"
          >
            <FaImage /> <span>Logo</span>
          </button>
          <button 
            onClick={() => navigate("/SEO")} 
            className="text-white hover:text-gray-200 transition flex items-center gap-1"
          >
            <FaFileAlt /> <span>SEO</span>
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition flex items-center gap-1"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>

      {/* Mobile Search Input (appears when search icon clicked) */}
      {showSearch && (
        <div className="mt-3 md:hidden">
          <input
            type="text"
            placeholder="Search for tasks..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {/* Mobile Menu (appears when menu button clicked) */}
      {isMenuOpen && (
        <div className="mt-3 md:hidden bg-blue-700 rounded-lg p-4">
          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }} 
              className="text-white hover:text-gray-200 transition flex items-center gap-2"
            >
              <FaHome /> Home
            </button>
            <button 
              onClick={() => {
                navigate("/website");
                setIsMenuOpen(false);
              }} 
              className="text-white hover:text-gray-200 transition flex items-center gap-2"
            >
              <FaLaptopCode /> Website
            </button>
            <button 
              onClick={() => {
                navigate("/logogigs");
                setIsMenuOpen(false);
              }} 
              className="text-white hover:text-gray-200 transition flex items-center gap-2"
            >
              <FaImage /> Logo
            </button>
            <button 
              onClick={() => {
                navigate("/SEO");
                setIsMenuOpen(false);
              }} 
              className="text-white hover:text-gray-200 transition flex items-center gap-2"
            >
              <FaFileAlt /> SEC
            </button>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center gap-2 justify-center"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;