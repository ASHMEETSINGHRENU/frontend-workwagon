// client/src/pages/PaymentGateway.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';

const PaymentGateway = () => {
  const navigate = useNavigate();
  
  // State for selected service type
  const [selectedService, setSelectedService] = useState('website');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  // Payment form state
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  // Service configurations
  const services = {
    website: {
      name: 'Website Development',
      icon: '🌐',
      packages: [
        {
          id: 'basic-website',
          name: 'Basic Website Package',
          description: 'Perfect for startups and small businesses',
          price: 499,
          deliveryDays: '7-10 Days',
          features: [
            '5 Pages Website',
            'Responsive Design',
            'Contact Form',
            'Basic SEO Setup',
            'Social Media Integration',
            '1 Month Support'
          ]
        },
        {
          id: 'standard-website',
          name: 'Standard Website Package',
          description: 'Ideal for growing brands',
          price: 999,
          deliveryDays: '14-21 Days',
          features: [
            '10 Pages Website',
            'Responsive Design',
            'E-commerce Ready',
            'Advanced SEO',
            'Blog Integration',
            '3 Months Support',
            'Analytics Setup'
          ]
        },
        {
          id: 'premium-website',
          name: 'Premium Website Package',
          description: 'Complete web solution',
          price: 1999,
          deliveryDays: '21-30 Days',
          features: [
            'Unlimited Pages',
            'Custom Web Application',
            'E-commerce Full Setup',
            'Premium SEO Package',
            'CMS Integration',
            '12 Months Support',
            'Training & Documentation',
            'Speed Optimization'
          ]
        }
      ]
    },
    logo: {
      name: 'Logo Design',
      icon: '🎨',
      packages: [
        {
          id: 'basic-logo',
          name: 'Basic Logo Package',
          description: 'Perfect for startups and small businesses',
          price: 99,
          deliveryDays: '3-5 Days',
          features: [
            '1 Unique Logo Concept',
            'High Resolution Files',
            'Source File Included',
            '3 Revisions',
            'PNG & JPG Formats'
          ]
        },
        {
          id: 'standard-logo',
          name: 'Standard Logo Package',
          description: 'Ideal for growing brands',
          price: 249,
          deliveryDays: '7-10 Days',
          features: [
            '3 Unique Logo Concepts',
            'High Resolution Files',
            'Source File Included',
            'Unlimited Revisions',
            'All Format Exports',
            'Business Card Design'
          ]
        },
        {
          id: 'premium-logo',
          name: 'Premium Logo Package',
          description: 'Complete branding solution',
          price: 499,
          deliveryDays: '14-21 Days',
          features: [
            '5+ Unique Logo Concepts',
            'Complete Brand Identity',
            'Source Files Included',
            'Unlimited Revisions',
            'All Format Exports',
            'Brand Guidelines',
            'Social Media Kit',
            'Stationery Design'
          ]
        }
      ]
    },
    seo: {
      name: 'SEO Services',
      icon: '📈',
      packages: [
        {
          id: 'basic-seo',
          name: 'Basic SEO Package',
          description: 'Perfect for small businesses starting out',
          price: 299,
          deliveryDays: '7-14 Days',
          popular: false,
          features: [
            'Keyword Research (50 Keywords)',
            'On-Page SEO Optimization',
            'Meta Tags Optimization',
            'Google Analytics Setup',
            'Monthly Report',
            'Email Support'
          ]
        },
        {
          id: 'standard-seo',
          name: 'Standard SEO Package',
          description: 'Ideal for growing businesses',
          price: 599,
          deliveryDays: '14-21 Days',
          popular: true,
          features: [
            'Keyword Research (150 Keywords)',
            'Complete On-Page SEO',
            'Technical SEO Audit',
            'Content Optimization',
            'Google Analytics & GTM Setup',
            'Local SEO Optimization',
            'Backlink Analysis',
            'Weekly Reports'
          ]
        },
        {
          id: 'premium-seo',
          name: 'Premium SEO Package',
          description: 'Complete enterprise solution',
          price: 1199,
          deliveryDays: '30-45 Days',
          popular: false,
          features: [
            'Keyword Research (500+ Keywords)',
            'Advanced On-Page SEO',
            'Technical SEO Audit & Fixes',
            'Content Strategy',
            'Advanced Analytics Setup',
            'National/International SEO',
            'Competitor Analysis',
            'Monthly Strategy Calls',
            'Daily Monitoring',
            'Priority Support'
          ]
        }
      ]
    }
  };

  // Format card number
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (paymentError) setPaymentError('');

    switch (name) {
      case 'cardNumber':
        processedValue = formatCardNumber(value);
        if (processedValue.replace(/\s/g, '').length > 16) return;
        break;
      case 'expiryMonth':
        if (value.length > 2) return;
        processedValue = value.replace(/[^0-9]/g, '');
        break;
      case 'expiryYear':
        if (value.length > 2) return;
        processedValue = value.replace(/[^0-9]/g, '');
        break;
      case 'cvv':
        if (value.length > 4) return;
        processedValue = value.replace(/[^0-9]/g, '');
        break;
      case 'cardHolder':
        processedValue = value.replace(/[^a-zA-Z\s]/g, '');
        break;
      default:
        break;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  // Validate form
  const validateForm = () => {
    const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
    if (cardNumberClean.length !== 16) {
      setPaymentError('Please enter a valid 16-digit card number');
      return false;
    }
    if (!formData.cardHolder.trim()) {
      setPaymentError('Please enter the cardholder name');
      return false;
    }
    if (!formData.expiryMonth || formData.expiryMonth < 1 || formData.expiryMonth > 12) {
      setPaymentError('Please enter a valid expiry month (01-12)');
      return false;
    }
    if (!formData.expiryYear || formData.expiryYear.length !== 2) {
      setPaymentError('Please enter a valid expiry year (2 digits)');
      return false;
    }
    if (!formData.cvv || formData.cvv.length < 3) {
      setPaymentError('Please enter a valid CVV code');
      return false;
    }
    return true;
  };

  // Handle package selection
  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setShowPaymentForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    setPaymentError('');

    // Simulate payment processing
    setTimeout(() => {
      const isSuccessful = Math.random() < 0.95;
      
      if (isSuccessful) {
        setPaymentSuccess(true);
        // Redirect to home page after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setPaymentError('Payment failed. Please check your card details or try again.');
        setIsProcessing(false);
      }
    }, 2000);
  };

  // Cancel payment
  const handleCancel = () => {
    setShowPaymentForm(false);
    setSelectedPackage(null);
    setPaymentError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Success state
  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for purchasing {selectedPackage?.name}
          </p>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-green-500 h-2 rounded-full animate-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
        <Navbar />
      {/* Animated Background Blur Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Choose Your Service
          </h1>
          <p className="text-gray-600 text-lg">Select the perfect package for your business needs</p>
        </div>

        {/* Service Selection Tabs */}
        <div className="flex justify-center gap-4 mb-12 animate-fade-in-up">
          {Object.entries(services).map(([key, service]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedService(key);
                setShowPaymentForm(false);
                setSelectedPackage(null);
              }}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedService === key
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              <span className="mr-2 text-xl">{service.icon}</span>
              {service.name}
            </button>
          ))}
        </div>

        {/* Payment Form Overlay */}
        {showPaymentForm && selectedPackage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Complete Payment</h3>
                <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600">Selected Package</p>
                  <p className="font-bold text-gray-900">{selectedPackage.name}</p>
                  <p className="text-2xl font-bold text-indigo-600 mt-2">${selectedPackage.price}</p>
                </div>

                <form onSubmit={handlePayment}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardHolder"
                      value={formData.cardHolder}
                      onChange={handleInputChange}
                      placeholder="JOHN DOE"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 uppercase"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="expiryMonth"
                          value={formData.expiryMonth}
                          onChange={handleInputChange}
                          placeholder="MM"
                          className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-center"
                          maxLength="2"
                          required
                        />
                        <span className="self-center">/</span>
                        <input
                          type="text"
                          name="expiryYear"
                          value={formData.expiryYear}
                          onChange={handleInputChange}
                          placeholder="YY"
                          className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-center"
                          maxLength="2"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>
                  
                  {paymentError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                      <p className="text-red-600 text-sm">{paymentError}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : `Pay $${selectedPackage.price}`}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services[selectedService].packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up ${
                pkg.popular ? 'ring-2 ring-indigo-500' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {pkg.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                  <span className="text-gray-500 ml-2">/ package</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{pkg.deliveryDays}</span>
                </div>
                
                <button
                  onClick={() => handlePackageSelect(pkg)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Select Package
                </button>
              </div>
              
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/5 group-hover:to-purple-600/5 transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center animate-fade-in-up">
          <div className="flex justify-center gap-8 items-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" className="h-8 opacity-50" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-8 opacity-50" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-8 opacity-50" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/2560px-American_Express_logo_%282018%29.svg.png" alt="American Express" className="h-8 opacity-50" />
          </div>
          <p className="text-gray-500 text-sm mt-6">
            🔒 Secure payment powered by WorkWagon • 100% money-back guarantee
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        
        .animate-progress {
          animation: progress 2s linear forwards;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default PaymentGateway;