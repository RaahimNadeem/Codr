import React, { useState } from 'react';
import { FaUpload, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaFileAlt, FaSearch, FaUsers, FaBrain } from 'react-icons/fa';
import { extractTextFromPDFWithRetry } from './pdfUtils';
import { performATSAnalysis } from './atsAnalyzer';
import ResultsDisplay from './ResultsDisplay';

const ResumeChecker = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (uploadedFile) => {
    setError('');
    setResults(null);
    
    if (uploadedFile.type !== 'application/pdf') {
      setError('Please upload a PDF file only.');
      return;
    }
    
    if (uploadedFile.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size should be less than 10MB.');
      return;
    }
    
    setFile(uploadedFile);
  };

  const analyzeResume = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    setError('');
    
    try {
      const result = await extractTextFromPDFWithRetry(file);
      console.log('PDF extraction result:', result);
      
      // Handle both old format (string) and new format (object)
      const text = typeof result === 'string' ? result : result.text;
      const metadata = typeof result === 'object' ? result.metadata : {};
      
      if (!text || text.trim().length < 50) {
        throw new Error('The PDF appears to contain mostly images or very little text. Please use a PDF with selectable text.');
      }
      
      console.log('Extracted text length:', text.length);
      console.log('First 200 characters:', text.substring(0, 200));
      
      const analysis = performATSAnalysis(text, metadata);
      setResults(analysis);
    } catch (err) {
      setError(err.message || 'Failed to analyze PDF. Please ensure it\'s a valid PDF file with readable text.');
      console.error('Analysis error:', err);
    }
    
    setIsAnalyzing(false);
  };

  const resetAnalyzer = () => {
    setFile(null);
    setResults(null);
    setError('');
    setIsAnalyzing(false);
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-[#F4F2ED]">
      <div className="relative z-10 min-h-screen w-screen flex flex-col items-center px-5 py-24">
        
        {/* Header */}
        <div className="text-center mb-12 max-w-4xl">
          <h1 className="text-6xl lg:text-8xl font-bold text-[#FF6542] hover:text-[#2b2b2b] transition-colors duration-700 mb-6">
            Resume Checker
          </h1>
          <p className="text-lg lg:text-xl text-[#2b2b2b] leading-relaxed">
            Get your resume ATS-ready with our comprehensive analyzer. 
            We'll check formatting, keywords, sections, and provide actionable insights 
            to help you pass through Applicant Tracking Systems.
          </p>
        </div>

        {/* How it Works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl w-full">
          <div className="text-center p-6">
            <FaUpload className="text-4xl text-[#FF6542] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#2b2b2b] mb-2">1. Upload Resume</h3>
            <p className="text-gray-600">Upload your PDF resume for analysis</p>
          </div>
          <div className="text-center p-6">
            <FaBrain className="text-4xl text-[#FF6542] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#2b2b2b] mb-2">2. AI Analysis</h3>
            <p className="text-gray-600">Our system checks ATS compatibility</p>
          </div>
          <div className="text-center p-6">
            <FaCheckCircle className="text-4xl text-[#FF6542] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#2b2b2b] mb-2">3. Get Results</h3>
            <p className="text-gray-600">Receive detailed feedback and score</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
          
          {!file && !results && (
            <>
              {/* File Upload Area */}
              <div
                className={`border-3 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-[#FF6542] bg-orange-50' 
                    : 'border-gray-300 hover:border-[#FF6542] hover:bg-gray-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <FaFileAlt className="text-6xl text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-[#2b2b2b] mb-4">
                    Upload Your Resume
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Drag and drop your PDF resume here, or click to browse
                  </p>
                  <div className="inline-block bg-[#FF6542] text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                    Choose PDF File
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Maximum file size: 10MB • PDF format only
                  </p>
                </label>
              </div>
              
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <FaExclamationTriangle className="text-red-500 mr-3" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}
            </>
          )}

          {file && !results && (
            <div className="text-center">
              <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">File Uploaded Successfully</h3>
                <p className="text-green-700 mb-4">{file.name}</p>
                <p className="text-sm text-green-600">
                  File size: {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              
              <button
                onClick={analyzeResume}
                disabled={isAnalyzing}
                className="bg-[#FF6542] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mb-4"
              >
                {isAnalyzing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Analyzing Resume...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FaSearch className="mr-3" />
                    Analyze ATS Compatibility
                  </div>
                )}
              </button>
              
              <div>
                <button
                  onClick={resetAnalyzer}
                  className="text-gray-600 hover:text-[#FF6542] transition-colors duration-300"
                >
                  Upload Different File
                </button>
              </div>
              
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <FaTimesCircle className="text-red-500 mr-3" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}
            </div>
          )}

          {results && <ResultsDisplay results={results} onReset={resetAnalyzer} />}
        </div>

        {/* Features */}
        <div className="mt-16 max-w-6xl w-full">
          <h2 className="text-3xl font-bold text-center text-[#2b2b2b] mb-12">
            What We Check
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <FaFileAlt className="text-3xl text-[#FF6542] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#2b2b2b] mb-2">ATS Formatting</h3>
              <p className="text-gray-600 text-sm">Checks for ATS-friendly structure and layout</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <FaSearch className="text-3xl text-[#FF6542] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#2b2b2b] mb-2">Keywords</h3>
              <p className="text-gray-600 text-sm">Analyzes relevant technical and industry keywords</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <FaUsers className="text-3xl text-[#FF6542] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#2b2b2b] mb-2">Essential Sections</h3>
              <p className="text-gray-600 text-sm">Verifies all required resume sections are present</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <FaBrain className="text-3xl text-[#FF6542] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#2b2b2b] mb-2">Smart Insights</h3>
              <p className="text-gray-600 text-sm">Provides actionable recommendations for improvement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeChecker;
