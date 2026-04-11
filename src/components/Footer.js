import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaHeart, FaArrowUp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, type: "spring", stiffness: 200 } }
  };

  const floatingAnimation = {
    y: [0, -5, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  };

  // Navigation links with correct paths
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" }
  ];

  // Service links with correct paths
  const serviceLinks = [
    { name: "Website Development", path: "/website" },
    { name: "Logo Design", path: "/logogigs" },
    { name: "SEO Optimization", path: "/SEO" },
    { name: "Digital Marketing", path: "/marketing" },
    { name: "Brand Identity", path: "/branding" }
  ];

  return (
    <footer ref={footerRef} className="relative mt-20 overflow-hidden">
      {/* Animated Background with Blur Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 100, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"
        />
      </div>

      {/* Glassmorphism Overlay */}
      <div className="relative backdrop-blur-md bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
          
          {/* Main Footer Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12"
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.h2 
                whileHover={{ scale: 1.05 }}
                className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              >
                WorkWagon
              </motion.h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Empowering businesses with modern digital solutions. We create websites, logos, and SEO strategies that drive real results.
              </p>
              <motion.div 
                variants={socialVariants}
                className="flex space-x-4 pt-2"
              >
                {[
                  { icon: FaGithub, link: "https://github.com/ASHMEETSINGHRENU", label: "GitHub" },
                  { icon: FaLinkedin, link: "https://www.linkedin.com/in/ashmeet-singh-renu-9a2a36275/", label: "LinkedIn" },
                  { icon: FaInstagram, link: "https://www.instagram.com/ashmeetsingh022/?hl=en", label: "Instagram" },
                  { icon: FaTwitter, link: "https://twitter.com", label: "Twitter" }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="text-lg group-hover:scale-110 transition-transform" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.h3 
                whileHover={{ x: 5 }}
                className="text-lg font-semibold text-white relative inline-block"
              >
                Quick Links
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                />
              </motion.h3>
              <ul className="space-y-2">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ x: 5 }}
                    custom={idx}
                  >
                    <Link 
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-blue-400 transition-colors" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.h3 
                whileHover={{ x: 5 }}
                className="text-lg font-semibold text-white relative inline-block"
              >
                Our Services
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                />
              </motion.h3>
              <ul className="space-y-2">
                {serviceLinks.map((service, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ x: 5 }}
                  >
                    <Link 
                      to={service.path}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-purple-400 transition-colors" />
                      {service.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.h3 
                whileHover={{ x: 5 }}
                className="text-lg font-semibold text-white relative inline-block"
              >
                Get In Touch
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-400 to-orange-400"
                />
              </motion.h3>
              <div className="space-y-3">
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="mailto:ashmeetsinghrenu@gmail.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm group"
                >
                  <FaEnvelope className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                  <span>ashmeetsinghrenu@gmail.com</span>
                </motion.a>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm group"
                >
                  <FaPhone className="text-gray-500 group-hover:text-green-400 transition-colors" />
                  <span>+91 98765 43210</span>
                </motion.a>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 text-gray-400 text-sm group"
                >
                  <FaMapMarkerAlt className="text-gray-500 group-hover:text-red-400 transition-colors mt-0.5" />
                  <span>India</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="my-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} WorkWagon. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1 flex items-center justify-center sm:justify-start gap-1">
                Made with <FaHeart className="text-red-400 animate-pulse text-xs" /> by Ashmeet Singh Renu
              </p>
            </div>

            <div className="flex items-center gap-6">
              <Link 
                to="/freelancer-login"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200 relative group"
              >
                <span className="relative z-10">Freelancer Login</span>
                <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
              
              {/* Back to Top Button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={floatingAnimation}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
                aria-label="Back to top"
              >
                <FaArrowUp className="text-sm group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-8 pt-6 border-t border-white/5"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                Subscribe to our newsletter for updates and offers
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg transition-all"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;