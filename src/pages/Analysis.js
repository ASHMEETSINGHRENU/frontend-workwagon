import React, { useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analysis = () => {
  const [activeTab, setActiveTab] = useState('website');

  // Sample data for analysis
  const gigData = {
    website: {
      labels: ['Basic Website', 'E-commerce', 'WordPress', 'Custom Web App', 'Landing Page'],
      completed: [45, 32, 28, 15, 52],
      revenue: [2250, 4800, 1960, 3750, 2600],
      ratings: [4.2, 4.5, 4.1, 4.7, 4.3],
      popularTags: ['React', 'WordPress', 'Shopify', 'HTML/CSS', 'JavaScript']
    },
    logo: {
      labels: ['Minimal Logo', '3D Logo', 'Mascot', 'Vintage', 'Typography'],
      completed: [68, 42, 35, 27, 53],
      revenue: [2040, 2940, 2800, 1890, 2650],
      ratings: [4.4, 4.3, 4.6, 4.2, 4.5],
      popularTags: ['Illustrator', 'Photoshop', 'Minimal', 'Brand Identity', 'Vector']
    },
    seo: {
      labels: ['On-Page SEO', 'Technical SEO', 'Local SEO', 'E-commerce SEO', 'Backlink Building'],
      completed: [38, 29, 42, 31, 27],
      revenue: [2660, 2175, 2940, 3720, 2295],
      ratings: [4.6, 4.4, 4.7, 4.5, 4.3],
      popularTags: ['Keywords', 'Google Analytics', 'Ranking', 'Backlinks', 'Optimization']
    }
  };

  const currentData = gigData[activeTab];

  // Chart data configurations
  const completionChartData = {
    labels: currentData.labels,
    datasets: [{
      label: 'Completed Gigs',
      data: currentData.completed,
      backgroundColor: '#4F46E5',
      borderColor: '#4F46E5',
      borderWidth: 1,
    }],
  };

  const revenueChartData = {
    labels: currentData.labels,
    datasets: [{
      label: 'Revenue ($)',
      data: currentData.revenue,
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderWidth: 2,
      tension: 0.3,
      fill: true,
    }],
  };

  const ratingsChartData = {
    labels: currentData.labels,
    datasets: [{
      data: currentData.ratings,
      backgroundColor: [
        '#EC4899',
        '#8B5CF6',
        '#3B82F6',
        '#10B981',
        '#F59E0B',
      ],
      borderWidth: 1,
    }],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Workwagn Performance Analysis
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Insights and metrics for your freelancing services
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setActiveTab('website')}
              className={`px-6 py-3 text-sm font-medium rounded-l-lg ${
                activeTab === 'website'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Website Gigs
            </button>
            <button
              onClick={() => setActiveTab('logo')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'logo'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Logo Gigs
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-6 py-3 text-sm font-medium rounded-r-lg ${
                activeTab === 'seo'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              SEO Gigs
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-3">
          {/* Completed Gigs Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Completed</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {currentData.completed.reduce((a, b) => a + b, 0)}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      ${currentData.revenue.reduce((a, b) => a + b, 0)}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Ratings Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">Average Rating</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {(currentData.ratings.reduce((a, b) => a + b, 0) / currentData.ratings.length).toFixed(1)}/5
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-12">
          {/* Completion Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Gigs Completed</h3>
            <div className="h-80">
              <Bar 
                data={completionChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
                }}
              />
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue by Gig Type</h3>
            <div className="h-80">
              <Line 
                data={revenueChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { y: { beginAtZero: true } }
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Ratings Chart */}
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-1">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ratings Distribution</h3>
            <div className="h-64">
              <Pie 
                data={ratingsChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'right' } }
                }}
              />
            </div>
          </div>

          {/* Popular Tags and Insights */}
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Popular Tags for {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Gigs
            </h3>
            <div className="flex flex-wrap gap-3">
              {currentData.popularTags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {tag}
                </span>
              ))}
            </div>

            {/* Insights */}
            <div className="mt-8">
              <h4 className="text-md font-medium text-gray-900 mb-2">Key Insights</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {activeTab === 'website' && (
                  <>
                    <li>Landing Page gigs have the highest completion rate</li>
                    <li>E-commerce websites generate the most revenue per gig</li>
                    <li>Custom Web Apps receive the highest ratings</li>
                  </>
                )}
                {activeTab === 'logo' && (
                  <>
                    <li>Minimal Logo designs are the most requested</li>
                    <li>Mascot logos receive the highest customer ratings</li>
                    <li>3D logos generate above-average revenue</li>
                  </>
                )}
                {activeTab === 'seo' && (
                  <>
                    <li>Local SEO services are the most popular</li>
                    <li>E-commerce SEO commands the highest prices</li>
                    <li>Technical SEO receives consistently high ratings</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;