import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDownload, FiPrinter, FiHome, FiShare2 } = FiIcons;

const CertificatePage = () => {
  const { certification } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const name = searchParams.get('name');
  const [currentDate, setCurrentDate] = useState('');
  const [certId, setCertId] = useState('');

  useEffect(() => {
    // Set current date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(formattedDate);
    
    // Generate unique certificate ID
    setCertId('CERT-' + Math.random().toString(36).substring(2, 12).toUpperCase());
  }, []);

  const handlePrint = () => {
    // Force browser to print
    window.print();
  };

  const handleDownload = () => {
    // Alert user that printing is the recommended way
    alert('Please use the Print function to save your certificate as a PDF file.');
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${name}'s Certificate in ${certification}`,
          text: `Check out my certificate in ${certification}!`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } else {
      // Fallback for browsers that don't support share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!name || !certification) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Certificate</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style>
        {`
          @media print {
            @page { 
              size: landscape; 
              margin: 0;
            }
            html, body {
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            body * {
              visibility: hidden;
            }
            .certificate-container, 
            .certificate-container * {
              visibility: visible;
              overflow: visible;
            }
            .certificate-container {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              padding: 0;
              margin: 0;
              background: white !important;
            }
            .no-print {
              display: none !important;
            }
            .print-only {
              display: block !important;
            }
          }
          .print-only {
            display: none;
          }
        `}
      </style>

      {/* Action Bar */}
      <div className="no-print bg-white shadow-sm border-b py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <SafeIcon icon={FiHome} className="text-xl" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiShare2} className="text-lg" />
                <span>Share</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiDownload} className="text-lg" />
                <span>Download</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiPrinter} className="text-lg" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Printing Instructions */}
      <div className="no-print max-w-4xl mx-auto px-4 pt-4 mb-0">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-1">Print Tips:</h3>
          <ul className="text-blue-700 text-xs space-y-1">
            <li>• Use landscape orientation for best results</li>
            <li>• Select "Save as PDF" as printer to create a file</li>
            <li>• Choose "Background graphics" in print options</li>
          </ul>
        </div>
      </div>

      {/* Certificate */}
      <div className="py-4 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="certificate-container max-w-4xl mx-auto"
        >
          <div className="bg-white shadow-2xl border-8 border-double border-amber-600 relative overflow-hidden">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-8 border-t-8 border-amber-600 opacity-20"></div>
            <div className="absolute top-0 right-0 w-32 h-32 border-r-8 border-t-8 border-amber-600 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 border-l-8 border-b-8 border-amber-600 opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-8 border-b-8 border-amber-600 opacity-20"></div>

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #d97706 2px, transparent 2px),
                                radial-gradient(circle at 75% 75%, #d97706 2px, transparent 2px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>

            <div className="relative p-16 text-center">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-800 mb-2">
                  CERTIFICATE OF ACHIEVEMENT
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto"></div>
              </div>

              {/* Main Content */}
              <div className="mb-8">
                <p className="text-lg text-gray-700 mb-6 font-serif">
                  This is to certify that
                </p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 border-b-2 border-amber-600 pb-2 inline-block">
                  {decodeURIComponent(name)}
                </h2>
                <p className="text-lg text-gray-700 mb-4 font-serif">
                  has successfully demonstrated exceptional competency in
                </p>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-amber-800 mb-8">
                  {decodeURIComponent(certification)}
                </h3>
                <p className="text-base text-gray-600 mb-8 font-serif">
                  This achievement represents dedication, skill, and commitment to excellence 
                  in the aforementioned field of expertise.
                </p>
              </div>

              {/* Date and Signatures */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div className="text-center mb-4 md:mb-0">
                  <p className="text-sm text-gray-600 mb-2">Date of Certification</p>
                  <p className="font-serif font-bold text-gray-900">{currentDate}</p>
                </div>
                <div className="text-center">
                  <div className="w-48 border-b-2 border-gray-400 mb-2"></div>
                  <p className="text-sm text-gray-600">Certification Authority</p>
                  <p className="font-serif font-bold text-gray-900">CertifyMe Institute</p>
                </div>
              </div>

              {/* Seal */}
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center border-4 border-amber-900 shadow-lg">
                  <div className="text-white text-center">
                    <div className="text-xs font-bold">OFFICIAL</div>
                    <div className="text-xs">SEAL</div>
                  </div>
                </div>
              </div>

              {/* Certificate ID */}
              <div className="mt-4">
                <p className="text-xs text-gray-400 font-mono">
                  Certificate ID: {certId}
                </p>
              </div>

              {/* Print-only disclaimer */}
              <div className="print-only mt-6 pt-4 border-t border-gray-300">
                <p className="text-xs text-gray-500 font-serif italic">
                  This certificate is for entertainment purposes only.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CertificatePage;