import React, { useState, useEffect } from 'react';
import { FaUser, FaGraduationCap, FaBriefcase, FaCode, FaDownload, FaCopy, FaPlus, FaTrash, FaEye, FaFilePdf, FaMagic, FaCertificate } from 'react-icons/fa';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { generateLatexCode } from './latexGenerator';
import PDFPreview from './PDFPreview';
import { PDFService } from './pdfService';
import { sampleResumeData } from './sampleData';
import ResumeGeneratorTitlePage from './ResumeGeneratorTitlePage';

const ResumeGenerator = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      phone: '',
      email: '',
      linkedin: '',
      github: '',
      website: ''
    },
    education: [
      {
        institution: '',
        location: '',
        degree: '',
        dates: '',
        gpa: '',
        honors: ''
      }
    ],
    experience: [
      {
        title: '',
        company: '',
        location: '',
        dates: '',
        responsibilities: ['']
      }
    ],
    projects: [
      {
        name: '',
        technologies: '',
        dates: '',
        description: ['']
      }
    ],
    skills: {
      languages: '',
      frameworks: '',
      developerTools: '',
      libraries: '',
      softSkills: '',
      languages_spoken: ''
    },
    certifications: [
      {
        name: '',
        issuer: '',
        date: '',
        credentialId: ''
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [latexCode, setLatexCode] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    // Scroll to top of the page when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateEducation = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        institution: '',
        location: '',
        degree: '',
        dates: '',
        gpa: '',
        honors: ''
      }]
    }));
  };

  const removeEducation = (index) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const updateExperience = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const updateExperienceResponsibility = (expIndex, respIndex, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? {
          ...exp,
          responsibilities: exp.responsibilities.map((resp, j) => 
            j === respIndex ? value : resp
          )
        } : exp
      )
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        title: '',
        company: '',
        location: '',
        dates: '',
        responsibilities: ['']
      }]
    }));
  };

  const removeExperience = (index) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addResponsibility = (expIndex) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? {
          ...exp,
          responsibilities: [...exp.responsibilities, '']
        } : exp
      )
    }));
  };

  const removeResponsibility = (expIndex, respIndex) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? {
          ...exp,
          responsibilities: exp.responsibilities.filter((_, j) => j !== respIndex)
        } : exp
      )
    }));
  };

  const updateProject = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const updateProjectDescription = (projIndex, descIndex, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === projIndex ? {
          ...proj,
          description: proj.description.map((desc, j) => 
            j === descIndex ? value : desc
          )
        } : proj
      )
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        name: '',
        technologies: '',
        dates: '',
        description: ['']
      }]
    }));
  };

  const removeProject = (index) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addProjectDescription = (projIndex) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === projIndex ? {
          ...proj,
          description: [...proj.description, '']
        } : proj
      )
    }));
  };

  const removeProjectDescription = (projIndex, descIndex) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === projIndex ? {
          ...proj,
          description: proj.description.filter((_, j) => j !== descIndex)
        } : proj
      )
    }));
  };

  const updateSkills = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [field]: value
      }
    }));
  };

  const generateResume = () => {
    const latex = generateLatexCode(resumeData);
    setLatexCode(latex);
    setShowPreview(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(latexCode);
    alert('LaTeX code copied to clipboard!');
  };

  const downloadLatex = () => {
    const blob = new Blob([latexCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_resume.tex`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generatePDFFromLatex = async () => {
    setIsGeneratingPDF(true);
    try {
      const fileName = resumeData.personalInfo.name ? 
        resumeData.personalInfo.name.replace(/\s+/g, '_') : 'resume';
      
      const pdfBlob = await PDFService.generatePDF(latexCode, fileName);
      PDFService.downloadBlob(pdfBlob, `${fileName}.pdf`);
      
      alert('PDF generated successfully!');
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert(`PDF generation failed: ${error.message}\n\nPlease copy the LaTeX code and use it with Overleaf.com instead.`);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const loadSampleData = () => {
    setResumeData(sampleResumeData);
    toast.success("Sample data loaded! You can now see Jake's resume and modify it.", {
      style: {
        background: '#222',
        color: '#fff',
        fontSize: '1rem',
        borderRadius: '0.75rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.12)'
      },
      iconTheme: {
        primary: '#FF6542',
        secondary: '#fff',
      },
      duration: 2500
    });
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: FaUser },
    { id: 'education', label: 'Education', icon: FaGraduationCap },
    { id: 'experience', label: 'Experience', icon: FaBriefcase, optional: true },
    { id: 'projects', label: 'Projects', icon: FaCode, optional: true },
    { id: 'skills', label: 'Skills', icon: FaCode, optional: true },
    { id: 'certifications', label: 'Certifications', icon: FaCertificate, optional: true }
  ];

  return (
    <main className="relative bg-[#F4F2ED] min-h-screen w-screen overflow-x-hidden">
      <ResumeGeneratorTitlePage />

      {/* Resume Tips Section */}
     
      <div className="-mt-36 relative w-screen rounded-t-4xl flex flex-col bg-[#2b2b2b] p-10 overflow-hidden text-white">
        
        {/* Load Sample Data Section */}
        <div className="text-center mb-12 max-w-4xl mx-auto mt-12">
          <button
            onClick={loadSampleData}
            className="bg-[#FF6542] text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-colors duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-3 mx-auto"
          >
            <FaMagic className="text-xl" />
            <span>Load Sample Data</span>
          </button>
          <p className="text-gray-300 mt-4 text-lg">
            Tip: Keep your resume concise—limit it to one page preferably.          
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {!showPreview && !showPDFPreview ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <div className="bg-[#333] rounded-2xl shadow-xl p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-white mb-6">Resume Sections</h3>
                  <nav className="space-y-2">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                            activeTab === tab.id
                              ? 'bg-[#FF6542] text-white'
                              : 'text-gray-300 hover:bg-[#444]'
                          }`}
                        >
                          <Icon className="text-lg" />
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                  
                  <div className="mt-8">
                    <button
                      onClick={generateResume}
                      className="w-full bg-[#FF6542] text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center space-x-2 mb-4"
                    >
                      <FaEye />
                      <span>Generate LaTeX Code</span>
                    </button>
                    
                    {/* Quick Preview/Download Button - responsive */}
                    <div className="block sm:hidden">
                      <PDFDownloadLink
                        document={<PDFPreview resumeData={resumeData} />}
                        fileName={`${resumeData.personalInfo.name?.replace(/\s+/g, '_') || 'resume'}.pdf`}
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                      >
                        {({ blob, url, loading, error }) => (
                          <>
                            <FaFilePdf />
                            <span>{loading ? 'Generating...' : 'Download PDF'}</span>
                          </>
                        )}
                      </PDFDownloadLink>
                    </div>
                    <div className="hidden sm:block">
                      <button
                        onClick={() => {
                          const latex = generateLatexCode(resumeData);
                          setLatexCode(latex);
                          setShowPDFPreview(true);
                        }}
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                      >
                        <FaFilePdf />
                        <span>Quick PDF Preview</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-[#333] rounded-2xl shadow-xl p-8">
                  
                  {/* Personal Information */}
                  {activeTab === 'personal' && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <FaUser className="mr-3 text-[#FF6542]" />
                        Personal Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.name}
                            onChange={(e) => updatePersonalInfo('name', e.target.value)}
                            className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                            placeholder="Jake Ryan"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.phone}
                            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                            className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                            placeholder="123-456-7890"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                          <input
                            type="email"
                            value={resumeData.personalInfo.email}
                            onChange={(e) => updatePersonalInfo('email', e.target.value)}
                            className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                            placeholder="jake@su.edu"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn Profile</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.linkedin}
                            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                            className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                            placeholder="linkedin.com/in/jake"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">GitHub Profile</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.github}
                            onChange={(e) => updatePersonalInfo('github', e.target.value)}
                            className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                            placeholder="github.com/jake"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Personal Website</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.website}
                            onChange={(e) => updatePersonalInfo('website', e.target.value)}
                            className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                            placeholder="www.jake.com"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {activeTab === 'education' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center">
                          <FaGraduationCap className="mr-3 text-[#FF6542]" />
                          Education
                        </h2>
                        <button
                          onClick={addEducation}
                          className="bg-[#FF6542] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center space-x-2"
                        >
                          <FaPlus />
                          <span>Add Education</span>
                        </button>
                      </div>
                      
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="mb-8 p-6 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Education {index + 1}</h3>
                            {resumeData.education.length > 1 && (
                              <button
                                onClick={() => removeEducation(index)}
                                className="text-red-500 hover:text-red-700 transition-colors duration-300"
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Institution *</label>
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="Southwestern University"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Location *</label>
                              <input
                                type="text"
                                value={edu.location}
                                onChange={(e) => updateEducation(index, 'location', e.target.value)}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="Georgetown, TX"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Degree *</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="Bachelor of Arts in Computer Science, Minor in Business"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Dates *</label>
                              <input
                                type="text"
                                value={edu.dates}
                                onChange={(e) => updateEducation(index, 'dates', e.target.value)}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="Aug. 2018 -- May 2021"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">GPA (Optional)</label>
                              <input
                                type="text"
                                value={edu.gpa}
                                onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="3.85/4.0"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Honors/Awards (Optional)</label>
                              <input
                                type="text"
                                value={edu.honors}
                                onChange={(e) => updateEducation(index, 'honors', e.target.value)}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="Cum Laude, Dean's List"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Experience */}
                  {activeTab === 'experience' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center">
                          <FaBriefcase className="mr-3 text-[#FF6542]" />
                          Experience <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
                        </h2>
                        <button
                          onClick={addExperience}
                          className="bg-[#FF6542] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center space-x-2"
                        >
                          <FaPlus />
                          <span>Add Experience</span>
                        </button>
                      </div>
                      
                      {resumeData.experience.map((exp, expIndex) => (
                        <div key={expIndex} className="mb-8 p-6 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Experience {expIndex + 1}</h3>
                            {resumeData.experience.length > 1 && (
                              <button
                                onClick={() => removeExperience(expIndex)}
                                className="text-red-500 hover:text-red-700 transition-colors duration-300"
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
                              <input
                                type="text"
                                value={exp.title}
                                onChange={(e) => updateExperience(expIndex, 'title', e.target.value)}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="Software Engineer"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="Tech Company"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                              <input
                                type="text"
                                value={exp.location}
                                onChange={(e) => updateExperience(expIndex, 'location', e.target.value)}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="San Francisco, CA"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Dates</label>
                              <input
                                type="text"
                                value={exp.dates}
                                onChange={(e) => updateExperience(expIndex, 'dates', e.target.value)}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="June 2020 -- Present"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
                              <button
                                onClick={() => addResponsibility(expIndex)}
                                className="text-[#FF6542] hover:text-orange-600 transition-colors duration-300 flex items-center space-x-1"
                              >
                                <FaPlus className="text-sm" />
                                <span className="text-sm">Add Point</span>
                              </button>
                            </div>
                            {exp.responsibilities.map((resp, respIndex) => (
                              <div key={respIndex} className="flex items-center space-x-2 mb-2">
                                <textarea
                                  value={resp}
                                  onChange={(e) => updateExperienceResponsibility(expIndex, respIndex, e.target.value)}
                                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent resize-none"
                                  rows="2"
                                  placeholder="Developed a REST API using FastAPI and PostgreSQL..."
                                />
                                {exp.responsibilities.length > 1 && (
                                  <button
                                    onClick={() => removeResponsibility(expIndex, respIndex)}
                                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                                  >
                                    <FaTrash />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Projects */}
                  {activeTab === 'projects' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center">
                          <FaCode className="mr-3 text-[#FF6542]" />
                          Projects <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
                        </h2>
                        <button
                          onClick={addProject}
                          className="bg-[#FF6542] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center space-x-2"
                        >
                          <FaPlus />
                          <span>Add Project</span>
                        </button>
                      </div>
                      
                      {resumeData.projects.map((project, projIndex) => (
                        <div key={projIndex} className="mb-8 p-6 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Project {projIndex + 1}</h3>
                            {resumeData.projects.length > 1 && (
                              <button
                                onClick={() => removeProject(projIndex)}
                                className="text-red-500 hover:text-red-700 transition-colors duration-300"
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
                              <input
                                type="text"
                                value={project.name}
                                onChange={(e) => updateProject(projIndex, 'name', e.target.value)}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="Gitlytics"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Technologies</label>
                              <input
                                type="text"
                                value={project.technologies}
                                onChange={(e) => updateProject(projIndex, 'technologies', e.target.value)}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="Python, Flask, React, PostgreSQL, Docker"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-300 mb-2">Dates</label>
                              <input
                                type="text"
                                value={project.dates}
                                onChange={(e) => updateProject(projIndex, 'dates', e.target.value)}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="June 2020 -- Present"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <label className="block text-sm font-medium text-gray-700">Project Description</label>
                              <button
                                onClick={() => addProjectDescription(projIndex)}
                                className="text-[#FF6542] hover:text-orange-600 transition-colors duration-300 flex items-center space-x-1"
                              >
                                <FaPlus className="text-sm" />
                                <span className="text-sm">Add Point</span>
                              </button>
                            </div>
                            {project.description.map((desc, descIndex) => (
                              <div key={descIndex} className="flex items-center space-x-2 mb-2">
                                <textarea
                                  value={desc}
                                  onChange={(e) => updateProjectDescription(projIndex, descIndex, e.target.value)}
                                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent resize-none"
                                  rows="2"
                                  placeholder="Developed a full-stack web application with Flask serving a REST API..."
                                />
                                {project.description.length > 1 && (
                                  <button
                                    onClick={() => removeProjectDescription(projIndex, descIndex)}
                                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                                  >
                                    <FaTrash />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skills */}
                  {activeTab === 'skills' && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <FaCode className="mr-3 text-[#FF6542]" />
                        Skills <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Programming Languages <span className="text-xs text-gray-500">(for CS/Tech roles)</span></label>
                          <textarea
                            value={resumeData.skills.languages}
                            onChange={(e) => updateSkills('languages', e.target.value)}
                            className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400 resize-none"
                            rows="2"
                            placeholder="Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Frameworks & Technologies <span className="text-xs text-gray-500">(for CS/Tech roles)</span></label>
                          <textarea
                            value={resumeData.skills.frameworks}
                            onChange={(e) => updateSkills('frameworks', e.target.value)}
                            className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400 resize-none"
                            rows="2"
                            placeholder="React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Tools & Software</label>
                          <textarea
                            value={resumeData.skills.developerTools}
                            onChange={(e) => updateSkills('developerTools', e.target.value)}
                            className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400 resize-none"
                            rows="2"
                            placeholder="Git, Docker, Microsoft Office, Adobe Suite, Salesforce, Google Analytics, AutoCAD"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Libraries & Databases <span className="text-xs text-gray-500">(for CS/Tech roles)</span></label>
                          <textarea
                            value={resumeData.skills.libraries}
                            onChange={(e) => updateSkills('libraries', e.target.value)}
                            className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400 resize-none"
                            rows="2"
                            placeholder="pandas, NumPy, Matplotlib, MySQL, PostgreSQL, MongoDB"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Soft Skills</label>
                          <textarea
                            value={resumeData.skills.softSkills}
                            onChange={(e) => updateSkills('softSkills', e.target.value)}
                            className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400 resize-none"
                            rows="2"
                            placeholder="Leadership, Communication, Project Management, Problem Solving, Team Collaboration"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Languages Spoken</label>
                          <textarea
                            value={resumeData.skills.languages_spoken}
                            onChange={(e) => updateSkills('languages_spoken', e.target.value)}
                            className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400 resize-none"
                            rows="2"
                            placeholder="English (Native), Spanish (Fluent), French (Conversational)"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {activeTab === 'certifications' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center">
                          <FaCertificate className="mr-3 text-[#FF6542]" />
                          Certifications <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
                        </h2>
                        <button
                          onClick={() => setResumeData(prev => ({
                            ...prev,
                            certifications: [
                              ...prev.certifications,
                              { name: '', issuer: '', date: '', credentialId: '' }
                            ]
                          }))}
                          className="bg-[#FF6542] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center space-x-2"
                        >
                          <FaPlus />
                          <span>Add Certification</span>
                        </button>
                      </div>
                      {resumeData.certifications.map((cert, certIndex) => (
                        <div key={certIndex} className="mb-8 p-6 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Certification {certIndex + 1}</h3>
                            {resumeData.certifications.length > 1 && (
                              <button
                                onClick={() => setResumeData(prev => ({
                                  ...prev,
                                  certifications: prev.certifications.filter((_, i) => i !== certIndex)
                                }))}
                                className="text-red-500 hover:text-red-700 transition-colors duration-300"
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Certification Name</label>
                              <input
                                type="text"
                                value={cert.name}
                                onChange={e => setResumeData(prev => ({
                                  ...prev,
                                  certifications: prev.certifications.map((c, i) => i === certIndex ? { ...c, name: e.target.value } : c)
                                }))}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="AWS Certified Solutions Architect"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Issuer *</label>
                              <input
                                type="text"
                                value={cert.issuer}
                                onChange={e => setResumeData(prev => ({
                                  ...prev,
                                  certifications: prev.certifications.map((c, i) => i === certIndex ? { ...c, issuer: e.target.value } : c)
                                }))}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="Amazon Web Services"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                              <input
                                type="text"
                                value={cert.date}
                                onChange={e => setResumeData(prev => ({
                                  ...prev,
                                  certifications: prev.certifications.map((c, i) => i === certIndex ? { ...c, date: e.target.value } : c)
                                }))}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="June 2024"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Credential ID (if available)</label>
                              <input
                                type="text"
                                value={cert.credentialId}
                                onChange={e => setResumeData(prev => ({
                                  ...prev,
                                  certifications: prev.certifications.map((c, i) => i === certIndex ? { ...c, credentialId: e.target.value } : c)
                                }))}
                                className="w-full px-4 py-3 bg-[#444] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
                                placeholder="ABC-1234"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : showPDFPreview ? (
            // PDF Preview Section
            <div className="max-w-7xl mx-auto">
              <div className="bg-[#2b2b2b] rounded-2xl p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2 sm:mb-0">PDF Preview</h2>
                  <div className="flex flex-col gap-3 w-full sm:w-auto sm:flex-row sm:gap-4">
                    <PDFDownloadLink
                      document={<PDFPreview resumeData={resumeData} />}
                      fileName={`${resumeData.personalInfo.name?.replace(/\s+/g, '_') || 'resume'}.pdf`}
                      className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                      {({ blob, url, loading, error }) => (
                        <>
                          <FaDownload />
                          <span>{loading ? 'Generating...' : 'Download PDF'}</span>
                        </>
                      )}
                    </PDFDownloadLink>
                    <button
                      onClick={() => {
                        const latex = generateLatexCode(resumeData);
                        setLatexCode(latex);
                        setShowPDFPreview(false);
                        setShowPreview(true);
                      }}
                      className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                      <FaCode />
                      <span>View LaTeX</span>
                    </button>
                    <button
                      onClick={() => setShowPDFPreview(false)}
                      className="w-full sm:w-auto bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center"
                    >
                      Back to Edit
                    </button>
                  </div>
                </div>
                {/* Responsive PDF Preview: scrollable and fits mobile screens */}
                <div className="border rounded-lg overflow-auto w-full bg-[#222]" style={{ height: '80vh', minHeight: 240, maxHeight: 600 }}>
                  <PDFViewer width="100%" height="100%" style={{ width: '100%', minWidth: 0, minHeight: 240 }}>
                    <PDFPreview resumeData={resumeData} />
                  </PDFViewer>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Resume Tips:</h3>
                  <ul className="list-disc list-inside text-blue-600 text-sm space-y-1">
                    <li>Keep your resume to one page if possible.</li>
                    <li>Use clear, concise bullet points and action verbs.</li>
                    <li>Tailor your resume for each job application.</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            // Preview and Download Section
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Generated LaTeX Code</h2>
                  <div className="flex space-x-4">
                    <button
                      onClick={copyToClipboard}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <FaCopy />
                      <span>Copy LaTeX</span>
                    </button>
                    <button
                      onClick={downloadLatex}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <FaDownload />
                      <span>Download .tex</span>
                    </button>
                    {/* <button
                      onClick={generatePDFFromLatex}
                      disabled={isGeneratingPDF}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaFilePdf />
                      <span>{isGeneratingPDF ? 'Compiling...' : 'Generate PDF'}</span>
                    </button> */}
                    <button
                      onClick={() => {
                        setShowPreview(false);
                        setShowPDFPreview(true);
                      }}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <FaEye />
                      <span>PDF Preview</span>
                    </button>
                    <button
                      onClick={() => setShowPreview(false)}
                      className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300"
                    >
                      Back to Edit
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 border">
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto">
                    {latexCode}
                  </pre>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Download Options:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
                    <div>
                      <h4 className="font-semibold mb-2">🚀 Quick Options:</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Click "Generate PDF" to compile LaTeX directly</li>
                        <li>Click "PDF Preview" for immediate visual preview</li>
                        <li>Copy/Download LaTeX code for manual compilation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">📝 Manual Compilation:</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Copy LaTeX code and paste into <a href="https://www.overleaf.com" target="_blank" rel="noopener noreferrer" className="underline">Overleaf</a></li>
                        <li>Use any LaTeX editor (TeXworks, TeXmaker, etc.)</li>
                        <li>Compile with pdflatex for best results</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        {/* <div className="mt-16 max-w-6xl w-full">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <FaCode className="text-3xl text-[#FF6542] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Jake's Template</h3>
              <p className="text-gray-600 text-sm">Generate exact LaTeX code from the proven Jake's Resume Template</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <FaFilePdf className="text-3xl text-[#FF6542] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Instant PDF</h3>
              <p className="text-gray-600 text-sm">Download PDF directly or compile LaTeX online automatically</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <FaEye className="text-3xl text-[#FF6542] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Live Preview</h3>
              <p className="text-gray-600 text-sm">See how your resume looks with real-time PDF preview</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <FaMagic className="text-3xl text-[#FF6542] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Smart Sections</h3>
              <p className="text-gray-600 text-sm">Projects and Experience are optional - perfect for students</p>
            </div>
          </div>
        </div> */}
      </div>
    </main>
  );
};

export default ResumeGenerator;
