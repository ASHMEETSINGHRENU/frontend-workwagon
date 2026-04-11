import React from "react";
import { motion } from "framer-motion";
import { FaSignOutAlt, FaArrowRight, FaCheckCircle, FaLaptopCode, FaPaintBrush, FaChartLine, FaHandshake, FaLightbulb, FaRocket, FaUserCheck, FaGem, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom"; 
import Footer from '../components/Footer';
import Chatbot from './chatbot';
import websiteImg from "../photos/Websitegigs.png";
import logoImg from "../photos/LOGOgigs.png";
import seoImg from "../photos/SEOgigs.png";
import Navbar from "../components/Navbar";
import bannerImage from "../photos/banner-1.png";
import bannerImage5 from "../photos/banner-5.png";
import bannerImage6 from "../photos/banner-6.png";

// Animation variants for consistent fade-up effects
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
};

const cardHover = {
  rest: { scale: 1, y: 0, transition: { duration: 0.2 } },
  hover: { scale: 1.03, y: -8, transition: { duration: 0.3, type: "spring", stiffness: 300 } }
};

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const navigateToLogo = () => navigate("/logogigs");
  const navigateToWebsite = () => navigate("/website");
  const navigateToSEO = () => navigate("/SEO");

  // Service data array for cleaner mapping
  const services = [
    {
      id: 1,
      title: "Professional Website Development",
      shortTitle: "Website Development",
      icon: <FaLaptopCode className="text-4xl text-blue-500" />,
      description: "We build fast, responsive, and visually appealing websites that represent your brand and convert visitors into customers.",
      features: ["Fully responsive design (mobile-friendly)", "Modern UI/UX", "SEO-optimized structure", "Fast loading performance", "Custom features based on your needs"],
      cta: "Start Your Website Project",
      bgColor: "from-blue-50 to-indigo-50",
      iconBg: "bg-blue-100",
      navigate: navigateToWebsite,
      image: websiteImg
    },
    {
      id: 2,
      title: "Creative Logo & Branding",
      shortTitle: "Logo Design",
      icon: <FaPaintBrush className="text-4xl text-purple-500" />,
      description: "Your logo is the face of your brand. We design unique and memorable logos that leave a lasting impression.",
      features: ["Custom logo concepts", "High-resolution files (PNG, JPG, SVG)", "Brand-focused design approach", "Multiple revisions"],
      cta: "Get Your Logo Designed",
      bgColor: "from-purple-50 to-pink-50",
      iconBg: "bg-purple-100",
      navigate: navigateToLogo,
      image: logoImg
    },
    {
      id: 3,
      title: "Search Engine Optimization (SEO)",
      shortTitle: "SEO Services",
      icon: <FaChartLine className="text-4xl text-green-500" />,
      description: "Improve your website visibility and rank higher on search engines to attract more organic traffic.",
      features: ["Keyword research & strategy", "On-page SEO optimization", "Technical SEO improvements", "Performance tracking"],
      cta: "Boost Your Rankings",
      bgColor: "from-green-50 to-emerald-50",
      iconBg: "bg-green-100",
      navigate: navigateToSEO,
      image: seoImg
    }
  ];

  const processSteps = [
    { step: "01", title: "Consultation", icon: <FaHandshake className="text-3xl" />, desc: "We understand your requirements, goals, and expectations." },
    { step: "02", title: "Planning & Strategy", icon: <FaLightbulb className="text-3xl" />, desc: "We create a tailored plan for your project." },
    { step: "03", title: "Execution", icon: <FaRocket className="text-3xl" />, desc: "Our team designs and develops your solution." },
    { step: "04", title: "Review & Feedback", icon: <FaUserCheck className="text-3xl" />, desc: "You review the work and request changes if needed." },
    { step: "05", title: "Delivery & Support", icon: <FaGem className="text-3xl" />, desc: "Final delivery with ongoing support if required." }
  ];

  const portfolioItems = [
    { title: "E-Commerce Platform", category: "Website", image: bannerImage, bg: "from-blue-400 to-indigo-500"   },
    { title: "Modern Brand Identity", category: "Logo Design", image: bannerImage6, bg: "from-purple-400 to-pink-500" },
    { title: "SEO Growth Campaign", category: "SEO", image: bannerImage5, bg: "from-green-400 to-emerald-500"}
  ]

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 font-sans overflow-x-hidden">
      
      {/* Navbar with Glassmorphism */}
      <Navbar user={user} onLogout={handleLogout} />
      {/* Hero Section with Modern Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 md:py-28 px-4">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
          <motion.div 
            animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-300 rounded-full filter blur-3xl opacity-10" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6">
              🚀 Trusted by 500+ Businesses
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            Build Powerful Digital <br />
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Experiences with WorkWagon
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-100 mt-6 h-16"
          >
            <Typewriter
              words={[
                "We help businesses grow with modern websites",
                "Impactful logos that leave a lasting impression",
                "Result-driven SEO strategies for higher rankings",
                "Start your digital transformation today"
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-blue-100 max-w-2xl mx-auto mt-4"
          >
            Whether you're starting from scratch or scaling your business, WorkWagon delivers high-quality digital solutions designed to attract, engage, and convert your audience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-5 mt-10"
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/contact_me")}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Get Started <FaArrowRight className="inline ml-2" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/portfolio")}
              className="border-2 border-white/50 text-white px-8 py-3 rounded-full font-semibold backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              View Portfolio
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* About Section - Quick Intro */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="py-16 px-6 max-w-6xl mx-auto text-center"
      >
        <motion.div variants={fadeUp} className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
          Who We Are
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          About WorkWagon
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          WorkWagon is a freelance digital service platform focused on helping businesses establish and grow their online presence. 
          We specialize in website development, logo design, and search engine optimization (SEO), offering tailored solutions that align with your business goals.
          <br /><br />
          <span className="font-semibold text-gray-800">Our mission is simple — to provide reliable, high-quality digital services that drive real results.</span>
        </motion.p>
      </motion.section>

      {/* Services Section - Very Important */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold mb-4">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Our Premium Services</h2>
            <p className="text-gray-500 mt-2">Tailored solutions to elevate your brand</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className={`bg-gradient-to-br ${service.bgColor} rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group`}
                onClick={service.navigate}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className={`absolute bottom-4 left-4 ${service.iconBg} p-3 rounded-2xl shadow-lg`}>
                    {service.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{service.shortTitle}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <FaCheckCircle className="text-green-500 text-xs" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {service.features.length > 3 && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>+ {service.features.length - 3} more features</span>
                      </div>
                    )}
                  </div>
                  <motion.button 
                    whileHover={{ x: 5 }}
                    className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    {service.cta} <FaArrowRight className="text-sm" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-600 text-sm font-semibold mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">How WorkWagon Works</h2>
            <p className="text-gray-500 mt-2">From idea to launch in 5 simple steps</p>
          </motion.div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                    {step.step}
                  </div>
                  <div className="text-3xl text-blue-500 mb-3">{step.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-6 bg-gradient-to-r from-blue-50 to-indigo-50"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Choose WorkWagon</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                "✔ Professional & Reliable", 
                "💰 Affordable Pricing", 
                "⚡ Fast Turnaround", 
                "🤝 Client-Focused", 
                "🏆 High-Quality Results"
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center gap-2 bg-white rounded-full py-3 px-4 shadow-md"
                >
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="font-medium text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Portfolio Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-600 text-sm font-semibold mb-4">
              Our Creative Showcase
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Our Work</h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              Take a look at some of our recent projects across website development, logo design, and SEO optimization.
              <br />
              <span className="text-gray-400 text-sm">We focus on delivering results that make a real difference.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              >
                <img src={item.image} alt={item.title} className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <span className="text-white/80 text-sm">{item.category}</span>
                  <h3 className="text-white text-xl font-bold">{item.title}</h3>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <FaEye className="text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Feedback Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-yellow-100 text-yellow-600 text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Client Feedback</h2>
            <p className="text-gray-500 mt-2">What our clients say about us</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "Marketing Director", img: "https://randomuser.me/api/portraits/women/44.jpg", text: "Workwagon helped us find the perfect freelancer for our rebranding project. The platform made it so easy to connect with talented designers, and the results exceeded all our expectations!", rating: 5 },
              { name: "Michael Chen", role: "Startup Founder", img: "https://randomuser.me/api/portraits/men/32.jpg", text: "I was struggling to find reliable developers until I discovered Workwagon. Their platform connected me with a web developer who built our eCommerce site in record time.", rating: 5 },
              { name: "Emily Rodriguez", role: "Content Manager", img: "https://randomuser.me/api/portraits/women/68.jpg", text: "Workwagon saved us so much time and money! Their SEO content writers helped boost our organic traffic by 150% in just 3 months. Highly recommend!", rating: 5 }
            ].map((client, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img src={client.img} alt={client.name} className="w-14 h-14 rounded-full object-cover ring-4 ring-blue-100" />
                  <div>
                    <p className="font-bold text-gray-800">{client.name}</p>
                    <p className="text-sm text-gray-500">{client.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">"{client.text}"</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (<span key={i}>★</span>))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot and Footer */}
      <Chatbot />
      <Footer />
    </div>
  );
}

export default Home;