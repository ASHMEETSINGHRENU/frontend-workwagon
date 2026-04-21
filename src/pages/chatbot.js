// src/pages/chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaComments, FaTimes, FaPaperPlane, FaRobot, 
  FaLaptopCode, FaPaintBrush, FaChartLine, FaBriefcase, 
  FaUserTie, FaArrowRight, FaClock, FaCheckCircle,
  FaStar, FaShieldAlt, FaRocket, FaHeart
} from 'react-icons/fa';

const Chatbot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "👋 Hi there! I'm WorkWagon's AI assistant. How can I help you today?",
          sender: 'bot',
          timestamp: new Date(),
          quickReplies: [
            { text: "💼 Hire a Freelancer", action: "hire", icon: <FaUserTie /> },
            { text: "🚀 Work as Freelancer", action: "work", icon: <FaRocket /> },
            { text: "🎨 Our Services", action: "services", icon: <FaStar /> },
            { text: "📂 View Portfolio", action: "portfolio", icon: <FaBriefcase /> }
          ]
        }
      ]);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 1) {
      scrollToBottom();
    }
  };

  const handleQuickReply = (action) => {
    const userMessage = {
      id: Date.now(),
      text: action === "hire" ? "I need to hire a freelancer" :
             action === "work" ? "I want to work as a freelancer" :
             action === "services" ? "Tell me about your services" :
             "Show me your portfolio",
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setShowQuickReplies(false);
    
    setTimeout(() => {
      handleBotResponse(action);
    }, 500);
  };

  const handleBotResponse = async (action) => {
    setIsTyping(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));

    let botResponses = [];

    switch(action) {
      case "hire":
        botResponses = [
          {
            id: Date.now(),
            text: "🎯 Great! We have talented freelancers ready to help you. Here's what you can do:",
            sender: 'bot',
            timestamp: new Date()
          },
          {
            id: Date.now() + 1,
            text: "Browse our categories:",
            sender: 'bot',
            timestamp: new Date(),
            serviceCards: [
              { name: "Website Development", icon: <FaLaptopCode />, path: "/website", color: "from-blue-500 to-cyan-500", desc: "Custom websites & web apps" },
              { name: "Logo Design", icon: <FaPaintBrush />, path: "/logogigs", color: "from-purple-500 to-pink-500", desc: "Unique brand identity" },
              { name: "SEO Services", icon: <FaChartLine />, path: "/SEO", color: "from-green-500 to-emerald-500", desc: "Rank higher on Google" }
            ]
          },
          {
            id: Date.now() + 2,
            text: "Would you like me to take you to our services page?",
            sender: 'bot',
            timestamp: new Date(),
            actionButtons: [
              { text: "View All Services", action: "view_services", path: "/website" },
              { text: "Contact Support", action: "contact", path: "/contact_me" }
            ]
          }
        ];
        break;

      case "work":
        botResponses = [
          {
            id: Date.now(),
            text: "🚀 Exciting! Join our freelancer community and start earning:",
            sender: 'bot',
            timestamp: new Date()
          },
          {
            id: Date.now() + 1,
            text: "Benefits of working with WorkWagon:",
            sender: 'bot',
            timestamp: new Date(),
            benefits: [
              { icon: <FaShieldAlt />, text: "Secure payments" },
              { icon: <FaClock />, text: "Flexible hours" },
              { icon: <FaCheckCircle />, text: "Global clients" },
              { icon: <FaHeart />, text: "Growth opportunities" }
            ]
          },
          {
            id: Date.now() + 2,
            text: "Ready to get started as a freelancer?",
            sender: 'bot',
            timestamp: new Date(),
            actionButtons: [
              { text: "Join as Freelancer", action: "freelancer_register", path: "/freelancer-login" },
              { text: "Learn More", action: "learn_more", path: "/contact_me" }
            ]
          }
        ];
        break;

      case "services":
        botResponses = [
          {
            id: Date.now(),
            text: "🎨 Here are our core services at WorkWagon:",
            sender: 'bot',
            timestamp: new Date()
          },
          {
            id: Date.now() + 1,
            text: "We specialize in three main areas:",
            sender: 'bot',
            timestamp: new Date(),
            serviceCards: [
              { name: "Website Development", icon: <FaLaptopCode />, path: "/website", color: "from-blue-500 to-cyan-500", desc: "Modern, responsive websites" },
              { name: "Logo Design", icon: <FaPaintBrush />, path: "/logogigs", color: "from-purple-500 to-pink-500", desc: "Memorable brand identity" },
              { name: "SEO Services", icon: <FaChartLine />, path: "/SEO", color: "from-green-500 to-emerald-500", desc: "Drive organic traffic" }
            ]
          },
          {
            id: Date.now() + 2,
            text: "Each service comes with professional support and quality guarantee.",
            sender: 'bot',
            timestamp: new Date(),
            actionButtons: [
              { text: "Explore Services", action: "view_services", path: "/website" },
              { text: "Contact Sales", action: "contact", path: "/contact_me" }
            ]
          }
        ];
        break;

      case "portfolio":
        botResponses = [
          {
            id: Date.now(),
            text: "🏆 Check out some of our amazing work:",
            sender: 'bot',
            timestamp: new Date()
          },
          {
            id: Date.now() + 1,
            text: "We've helped 500+ businesses grow online:",
            sender: 'bot',
            timestamp: new Date(),
            stats: [
              { value: "500+", label: "Projects Completed", icon: <FaCheckCircle /> },
              { value: "98%", label: "Client Satisfaction", icon: <FaStar /> },
              { value: "50+", label: "Expert Freelancers", icon: <FaUserTie /> }
            ]
          },
          {
            id: Date.now() + 2,
            text: "Want to see our latest projects?",
            sender: 'bot',
            timestamp: new Date(),
            actionButtons: [
              { text: "View Portfolio", action: "view_portfolio", path: "/portfolio" },
              { text: "Start a Project", action: "start_project", path: "/contact_me" }
            ]
          }
        ];
        break;

      case "view_services":
        navigate("/website");
        botResponses = [
          {
            id: Date.now(),
            text: "Redirecting you to our services page... 🚀",
            sender: 'bot',
            timestamp: new Date()
          }
        ];
        break;

      case "freelancer_register":
        navigate("/freelancer-login");
        botResponses = [
          {
            id: Date.now(),
            text: "Taking you to the freelancer registration page! 🎉",
            sender: 'bot',
            timestamp: new Date()
          }
        ];
        break;

      case "view_portfolio":
        navigate("/portfolio");
        botResponses = [
          {
            id: Date.now(),
            text: "Exploring our portfolio... ✨",
            sender: 'bot',
            timestamp: new Date()
          }
        ];
        break;

      case "contact":
        navigate("/contact_me");
        botResponses = [
          {
            id: Date.now(),
            text: "Connecting you with our support team... 💬",
            sender: 'bot',
            timestamp: new Date()
          }
        ];
        break;

      default:
        botResponses = [
          {
            id: Date.now(),
            text: "I'm here to help! You can ask me about:",
            sender: 'bot',
            timestamp: new Date(),
            quickReplies: [
              { text: "💼 Hiring freelancers", action: "hire" },
              { text: "🚀 Becoming a freelancer", action: "work" },
              { text: "🎨 Our services", action: "services" },
              { text: "📂 Portfolio", action: "portfolio" }
            ]
          }
        ];
    }

    setIsTyping(false);
    setMessages(prev => [...prev, ...botResponses]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setShowQuickReplies(false);

    const lowerInput = inputValue.toLowerCase();
    let action = "default";
    
    if (lowerInput.includes('hire') || lowerInput.includes('freelancer') || lowerInput.includes('client')) {
      action = "hire";
    } else if (lowerInput.includes('work') || lowerInput.includes('job') || lowerInput.includes('career')) {
      action = "work";
    } else if (lowerInput.includes('service') || lowerInput.includes('website') || lowerInput.includes('logo') || lowerInput.includes('seo')) {
      action = "services";
    } else if (lowerInput.includes('portfolio') || lowerInput.includes('project') || lowerInput.includes('work')) {
      action = "portfolio";
    }

    setInputValue('');
    setTimeout(() => handleBotResponse(action), 500);
  };

  const handleActionButton = (path) => {
    navigate(path);
    const responseMessage = {
      id: Date.now(),
      text: "Redirecting you now... 🚀",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, responseMessage]);
  };

  // Animation variants
  const chatVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, type: "spring", stiffness: 300 } },
    exit: { opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.2 } }
  };

  const messageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  const typingVariants = {
    animate: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const dotVariants = {
    animate: {
      y: [0, -8, 0],
      transition: { duration: 0.6, repeat: Infinity }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-[400px] h-[600px] bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FaRobot className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">WorkWagon Assistant</h3>
                    <p className="text-xs text-blue-100">Online • Ready to help</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleChat}
                  className="text-white hover:text-gray-200 transition"
                >
                  <FaTimes size={20} />
                </motion.button>
              </div>
            </motion.div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id || index}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    {message.sender === 'bot' && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <FaRobot className="text-white text-xs" />
                        </div>
                        <span className="text-xs text-gray-500">Assistant</span>
                      </div>
                    )}
                    
                    <div className={`rounded-2xl p-3 ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'bg-white border border-gray-200 shadow-sm'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>

                    {/* Service Cards */}
                    {message.serviceCards && (
                      <div className="mt-3 space-y-2">
                        {message.serviceCards.map((service, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleActionButton(service.path)}
                            className={`w-full p-3 rounded-xl bg-gradient-to-r ${service.color} text-white shadow-lg hover:shadow-xl transition-all`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{service.icon}</div>
                              <div className="text-left flex-1">
                                <div className="font-semibold">{service.name}</div>
                                <div className="text-xs opacity-90">{service.desc}</div>
                              </div>
                              <FaArrowRight className="text-sm" />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {/* Benefits */}
                    {message.benefits && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {message.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
                            <span className="text-green-500">{benefit.icon}</span>
                            <span>{benefit.text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    {message.stats && (
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {message.stats.map((stat, idx) => (
                          <div key={idx} className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="text-green-600 text-lg">{stat.icon}</div>
                            <div className="font-bold text-gray-800">{stat.value}</div>
                            <div className="text-xs text-gray-500">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    {message.actionButtons && (
                      <div className="mt-3 flex gap-2">
                        {message.actionButtons.map((btn, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleActionButton(btn.path)}
                            className="flex-1 px-3 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
                          >
                            {btn.text}
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {/* Quick Replies */}
                    {message.quickReplies && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.quickReplies.map((reply, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickReply(reply.action)}
                            className="px-3 py-1.5 text-sm rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transition"
                          >
                            {reply.text}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  variants={typingVariants}
                  initial="animate"
                  animate="animate"
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          variants={dotVariants}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSendMessage}
              className="border-t border-gray-200 p-4 bg-white"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center hover:shadow-lg transition"
                >
                  <FaPaperPlane size={16} />
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleChat}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative">
              <FaComments size={24} />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;