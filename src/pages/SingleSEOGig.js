import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  FaStar, FaStarHalfAlt, FaRegStar, 
  FaClock, FaCheckCircle, FaShieldAlt, FaTrophy, FaRocket,
  FaChartLine, FaSearch, FaGoogle, FaArrowUp, FaDatabase,
  FaLink, FaFileAlt, FaTachometerAlt, FaHeart, FaShare, 
  FaArrowLeft, FaWhatsapp, FaEnvelope, FaCreditCard, FaLock, 
  FaCalendarCheck, FaUserTie, FaRegChartBar
} from "react-icons/fa";
import Chatbot from './chatbot';

const SingleSEOGig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("standard");

  useEffect(() => {
    const savedGigs = localStorage.getItem("seoGigs");
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
      name: "Basic SEO Package",
      price: "$299",
      description: "Perfect for small businesses starting out",
      features: [
        "Keyword Research (50 Keywords)",
        "On-Page SEO Optimization",
        "Meta Tags Optimization",
        "Google Analytics Setup",
        "Search Console Integration",
        "Monthly Report",
        "Basic Backlink Analysis",
        "1 Month Support"
      ],
      delivery: "7-10 Days",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "standard",
      name: "Standard SEO Package",
      price: "$599",
      description: "Ideal for growing businesses",
      features: [
        "Keyword Research (150 Keywords)",
        "Complete On-Page SEO",
        "Technical SEO Audit",
        "Content Optimization",
        "Google Analytics & GTM Setup",
        "Local SEO Optimization",
        "Backlink Building (20 links)",
        "Competitor Analysis",
        "Weekly Reports",
        "3 Months Support"
      ],
      delivery: "14-21 Days",
      popular: true,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "premium",
      name: "Premium SEO Package",
      price: "$1199",
      description: "Complete enterprise solution",
      features: [
        "Keyword Research (500+ Keywords)",
        "Complete On-Page SEO",
        "Advanced Technical SEO",
        "Content Strategy & Creation",
        "Full Analytics Suite",
        "Local & National SEO",
        "Backlink Building (50+ links)",
        "Detailed Competitor Analysis",
        "Conversion Optimization",
        "E-commerce SEO (if applicable)",
        "Weekly Detailed Reports",
        "12 Months Support"
      ],
      delivery: "30-45 Days",
      color: "from-orange-500 to-red-500"
    }
  ];

  const seoSkills = [
    { icon: <FaSearch />, name: "Keyword Research", level: 98 },
    { icon: <FaFileAlt />, name: "On-Page SEO", level: 95 },
    { icon: <FaTachometerAlt />, name: "Technical SEO", level: 92 },
    { icon: <FaLink />, name: "Link Building", level: 88 },
    { icon: <FaGoogle />, name: "Google Analytics", level: 94 },
    { icon: <FaDatabase />, name: "SEO Analytics", level: 90 },
  ];

  const resultsMetrics = [
    { label: "Avg. Traffic Increase", value: "+150%", icon: <FaArrowUp />, color: "from-green-500 to-emerald-500" },
    { label: "Keyword Rankings", value: "Top 10", icon: <FaSearch />, color: "from-blue-500 to-cyan-500" },
    { label: "Conversion Rate", value: "+45%", icon: <FaRegChartBar />, color: "from-purple-500 to-pink-500" },
    { label: "ROI", value: "300%", icon: <FaRocket />, color: "from-orange-500 to-red-500" },
  ];

  const caseStudies = [
    {
      client: "EcoTech Solutions",
      result: "300% traffic increase in 6 months",
      metric: "#1 for 25+ keywords"
    },
    {
      client: "FashionHub Store",
      result: "200% organic revenue growth",
      metric: "50% decrease in bounce rate"
    },
    {
      client: "Local Restaurant",
      result: "400% increase in local searches",
      metric: "Featured in Google Maps Top 3"
    }
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
            className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
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
            <div className="text-6xl mb-4">📈</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Gig Not Found</h2>
            <p className="text-gray-500 mb-6">The SEO gig you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate("/SEO")}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
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

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
          
          {/* Back Button */}
          <motion.button
            variants={headerVariants}
            onClick={() => navigate("/SEO")}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-green-600 transition-all duration-200 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to All SEO Specialists</span>
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
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      {gig.level || "SEO Expert"}
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
                  className="p-3 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-green-600 transition-all"
                >
                  <FaShare />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Results Metrics Section */}
          <motion.div
            variants={sectionVariants}
            className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {resultsMetrics.map((metric, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/40 backdrop-blur-xl rounded-2xl p-4 text-center border border-white/50"
              >
                <div className={`text-2xl mb-2 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {metric.icon}
                </div>
                <div className="text-xl font-bold text-gray-800">{metric.value}</div>
                <div className="text-xs text-gray-500">{metric.label}</div>
              </motion.div>
            ))}
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
                    <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <FaChartLine className="text-white text-8xl opacity-50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* About Section */}
              <motion.div variants={sectionVariants} className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-white/50">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUserTie className="text-green-500" />
                  About the SEO Specialist
                </h2>
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold">
                    {gig.name?.charAt(0) || "S"}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{gig.name}</h3>
                    <p className="text-gray-500">SEO Consultant | {gig.level || "Expert"} Level</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {gig.about || "Certified SEO specialist with over 6 years of experience helping businesses rank higher on Google. I specialize in data-driven SEO strategies that deliver measurable results. From keyword research to technical SEO and link building, I provide comprehensive solutions that drive organic traffic and increase conversions."}
                </p>
              </motion.div>

              {/* SEO Skills Section */}
              <motion.div variants={sectionVariants} className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-white/50">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaChartLine className="text-green-500" />
                  SEO Expertise
                </h2>
                <div className="space-y-4">
                  {seoSkills.map((skill, idx) => (
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
                          className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Case Studies Section */}
              <motion.div variants={sectionVariants} className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-white/50">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaTrophy className="text-green-500" />
                  Success Stories
                </h2>
                <div className="space-y-4">
                  {caseStudies.map((study, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100"
                    >
                      <h4 className="font-semibold text-gray-800">{study.client}</h4>
                      <p className="text-sm text-green-600 mt-1">{study.result}</p>
                      <p className="text-xs text-gray-500 mt-1">{study.metric}</p>
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
                    <p className="text-gray-500 text-sm">per SEO project</p>
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
                              ? `border-green-500 bg-gradient-to-r ${pkg.color} bg-opacity-10 shadow-lg`
                              : "border-gray-200 bg-white/50 hover:border-green-300"
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
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <FaEnvelope />
                      Connect With Us
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
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
                        <p className="text-xs text-gray-500">Rank Guarantee</p>
                      </div>
                      <div>
                        <FaCalendarCheck className="text-gray-400 text-xl mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Regular Reports</p>
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold">
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
                    {idx === 0 && "My website traffic doubled in just 3 months! The SEO strategy was spot on. Highly recommended SEO expert!"}
                    {idx === 1 && "Professional and knowledgeable. Explained everything clearly and delivered amazing results. Will continue working with them!"}
                    {idx === 2 && "Best SEO service I've used. My business is now on the first page for multiple keywords. Great communication and reporting!"}
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

export default SingleSEOGig;