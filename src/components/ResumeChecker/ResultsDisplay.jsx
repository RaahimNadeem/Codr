import React, { useState } from 'react';
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaTimesCircle, 
  FaInfoCircle,
  FaTrophy,
  FaEye,
  FaDownload,
  FaRedo
} from 'react-icons/fa';

const ResultsDisplay = ({ results, onReset }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getOverallGrade = (score) => {
    if (score >= 80) return { grade: 'A', description: 'Excellent ATS Compatibility' };
    if (score >= 70) return { grade: 'B', description: 'Good ATS Compatibility' };
    if (score >= 60) return { grade: 'C', description: 'Fair ATS Compatibility' };
    if (score >= 50) return { grade: 'D', description: 'Poor ATS Compatibility' };
    return { grade: 'F', description: 'Needs Major Improvements' };
  };

  const overallPercentage = Math.round((results.overallScore / results.maxScore) * 100);
  const gradeInfo = getOverallGrade(overallPercentage);

  const tabItems = [
    { id: 'overview', label: 'Overview', icon: FaEye },
    { id: 'sections', label: 'Sections', icon: FaCheckCircle },
    { id: 'formatting', label: 'Formatting', icon: FaInfoCircle },
    { id: 'keywords', label: 'Keywords', icon: FaTrophy },
    { id: 'recommendations', label: 'Recommendations', icon: FaExclamationTriangle }
  ];

  return (
    <div className="space-y-8">
      {/* Header with Score */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gray-100 mb-6 relative">
          <div className={`absolute inset-0 rounded-full ${getScoreBgColor(results.overallScore, results.maxScore)}`}>
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${overallPercentage * 2.83} 283`}
                className="text-white transition-all duration-1000 ease-out"
              />
            </svg>
          </div>
          <div className="text-center text-white z-10">
            <div className="text-2xl font-bold">{overallPercentage}%</div>
            <div className="text-lg font-semibold">{gradeInfo.grade}</div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-[#2b2b2b] mb-2">ATS Compatibility Score</h2>
        <p className={`text-lg font-semibold ${getScoreColor(results.overallScore, results.maxScore)}`}>
          {gradeInfo.description}
        </p>
        <p className="text-gray-600 mt-2">
          Score: {results.overallScore} out of {results.maxScore} points
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabItems.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#FF6542] text-[#FF6542]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="text-lg" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && <OverviewTab results={results} />}
        {activeTab === 'sections' && <SectionsTab results={results} />}
        {activeTab === 'formatting' && <FormattingTab results={results} />}
        {activeTab === 'keywords' && <KeywordsTab results={results} />}
        {activeTab === 'recommendations' && <RecommendationsTab results={results} />}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
        <button
          onClick={onReset}
          className="flex items-center justify-center px-6 py-3 bg-[#FF6542] text-white rounded-lg hover:bg-orange-600 transition-colors duration-300"
        >
          <FaRedo className="mr-2" />
          Analyze Another Resume
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
        >
          <FaDownload className="mr-2" />
          Download Report
        </button>
      </div>
    </div>
  );
};

const OverviewTab = ({ results }) => {
  const sections = [
    { name: 'Essential Sections', score: results.sections.score, maxScore: results.sections.maxScore },
    { name: 'ATS Formatting', score: results.formatting.score, maxScore: results.formatting.maxScore },
    { name: 'Keywords & Skills', score: results.keywords.score, maxScore: results.keywords.maxScore },
    { name: 'ATS Compatibility', score: results.atsCompatibility.score, maxScore: results.atsCompatibility.maxScore }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section, index) => {
          const percentage = Math.round((section.score / section.maxScore) * 100);
          return (
            <div key={index} className="bg-white border rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-[#2b2b2b] mb-4">{section.name}</h3>
              <div className="text-3xl font-bold mb-2" style={{ 
                color: percentage >= 80 ? '#10B981' : percentage >= 60 ? '#F59E0B' : '#EF4444' 
              }}>
                {percentage}%
              </div>
              <div className="text-sm text-gray-600">{section.score}/{section.maxScore} points</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: percentage >= 80 ? '#10B981' : percentage >= 60 ? '#F59E0B' : '#EF4444'
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Quick Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Word Count:</strong> {results.atsCompatibility.wordCount} words</p>
            <p><strong>Technical Skills Found:</strong> {results.keywords.totalSkillsFound}</p>
          </div>
          <div>
            <p><strong>Essential Sections:</strong> {Object.values(results.sections.sections).filter(s => s.found).length}/{Object.keys(results.sections.sections).length}</p>
            <p><strong>Critical Issues:</strong> {results.recommendations.filter(r => r.type === 'critical').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionsTab = ({ results }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#2b2b2b] mb-6">Resume Sections Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(results.sections.sections).map(([sectionName, sectionData]) => (
            <div key={sectionName} className="flex items-start space-x-4 p-4 border rounded-lg">
              <div className="flex-shrink-0">
                {sectionData.found ? (
                  <FaCheckCircle className="text-green-500 text-xl mt-1" />
                ) : sectionData.required ? (
                  <FaTimesCircle className="text-red-500 text-xl mt-1" />
                ) : (
                  <FaInfoCircle className="text-gray-400 text-xl mt-1" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-[#2b2b2b] mb-1">{sectionName}</h4>
                <p className="text-sm text-gray-600 mb-2">{sectionData.description}</p>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    sectionData.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {sectionData.required ? 'Required' : 'Optional'}
                  </span>
                  <span className="text-xs text-gray-500">Weight: {sectionData.weight} points</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {results.sections.missingSections.length > 0 && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Missing Required Sections</h4>
            <p className="text-red-700 text-sm">
              Add these essential sections to improve your ATS score: {results.sections.missingSections.join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const FormattingTab = ({ results }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#2b2b2b] mb-6">ATS Formatting Analysis</h3>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium">Formatting Score</h4>
            <span className="text-2xl font-bold text-[#FF6542]">
              {results.formatting.score}/{results.formatting.maxScore}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-[#FF6542] h-3 rounded-full transition-all duration-500"
              style={{ width: `${(results.formatting.score / results.formatting.maxScore) * 100}%` }}
            ></div>
          </div>
        </div>

        {results.formatting.issues.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-red-800 mb-3 flex items-center">
              <FaTimesCircle className="mr-2" />
              Critical Issues ({results.formatting.issues.length})
            </h4>
            <div className="space-y-2">
              {results.formatting.issues.map((issue, index) => (
                <div key={index} className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <FaTimesCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-red-800 text-sm">{issue}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.formatting.warnings.length > 0 && (
          <div>
            <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
              <FaExclamationTriangle className="mr-2" />
              Warnings ({results.formatting.warnings.length})
            </h4>
            <div className="space-y-2">
              {results.formatting.warnings.map((warning, index) => (
                <div key={index} className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <FaExclamationTriangle className="text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p className="text-yellow-800 text-sm">{warning}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.formatting.issues.length === 0 && results.formatting.warnings.length === 0 && (
          <div className="text-center py-8">
            <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-green-800 mb-2">Excellent Formatting!</h4>
            <p className="text-green-700">Your resume formatting is well-optimized for ATS systems.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const KeywordsTab = ({ results }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#2b2b2b] mb-6">Keywords & Skills Analysis</h3>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium">Keywords Score</h4>
            <span className="text-2xl font-bold text-[#FF6542]">
              {results.keywords.score}/{results.keywords.maxScore}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-[#FF6542] h-3 rounded-full transition-all duration-500"
              style={{ width: `${(results.keywords.score / results.keywords.maxScore) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(results.keywords.foundSkills).map(([category, skills]) => (
            skills.length > 0 && (
              <div key={category} className="p-4 border rounded-lg">
                <h4 className="font-semibold text-[#2b2b2b] mb-3">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-[#FF6542] text-white text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">{skills.length} skills found</p>
              </div>
            )
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Skills Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p><strong>Total Technical Skills:</strong> {results.keywords.totalSkillsFound}</p>
            </div>
            <div>
              <p><strong>Soft Skills:</strong> {results.keywords.foundSoftSkills.length}</p>
            </div>
            <div>
              <p><strong>Industry Keywords:</strong> {results.keywords.foundIndustryKeywords.length}</p>
            </div>
          </div>
        </div>

        {results.keywords.recommendations.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-[#2b2b2b] mb-3">Keyword Recommendations</h4>
            <div className="space-y-2">
              {results.keywords.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 border rounded-lg">
                  <FaInfoCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-800 text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RecommendationsTab = ({ results }) => {
  const groupedRecommendations = results.recommendations.reduce((acc, rec) => {
    if (!acc[rec.type]) acc[rec.type] = [];
    acc[rec.type].push(rec);
    return acc;
  }, {});

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'critical': return FaTimesCircle;
      case 'important': return FaExclamationTriangle;
      case 'suggestion': return FaInfoCircle;
      case 'positive': return FaCheckCircle;
      default: return FaInfoCircle;
    }
  };

  const getRecommendationStyle = (type) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'important': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'suggestion': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'positive': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#2b2b2b] mb-6">Improvement Recommendations</h3>
        
        {Object.entries(groupedRecommendations).map(([type, recommendations]) => {
          const Icon = getRecommendationIcon(type);
          const style = getRecommendationStyle(type);
          
          return (
            <div key={type} className="mb-6">
              <h4 className="font-semibold mb-4 flex items-center capitalize">
                <Icon className="mr-2" />
                {type} ({recommendations.length})
              </h4>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${style}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-semibold mb-2">{rec.title}</h5>
                        <p className="text-sm">{rec.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ml-4 ${
                        rec.impact === 'high' ? 'bg-red-100 text-red-800' :
                        rec.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        rec.impact === 'low' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {rec.impact} impact
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {results.recommendations.length === 0 && (
          <div className="text-center py-8">
            <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-green-800 mb-2">No Issues Found!</h4>
            <p className="text-green-700">Your resume looks great for ATS systems.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;
