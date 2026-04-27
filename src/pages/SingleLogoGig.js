import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  FaStar, FaStarHalfAlt, FaRegStar,  
  FaClock, FaCheckCircle, FaShieldAlt, FaTrophy,
  FaPaintBrush, FaPalette, FaPenFancy, FaImage, FaVectorSquare,
  FaHeart, FaShare, FaArrowLeft, FaWhatsapp, FaEnvelope,
  FaCreditCard, FaLock, FaUserTie, FaEye,
  FaRegGem
} from "react-icons/fa";
import Chatbot from './chatbot';

const SingleLogoGig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("standard");

  useEffect(() => {
    const savedGigs = localStorage.getItem("logoGigs");
    if (savedGigs) {
      const gigs = JSON.parse(savedGigs);
      const foundGig = gigs.find(g => g.id.toString() === id);
      setGig(foundGig);
    }
    setLoading(false);
  }, [id]);

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
  };

  const sectionVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  const packages = [
    {
      id: "basic",
      name: "Basic Logo Package",
      price: "$99",
      description: "Perfect for startups and small businesses",
      features: [
        "1 Unique Logo Concept",
        "High Resolution Files (PNG, JPG)",
        "Source File (AI/EPS)",
        "Basic Color Palette",
        "2 Revisions",
        "1 Week Delivery",
        "Commercial Rights"
      ],
      delivery: "3-5 Days",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "standard",
      name: "Standard Logo Package",
      price: "$249",
      description: "Ideal for growing brands",
      features: [
        "3 Unique Logo Concepts",
        "High Resolution Files (PNG, JPG, SVG)",
        "Source File (AI/EPS/PSD)",
        "Complete Color Palette",
        "5 Revisions",
        "Brand Guidelines",
        "Social Media Kit",
        "Favicon Design",
        "Commercial Rights"
      ],
      delivery: "7-10 Days",
      popular: true,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "premium",
      name: "Premium Logo Package",
      price: "$499",
      description: "Complete branding solution",
      features: [
        "5+ Unique Logo Concepts",
        "All File Formats",
        "Source Files (All Formats)",
        "Complete Brand Identity",
        "Unlimited Revisions",
        "Detailed Brand Guidelines",
        "Complete Social Media Kit",
        "Business Card Design",
        "Letterhead Design",
        "Email Signature",
        "Full Commercial Rights"
      ],
      delivery: "14-21 Days",
      color: "from-orange-500 to-red-500"
    }
  ];

  const designSkills = [
    { icon: <FaPaintBrush />, name: "Logo Design", level: 98 },
    { icon: <FaPalette />, name: "Color Theory", level: 95 },
    { icon: <FaPenFancy />, name: "Typography", level: 92 },
    { icon: <FaVectorSquare />, name: "Vector Graphics", level: 96 },
    { icon: <FaImage />, name: "Brand Identity", level: 94 },
  ];

  const portfolioItems = [
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1626785774623-cdff8e6f6d8e?w=400&h=300&fit=crop",
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-yellow-400" />
        ))}
      </>
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
          />
        </div>
        <Footer />
      </>
    );
  }

  if (!gig) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">🎨</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Gig Not Found</h2>
            <p className="text-gray-500 mb-6">The design gig you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate("/logogigs")}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Browse Other Gigs
            </button>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100"
      >
        {/* Animated Background Blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
          <motion.div
            animate={{ x: [0, -120, 0], y: [0, 70, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
          <motion.div
            animate={{ x: [0, 80, 0], y: [0, -100, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-300 rounded-full filter blur-3xl opacity-10"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
          
          {/* Back Button */}
          <motion.button
            variants={headerVariants}
            onClick={() => navigate("/logogigs")}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-all duration-200 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to All Designers</span>
          </motion.button>

          {/* Gig Header */}
          <motion.div variants={headerVariants} className="mb-8">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
                  {gig.title}
                </h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    {renderStars(gig.rating || 4.9)}
                    <span className="ml-2 text-gray-600 font-medium">{gig.rating || 4.9}</span>
                    <span className="text-gray-400">({gig.reviews || 128} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {gig.level || "Expert Designer"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isWishlisted 
                      ? "bg-red-500 text-white shadow-lg" 
                      : "bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500"
                  }`}
                >
                  <FaHeart />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-purple-600 transition-all"
                >
                  <FaShare />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Gig Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <motion.div variants={contentVariants} className="bg-white/40 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl border border-white/50">
                <div className="relative h-96 overflow-hidden">
                  {gig.img ? (
                    <img
                      src={gig.img}
                      alt={gig.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <FaPaintBrush className="text-white text-8xl opacity-50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* About Section */}
              <motion.div variants={sectionVariants} className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-white/50">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUserTie className="text-purple-500" />
                  About the Designer
                </h2>
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-2xl font-bold">
                    {gig.name?.charAt(0) || "D"}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{gig.name}</h3>
                    <p className="text-gray-500">Creative Logo Designer | {gig.level || "Expert"} Level</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {gig.about || "Creative logo designer with over 5 years of experience in brand identity design. Specialized in creating unique, memorable logos that help businesses stand out. I combine creativity with strategic thinking to deliver designs that truly represent your brand."}
                </p>
              </motion.div>

              {/* Design Skills Section */}
              <motion.div variants={sectionVariants} className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-white/50">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaPaintBrush className="text-purple-500" />
                  Design Expertise
                </h2>
                <div className="space-y-4">
                  {designSkills.map((skill, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">{skill.icon}</span>
                          <span className="text-gray-700 font-medium">{skill.name}</span>
                        </div>
                        <span className="text-gray-600">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Portfolio Showcase */}
              <motion.div variants={sectionVariants} className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-white/50">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaEye className="text-purple-500" />
                  Recent Work
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {portfolioItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="relative rounded-xl overflow-hidden cursor-pointer group"
                    >
                      <img src={item} alt={`Portfolio ${idx + 1}`} className="w-full h-32 object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <FaEye className="text-white text-xl" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                variants={contentVariants}
                className="sticky top-24 bg-white/40 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-800">{gig.price}</div>
                    <p className="text-gray-500 text-sm">per logo design</p>
                  </div>

                  {/* Package Selection */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Select Package</h3>
                    <div className="space-y-3">
                      {packages.map((pkg) => (
                        <motion.div
                          key={pkg.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedPackage(pkg.id)}
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                            selectedPackage === pkg.id
                              ? `border-purple-500 bg-gradient-to-r ${pkg.color} bg-opacity-10 shadow-lg`
                              : "border-gray-200 bg-white/50 hover:border-purple-300"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-gray-800">{pkg.name}</h4>
                              <p className="text-xs text-gray-500">{pkg.description}</p>
                            </div>
                            {pkg.popular && (
                              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                Popular
                              </span>
                            )}
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xl font-bold text-gray-800">{pkg.price}</span>
                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                              <FaClock />
                              <span>{pkg.delivery}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">What's Included</h3>
                    <div className="space-y-2">
                      {packages.find(p => p.id === selectedPackage)?.features.slice(0, 6).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCheckCircle className="text-green-500 text-xs" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {packages.find(p => p.id === selectedPackage)?.features.length > 6 && (
                        <div className="text-xs text-gray-400 mt-1">
                          +{packages.find(p => p.id === selectedPackage)?.features.length - 6} more features
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate("/contact_me")}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <FaEnvelope />
                      Connect With Us
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate("/payment")}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <FaCreditCard />
                      Proceed to Payment
                      <FaLock className="text-xs" />
                    </motion.button>

                    <motion.a
                      href="https://wa.me/1234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-green-500 text-green-600 font-semibold hover:bg-green-50 transition-all"
                    >
                      <FaWhatsapp />
                      Chat on WhatsApp
                    </motion.a>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-center gap-4 text-center">
                      <div>
                        <FaShieldAlt className="text-gray-400 text-xl mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Secure Payment</p>
                      </div>
                      <div>
                        <FaTrophy className="text-gray-400 text-xl mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Quality Guarantee</p>
                      </div>
                      <div>
                        <FaRegGem className="text-gray-400 text-xl mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Unique Design</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Reviews Section */}
          <motion.div
            variants={sectionVariants}
            className="mt-12 bg-white/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-white/50"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              Client Reviews
            </h2>
            <div className="space-y-6">
              {[1, 2, 3].map((review, idx) => (
                <div key={idx} className="pb-6 border-b border-gray-200 last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-white font-bold">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Client {idx + 1}</p>
                      <div className="flex items-center gap-1 text-sm">
                        {renderStars(5 - idx * 0.5)}
                        <span className="text-gray-500 ml-2">2 months ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {idx === 0 && "Amazing designer! The logo exceeded my expectations. Very creative and professional!"}
                    {idx === 1 && "Great communication and delivered multiple concepts. Very happy with the final design!"}
                    {idx === 2 && "Best logo designer on the platform. Understood my brand vision perfectly. Highly recommend!"}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
       <Chatbot />
      <Footer />
    </>
  );
};

export default SingleLogoGig;