import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiAward, FiStar, FiTrendingUp, FiCheck, FiArrowRight } = FiIcons;

const HomePage = () => {
  const [certification, setCertification] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleGenerate = (e) => {
    e.preventDefault();
    if (certification.trim() && name.trim()) {
      const encodedCert = encodeURIComponent(certification);
      const encodedName = encodeURIComponent(name);
      navigate(`/certificate/${encodedCert}?name=${encodedName}`);
    }
  };

  const popularCertifications = [
    'Professional Procrastinator',
    'Expert Coffee Drinker',
    'Master of Overthinking',
    'Certified Couch Potato',
    'Advanced Netflix Watcher',
    'Professional Cat Whisperer'
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <SafeIcon icon={FiAward} className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CertifyMe</h1>
                <p className="text-sm text-gray-600">Professional Certification Platform</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get Your Certificate
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {' '}Today
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Create professional certificates for any skill or achievement instantly.
            </p>
          </motion.div>

          {/* Certificate Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleGenerate} className="bg-white p-8 rounded-2xl shadow-xl border">
              <div className="space-y-6">
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                    What do you want to be certified in?
                  </label>
                  <input
                    type="text"
                    value={certification}
                    onChange={(e) => setCertification(e.target.value)}
                    placeholder="e.g., Professional Pizza Eating, Master of Dad Jokes..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Generate My Certificate</span>
                  <SafeIcon icon={FiArrowRight} className="text-xl" />
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiCheck} className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Design</h3>
              <p className="text-gray-600">Elegant certificate design with official styling</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiTrendingUp} className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Generation</h3>
              <p className="text-gray-600">Get your certificate in seconds</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiAward} className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Print</h3>
              <p className="text-gray-600">High-quality design perfect for framing</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            Made with ❤️ • Create your certificate today
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;