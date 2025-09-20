import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        
        {/* Name and Copyright */}
        <div>
          <h4 className="text-lg font-semibold">Ashmeet Singh Renu</h4>
          <p className="text-sm">&copy; {currentYear} All rights reserved.</p>
        </div>
        
        {/* Additional Links */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            to="/freelancer-login" 
            className="text-sm hover:text-gray-400 transition-colors"
          >
            Freelancer Login
          </Link>
          
          {/* Social Links */}
          <div className="flex space-x-6 text-xl">
            <a href="https://github.com/ASHMEETSINGHRENU" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/ashmeet-singh-renu-9a2a36275/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/ashmeetsingh022/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;