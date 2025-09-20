// src/pages/chatbot.js
import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: 'How we can help you today? Please choose an option:', 
      sender: 'bot',
      options: [
        '1. I want to work as a freelancer',
        '2. I need to hire a freelancer',
        '3. Learn about services',
        '4. Account/payment issues',
        '5. Other questions'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    let botResponse = [];
    
    if (lowerMessage.includes('1') || lowerMessage.includes('work') || lowerMessage.includes('start career')) {
      botResponse = [
        { text: 'Great! Here are ways we help freelancers:', sender: 'bot' },
        { text: '🚀 Create your profile and showcase your skills', sender: 'bot' },
        { text: '💼 Find clients and projects in your field', sender: 'bot' },
        { text: '💰 Get paid securely for your work', sender: 'bot' },
        { text: '📈 Grow your business with our tools', sender: 'bot' },
        { text: 'Get started: https://frontend-workwagon.vercel.app/freelancer-login', sender: 'bot', isLink: true }
      ];
    } 
    else if (lowerMessage.includes('2') || lowerMessage.includes('hire') || lowerMessage.includes('client')) {
      botResponse = [
        { text: 'We make hiring freelancers easy:', sender: 'bot' },
        { text: '🔍 Search from thousands of skilled professionals', sender: 'bot' },
        { text: '⭐ View portfolios and client reviews', sender: 'bot' },
        { text: '💬 Communicate directly with freelancers', sender: 'bot' },
        { text: '🔒 Safe payment system with money-back guarantee', sender: 'bot' },
        { text: 'Browse freelancers: https://frontend-workwagon.vercel.app/freelancer-login', sender: 'bot', isLink: true }
      ];
    }
    else if (lowerMessage.includes('3') || lowerMessage.includes('services') || lowerMessage.includes('gigs')) {
      botResponse = [
        { text: 'Our main service categories:', sender: 'bot' },
        { text: '🌐 Website Development & Design', sender: 'bot' },
        { text: '🎨 Logo & Branding Services', sender: 'bot' },
        { text: '🔍 SEO & Digital Marketing', sender: 'bot' },
        { text: 'See all services: https://frontend-workwagon.vercel.app/website', sender: 'bot', isLink: true }
      ];
    }




 else if (lowerMessage.includes('4') || lowerMessage.includes('account') || lowerMessage.includes('payment')) {
    botResponse = [
      { text: 'For account or payment assistance:', sender: 'bot' },
      { text: '📞 Call support: +1 (555) 123-4567', sender: 'bot' },
      { 
        text: '1. Complain and contact form:  https://frontend-workwagon.vercel.app/contact_me', 
        sender: 'bot', 
        isLink: true
      },
      { text: 'If you already filled the form, Don\'t worry, we will get back to you soon.', sender: 'bot' }
    ];
  }
  else {
      botResponse = [
        { text: 'For other questions, please:', sender: 'bot' },
        { text: '1. Check our FAQ: https://frontend-workwagon.vercel.app/contact_me', sender: 'bot', isLink: true },
        { text: '2. Contact our support team', sender: 'bot' },
        { text: '3. Fill out our contact form', sender: 'bot' },
        { text: 'We aim to respond within 1 business day', sender: 'bot' }
      ];
    }

    setTimeout(() => {
      setMessages(prev => [...prev, ...botResponse]);
    }, 500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    // Get bot response
    handleBotResponse(inputValue);

    setInputValue('');
  };

  const handleOptionSelect = (option) => {
    const userMessage = { text: option, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    handleBotResponse(option);
  };

  return React.createElement(
    'div',
    { className: 'fixed bottom-6 right-6 z-50' },
    isOpen 
      ? React.createElement(
          'div',
          { className: 'w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col border border-gray-200' },
          // Header
          React.createElement(
            'div',
            { className: 'bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center' },
            React.createElement(
              'h3',
              { className: 'font-semibold' },
              'Workwagon Chatbot'
            ),
            React.createElement(
              'button',
              { 
                onClick: toggleChat,
                className: 'text-white hover:text-gray-200'
              },
              '×'
            )
          ),
          // Messages
          React.createElement(
            'div',
            { className: 'flex-1 p-4 overflow-y-auto' },
            messages.map((message, index) => 
              React.createElement(
                'div',
                { 
                  key: index,
                  className: `mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`
                },
                React.createElement(
                  'div',
                  { 
                    className: `inline-block p-2 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-800'
                    }`
                  },
                  message.isLink
                    ? React.createElement(
                        'a',
                        { 
                          href: message.text.split(' ').pop(),
                          className: 'text-blue-600 underline',
                          target: '_blank',
                          rel: 'noopener noreferrer'
                        },
                        message.text
                      )
                    : message.text
                ),
                message.options && React.createElement(
                  'div',
                  { className: 'mt-2 space-y-1' },
                  message.options.map((option, i) =>
                    React.createElement(
                      'button',
                      {
                        key: i,
                        onClick: () => handleOptionSelect(option),
                        className: 'block w-full text-left p-2 bg-blue-100 rounded hover:bg-blue-200 text-blue-800'
                      },
                      option
                    )
                  )
                )
              )
            )
          ),
          // Input
          React.createElement(
            'form',
            { 
              onSubmit: handleSendMessage,
              className: 'border-t border-gray-200 p-3'
            },
            React.createElement(
              'div',
              { className: 'flex' },
              React.createElement(
                'input',
                {
                  type: 'text',
                  value: inputValue,
                  onChange: (e) => setInputValue(e.target.value),
                  placeholder: 'Type your message...',
                  className: 'flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                }
              ),
              React.createElement(
                'button',
                {
                  type: 'submit',
                  className: 'bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600'
                },
                'Send'
              )
            )
          )
        )
      : React.createElement(
          'button',
          {
            onClick: toggleChat,
            className: 'bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition'
          },
          React.createElement(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              className: 'h-6 w-6',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor'
            },
            React.createElement('path', {
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: 2,
              d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
            })
          )
        )
  );
};

export default Chatbot;