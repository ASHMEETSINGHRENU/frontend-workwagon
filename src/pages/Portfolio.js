// src/pages/Portfolio.js
import React, { useState } from 'react';
// useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaTimes, FaExternalLinkAlt, FaGithub, 
  FaHeart, FaEye, FaCode, FaPaintBrush, FaChartLine,
  FaLaptopCode, FaDatabase
} from 'react-icons/fa';


// FaServer ,  FaMobile
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from './chatbot';
const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Portfolio Projects Data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "website",
      subcategory: "E-commerce",
      client: "FashionHub",
      duration: "3 months",
      technologies: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "Stripe API"],
      description: "A fully functional e-commerce platform with product management, cart system, payment integration, and admin dashboard. Features include user authentication, order tracking, and real-time inventory management.",
      challenge: "The client needed a scalable platform that could handle high traffic during sales events while maintaining fast load times and seamless checkout experience.",
      solution: "Implemented server-side rendering, optimized database queries, and integrated CDN for images. Used Redis for caching frequently accessed data.",
      results: "50% faster page load time, 35% increase in conversion rate, successfully handled 10,000+ concurrent users during flash sales.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
      ],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: 2,
      title: "Modern Brand Identity",
      category: "logo",
      subcategory: "Branding",
      client: "EcoLife Solutions",
      duration: "2 weeks",
      technologies: ["Adobe Illustrator", "Photoshop", "Figma"],
      description: "Complete brand identity design including primary logo, secondary marks, color palette, typography, and brand guidelines. Created a modern, eco-friendly visual identity that resonates with the target audience.",
      challenge: "The brand wanted to convey sustainability while maintaining a professional, corporate appearance. Needed to stand out in the crowded green energy sector.",
      solution: "Developed a unique leaf-meets-tech icon concept, paired with earthy yet modern colors. Created versatile logo variations for different use cases.",
      results: "Brand recognition increased by 40%, successfully launched across 5 markets, received industry design award nomination.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1626785774623-cdff8e6f6d8e?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=500&fit=crop"
      ],
      liveUrl: "https://example.com",
      featured: true
    },
    {
      id: 3,
      title: "SEO Growth Campaign",
      category: "seo",
      subcategory: "SEO Optimization",
      client: "TechStart Solutions",
      duration: "6 months",
      technologies: ["Google Analytics", "SEMrush", "Ahrefs", "Search Console"],
      description: "Comprehensive SEO strategy including keyword research, on-page optimization, technical SEO, content strategy, and link building. Focused on improving organic visibility for competitive tech keywords.",
      challenge: "The client had a new website with zero organic traffic competing against established players in the tech space.",
      solution: "Created pillar-cluster content strategy, optimized site architecture, built high-quality backlinks through guest posting and digital PR.",
      results: "300% increase in organic traffic, ranked #1 for 15+ target keywords, 200% ROI within 6 months.",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
      ],
      liveUrl: "https://example.com",
      featured: true
    },
    {
      id: 4,
      title: "Restaurant Website",
      category: "website",
      subcategory: "Food & Beverage",
      client: "Spice Garden",
      duration: "1.5 months",
      technologies: ["React.js", "Tailwind CSS", "Node.js", "MongoDB"],
      description: "Modern restaurant website with online ordering system, reservation management, menu showcase, and customer reviews integration.",
      challenge: "The restaurant needed an intuitive system for managing online orders and table reservations simultaneously.",
      solution: "Built a unified dashboard for restaurant staff to manage both orders and reservations in real-time.",
      results: "Online orders increased by 150%, reservation management time reduced by 60%.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop"
      ],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false
    },
    {
      id: 5,
      title: "Minimalist Tech Logo",
      category: "logo",
      subcategory: "Technology",
      client: "NexGen AI",
      duration: "2 weeks",
      technologies: ["Adobe Illustrator", "Figma"],
      description: "Sleek, modern logo for an AI startup. The design represents innovation, intelligence, and forward-thinking technology.",
      challenge: "Create a logo that feels both technological and approachable, suitable for B2B and B2C audiences.",
      solution: "Designed an abstract mark combining neural network patterns with human-centered curves.",
      results: "Selected as finalist for Design Awards 2024, received positive feedback from 95% of survey respondents.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1626785774623-cdff8e6f6d8e?w=800&h=500&fit=crop"
      ],
      liveUrl: "https://example.com",
      featured: false
    },
    {
      id: 6,
      title: "Local Business SEO",
      category: "seo",
      subcategory: "Local SEO",
      client: "Downtown Dental",
      duration: "4 months",
      technologies: ["Google My Business", "Local Citation Building", "Review Management"],
      description: "Local SEO strategy focused on improving visibility for dental services in specific geographic areas.",
      challenge: "Competitive local market with many established dental practices dominating search results.",
      solution: "Optimized Google My Business profile, built local citations, implemented review generation strategy.",
      results: "#1 ranking for 20+ local keywords, 400% increase in appointment requests, 85% growth in map pack appearances.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/ps://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop"
      ],
      liveUrl: "https://example.com",
      featured: false
    }
  ];

  // Filter projects based on category and search term
  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Featured projects
  const featuredProjects = projects.filter(p => p.featured);

  // Category counts
  const categoryCounts = {
    all: projects.length,
    website: projects.filter(p => p.category === 'website').length,
    logo: projects.filter(p => p.category === 'logo').length,
    seo: projects.filter(p => p.category === 'seo').length
  };

  // Open modal with project details
  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, type: "spring", stiffness: 300 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'website': return <FaLaptopCode />;
      case 'logo': return <FaPaintBrush />;
      case 'seo': return <FaChartLine />;
      default: return <FaCode />;
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    switch(category) {
      case 'website': return 'from-blue-500 to-cyan-500';
      case 'logo': return 'from-purple-500 to-pink-500';
      case 'seo': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 md:py-28">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
          <motion.div
            animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-semibold mb-4">
              Our Creative Showcase
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Portfolio</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Explore our collection of stunning websites, creative logos, and successful SEO campaigns that have helped businesses grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-white/50 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "50+", label: "Projects Completed", icon: <FaCode className="text-2xl" /> },
              { number: "30+", label: "Happy Clients", icon: <FaHeart className="text-2xl" /> },
              { number: "4.9", label: "Average Rating", icon: <FaEye className="text-2xl" /> },
              { number: "5+", label: "Years Experience", icon: <FaDatabase className="text-2xl" /> }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-4"
              >
                <div className="text-3xl text-blue-600 mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800">{stat.number}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="sticky top-0 z-20 py-6 px-6 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { id: 'all', label: 'All Projects', icon: null },
                { id: 'website', label: 'Websites', icon: <FaLaptopCode className="text-sm" /> },
                { id: 'logo', label: 'Logos', icon: <FaPaintBrush className="text-sm" /> },
                { id: 'seo', label: 'SEO', icon: <FaChartLine className="text-sm" /> }
              ].map((filterOption) => (
                <motion.button
                  key={filterOption.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(filterOption.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    filter === filterOption.id
                      ? `bg-gradient-to-r ${getCategoryColor(filterOption.id)} text-white shadow-md`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filterOption.icon}
                  {filterOption.label}
                  <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                    filter === filterOption.id ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    {categoryCounts[filterOption.id]}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
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
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {filter === 'all' && searchTerm === '' && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Featured Projects</h2>
              <p className="text-gray-500">Our most outstanding work that showcases our expertise</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => openModal(project)}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(project.category)}`}>
                          {project.category.toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                          <FaEye className="text-gray-800 text-xl" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-800 mb-1">{project.title}</h3>
                      <p className="text-gray-500 text-sm">{project.client}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects Grid */}
      <section className="py-16 px-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No projects found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  onClick={() => openModal(project)}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
<span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(project.category)}`}>
  {getCategoryIcon(project.category)}
  {project.category.toUpperCase()}
</span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg">{project.title}</h3>
                        <p className="text-white/80 text-sm">{project.client}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 px-6 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Let's create something amazing together. Get in touch with us today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Start a Project
              </motion.button>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all"
                >
                  View Services
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section> */}


      {/* Project Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors flex items-center justify-center"
              >
                <FaTimes />
              </button>

              {/* Modal Content */}
              <div>
                {/* Hero Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(selectedProject.category)}`}>
                      {selectedProject.category.toUpperCase()}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">{selectedProject.title}</h2>
                    <p className="text-white/80">{selectedProject.client}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-gray-400 text-sm mb-1">Duration</div>
                      <div className="font-semibold text-gray-800">{selectedProject.duration}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-gray-400 text-sm mb-1">Category</div>
                      <div className="font-semibold text-gray-800 capitalize">{selectedProject.subcategory}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-gray-400 text-sm mb-1">Technologies</div>
                      <div className="font-semibold text-gray-800">{selectedProject.technologies.length}+ tools</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Project Overview</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-orange-50 p-5 rounded-xl">
                      <h4 className="font-semibold text-orange-800 mb-2">Challenge</h4>
                      <p className="text-gray-600 text-sm">{selectedProject.challenge}</p>
                    </div>
                    <div className="bg-green-50 p-5 rounded-xl">
                      <h4 className="font-semibold text-green-800 mb-2">Solution</h4>
                      <p className="text-gray-600 text-sm">{selectedProject.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-blue-50 p-5 rounded-xl mb-6">
                    <h4 className="font-semibold text-blue-800 mb-2">Results & Impact</h4>
                    <p className="text-gray-600 text-sm">{selectedProject.results}</p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4 border-t border-gray-200">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      View Live Project <FaExternalLinkAlt className="inline ml-2 text-sm" />
                    </motion.a>
                    {selectedProject.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                      >
                        <FaGithub className="inline mr-2" /> Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
              

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Chatbot />
       <Footer />
    </div>
  );
};

export default Portfolio;