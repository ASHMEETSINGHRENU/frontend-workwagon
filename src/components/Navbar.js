import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaBars, FaTimes, FaSearch, FaHome, FaLaptopCode, 
  FaImage, FaFileAlt, FaSignOutAlt, FaUserCircle, 
  FaChevronDown, FaUser, FaBriefcase
} from "react-icons/fa";
//FaCog,
function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImageError, setProfileImageError] = useState(false);

  // Get user data from localStorage with real-time updates
  useEffect(() => {
    const updateUser = () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    };
    
    updateUser();
    
    // Listen for storage changes (in case profile is updated in another tab)
    window.addEventListener("storage", updateUser);
    
    // Custom event for profile updates within the same tab
    window.addEventListener("profileUpdated", updateUser);
    
    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("profileUpdated", updateUser);
    };
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(false);
    navigate("/profile");
  };

  // Get profile picture URL
  const getProfilePicUrl = () => {
    if (!user?.profilePic) return null;
    // Handle both full URLs and relative paths
    if (user.profilePic.startsWith('http')) return user.profilePic;
    return `https://backend-workwagon.onrender.com/${user.profilePic}`;
  };

  const profilePicUrl = getProfilePicUrl();

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const menuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeInOut" } }
  };

  const profileDropdownVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.15 } }
  };

  const searchVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: { opacity: 1, height: "auto", marginTop: 12, transition: { duration: 0.3 } }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 shadow-lg border-b border-white/20"
    >
      <div className="px-4 py-3 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name with animation */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              WorkWagon
            </span>
          </motion.div>


          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            <NavButton onClick={() => navigate("/")} icon={<FaHome />} label="Home" />
            <NavButton onClick={() => navigate("/website")} icon={<FaLaptopCode />} label="Website" />
            <NavButton onClick={() => navigate("/logogigs")} icon={<FaImage />} label="Logo" />
            <NavButton onClick={() => navigate("/SEO")} icon={<FaFileAlt />} label="SEO" />
            <NavButton onClick={() => navigate("/portfolio")} icon={<FaBriefcase />} label="Portfolio" />
            
            {/* User Profile Section */}
            {user ? (
              <div className="relative ml-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleProfile}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-100"
                >
                  {profilePicUrl && !profileImageError ? (
                    <img
                      src={profilePicUrl}
                      alt={user.username || "User"}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-400"
                      onError={() => setProfileImageError(true)}
                    />
                  ) : (
                    <FaUserCircle className="text-2xl text-blue-500" />
                  )}
                  <span className="text-gray-700 font-medium text-sm max-w-[100px] truncate">
                    {user.username || "User"}
                  </span>
                  <FaChevronDown className={`text-gray-500 text-xs transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      variants={profileDropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="flex items-center gap-3">
                          {profilePicUrl && !profileImageError ? (
                            <img
                              src={profilePicUrl}
                              alt={user.username}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-400"
                              onError={() => setProfileImageError(true)}
                            />
                          ) : (
                            <FaUserCircle className="text-3xl text-blue-500" />
                          )}
                          <div>
                            <p className="font-semibold text-gray-800">{user.username}</p>
                            <p className="text-xs text-gray-500 truncate max-w-[150px]">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <DropdownItem onClick={handleProfileClick} icon={<FaUser />} label="My Profile" />
                        <DropdownItem onClick={handleLogout} icon={<FaSignOutAlt />} label="Logout" isLogout />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all"
              >
                Login
              </motion.button>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={toggleSearch}
              className="text-gray-600 p-2"
            >
              <FaSearch size={18} />
            </motion.button>
            
            {/* Mobile User Avatar (if logged in) */}
            {user && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleProfileClick}
                className="p-1"
              >
                {profilePicUrl && !profileImageError ? (
                  <img
                    src={profilePicUrl}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-400"
                    onError={() => setProfileImageError(true)}
                  />
                ) : (
                  <FaUserCircle className="text-2xl text-blue-500" />
                )}
              </motion.button>
            )}
            
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="text-gray-600 p-2"
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              variants={searchVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for tasks..."
                  className="w-full px-4 py-2 pl-10 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden mt-3 overflow-hidden"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-2">
                <div className="flex flex-col">
                  <MobileNavItem onClick={() => { navigate("/"); setIsMenuOpen(false); }} icon={<FaHome />} label="Home" />
                  <MobileNavItem onClick={() => { navigate("/website"); setIsMenuOpen(false); }} icon={<FaLaptopCode />} label="Website" />
                  <MobileNavItem onClick={() => { navigate("/logogigs"); setIsMenuOpen(false); }} icon={<FaImage />} label="Logo" />
                  <MobileNavItem onClick={() => { navigate("/SEO"); setIsMenuOpen(false); }} icon={<FaFileAlt />} label="SEO" />
                  <MobileNavItem onClick={() => { navigate("/portfolio"); setIsMenuOpen(false); }} icon={<FaBriefcase />} label="Portfolio" />
                  
                  {!user && (
                    <MobileNavItem 
                      onClick={() => { navigate("/login"); setIsMenuOpen(false); }} 
                      icon={<FaUserCircle />} 
                      label="Login" 
                      isHighlight 
                    />
                  )}
                  
                  {user && (
                    <>
                      <div className="border-t border-gray-100 my-2"></div>
                      <MobileNavItem onClick={handleLogout} icon={<FaSignOutAlt />} label="Logout" isLogout />
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// Helper Components
const NavButton = ({ onClick, icon, label }) => (
  <motion.button
    whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium"
  >
    {icon}
    <span>{label}</span>
  </motion.button>
);

const DropdownItem = ({ onClick, icon, label, isLogout }) => (
  <motion.button
    whileHover={{ x: 5, backgroundColor: isLogout ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.05)" }}
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors duration-200 ${
      isLogout ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-blue-50"
    }`}
  >
    {icon}
    <span>{label}</span>
  </motion.button>
);

const MobileNavItem = ({ onClick, icon, label, isHighlight, isLogout }) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isHighlight 
        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" 
        : isLogout 
          ? "text-red-600 hover:bg-red-50" 
          : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </motion.button>
);

export default Navbar;