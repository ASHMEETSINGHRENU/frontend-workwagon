import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaLaptopCode, FaImage, FaFileAlt } from "react-icons/fa";
import { LogOut } from "lucide-react";

function FreelancerNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("You have been logged out.");
    navigate("/freelancer-login");
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">


                    <Link to="/Dashboard" className="flex items-center">
                    <FaHome className="text-blue-600 text-xl" />



          <h1 className="text-xl font-bold text-gray-800">
            <span className="text-blue-600">WorkWagon</span> - Freelancer
          </h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/freelancerLogo" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition">
            <FaImage /> Logo
          </Link>
          <Link to="/freelancerWebsite" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition">
            <FaLaptopCode /> Website
          </Link>
          <Link to="/freelancerSeo" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition">
            <FaFileAlt /> SEO
          </Link>

          <span className="text-sm text-gray-600">Hello, {user?.name || "Freelancer"}</span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4 space-y-3">
          <Link to="/freelancerLogo" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600">
            <FaImage className="inline mr-2" /> Logo
          </Link>
          <Link to="/freelancerWebsite" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600">
            <FaLaptopCode className="inline mr-2" /> Website
          </Link>
          <Link to="/freelancerSeo" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600">
            <FaFileAlt className="inline mr-2" /> SEO
          </Link>
          <span className="text-sm text-gray-600">Welcome: {user?.email || "User"}</span>
          <button
            onClick={() => {
              toggleMenu();
              handleLogout();
            }}
            className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default FreelancerNavbar;
