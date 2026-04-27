import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from '../components/Footer';
import { 
  FaStar, FaChartLine, FaSearch, FaGoogle, FaArrowUp, 
  FaUserTie, FaMedal, FaShieldAlt,
  FaArrowRight, FaFilter, FaSearch as FaSearchIcon, FaTimes,
  FaDatabase, FaTachometerAlt, FaLink, FaFileAlt
} from "react-icons/fa";
import Chatbot from './chatbot';
export default function SEOGigs() {
  const [gigs, setGigs] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Load gigs from localStorage
  useEffect(() => {
    const savedGigs = localStorage.getItem("seoGigs");
    if (savedGigs) {
      setGigs(JSON.parse(savedGigs));
      setFilteredGigs(JSON.parse(savedGigs));
    }
  }, []);

  // Filter gigs based on search and level
  useEffect(() => {
    let filtered = [...gigs];
    
    if (searchTerm) {
      filtered = filtered.filter(gig => 
        gig.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.level?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedLevel !== "all") {
      filtered = filtered.filter(gig => gig.level === selectedLevel);
    }
    
    setFilteredGigs(filtered);
  }, [searchTerm, selectedLevel, gigs]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } },
    hover: { y: -8, transition: { duration: 0.2 } }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } }
  };

  const getLevelBadge = (level) => {
    switch(level?.toLowerCase()) {
      case 'beginner':
        return { color: 'from-green-500 to-emerald-500', bg: 'bg-green-50', text: 'Beginner' };
      case 'intermediate':
        return { color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', text: 'Intermediate' };
      case 'expert':
        return { color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50', text: 'Expert' };
      default:
        return { color: 'from-gray-500 to-gray-600', bg: 'bg-gray-50', text: level || 'Standard' };
    }
  };

  const getSeoExpertise = (title) => {
    const expertise = [];
    if (title?.toLowerCase().includes('keyword')) expertise.push({ icon: <FaSearch />, name: 'Keyword Research' });
    if (title?.toLowerCase().includes('on-page')) expertise.push({ icon: <FaFileAlt />, name: 'On-Page SEO' });
    if (title?.toLowerCase().includes('technical')) expertise.push({ icon: <FaTachometerAlt />, name: 'Technical SEO' });
    if (title?.toLowerCase().includes('link')) expertise.push({ icon: <FaLink />, name: 'Link Building' });
    if (title?.toLowerCase().includes('local')) expertise.push({ icon: <FaGoogle />, name: 'Local SEO' });
    if (expertise.length === 0) {
      expertise.push({ icon: <FaChartLine />, name: 'SEO Strategy' });
      expertise.push({ icon: <FaDatabase />, name: 'Analytics' });
    }
    return expertise.slice(0, 2);
  };

  const levels = [
    { value: "all", label: "All Levels", icon: <FaUserTie /> },
    { value: "beginner", label: "Beginner", icon: <FaMedal /> },
    { value: "intermediate", label: "Intermediate", icon: <FaShieldAlt /> },
    { value: "expert", label: "Expert", icon: <FaStar /> }
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{ x: [0, -120, 0], y: [0, 70, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-300 rounded-full filter blur-3xl opacity-10"
        />
      </div>

      <Navbar />
      
      {/* Main Content */}
      <div className="relative z-10 flex-grow">
        {/* Hero Section */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-16 md:py-20 overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <motion.div
              animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-40 -right-40 w-80 h-80 bg-white/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/20 rounded-full blur-3xl"
            />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <FaChartLine className="text-sm" />
                <span className="text-sm font-medium">SEO Specialists</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Expert SEO Consultants
              </h1>
              <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
                Hire professional SEO experts to boost your rankings and drive organic traffic
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm py-4 px-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <FaSearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search specialists by name, expertise, or level..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                )}
              </div>

              {/* Filter Toggle for Mobile */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700"
              >
                <FaFilter />
                <span>Filters</span>
              </button>

              {/* Level Filters */}
              <div className={`${showFilters ? 'flex' : 'hidden'} md:flex gap-2 flex-wrap justify-center`}>
                {levels.map((level) => (
                  <motion.button
                    key={level.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedLevel(level.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedLevel === level.value
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {level.icon}
                    <span>{level.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <p className="text-gray-500 text-sm">
            Showing <span className="font-semibold text-gray-700">{filteredGigs.length}</span> SEO specialists
          </p>
        </div>

        {/* Gigs Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8 mb-12">
          {filteredGigs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No specialists found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredGigs.map((gig) => {
                const levelBadge = getLevelBadge(gig.level);
                const seoExpertise = getSeoExpertise(gig.title);
                
                return (
                  <motion.div
                    key={gig.id}
                    variants={cardVariants}
                    whileHover="hover"
                    className="group"
                  >
                    <Link to={`/SEO/${gig.id}`}>
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                        {/* Image Section */}
                        <div className="relative h-48 overflow-hidden">
                          {gig.img ? (
                            <>
                              <img
                                src={gig.img}
                                alt={gig.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                              <FaChartLine className="text-white text-6xl opacity-50" />
                            </div>
                          )}
                          
                          {/* Level Badge */}
                          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${levelBadge.color} text-white shadow-lg`}>
                            {levelBadge.text}
                          </div>
                          
                          {/* Rating Badge */}
                          <div className="absolute bottom-4 left-4 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                            <FaStar className="text-yellow-400 text-xs" />
                            <span className="font-medium">{gig.rating || 4.9}</span>
                            <span className="text-xs text-gray-300">({gig.reviews || 128})</span>
                          </div>

                          {/* Results Badge */}
                          <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                            <FaArrowUp className="text-xs" />
                            <span>Top Ranker</span>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5">
                          {/* Specialist Name */}
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition-colors">
                              {gig.name}
                            </h3>
                            <div className="flex items-center gap-1 text-gray-500">
                              <FaUserTie className="text-xs" />
                              <span className="text-xs">SEO Expert</span>
                            </div>
                          </div>
                          
                          {/* Title */}
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {gig.title}
                          </p>
                          
                          {/* SEO Expertise */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {seoExpertise.map((exp, idx) => (
                              <span key={idx} className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                {exp.icon}
                                <span>{exp.name}</span>
                              </span>
                            ))}
                          </div>
                          
                          {/* Footer */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-bold text-gray-800">{gig.price}</span>
                              <span className="text-xs text-gray-500">/ project</span>
                            </div>
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="flex items-center gap-1 text-green-600 font-medium text-sm group-hover:gap-2 transition-all"
                            >
                              View Profile
                              <FaArrowRight className="text-xs" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-4 mb-12 rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600" />
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-60 h-60 bg-white/20 rounded-full blur-3xl"
            />
          </div>
          

        </motion.div>
      </div>
      <Chatbot />

      <Footer />
    </div>
  );
}