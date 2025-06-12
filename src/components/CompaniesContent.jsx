import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBuilding, FaSearch, FaExternalLinkAlt, FaFilter, FaLinkedin } from "react-icons/fa";
import companyData from "./companyData";

gsap.registerPlugin(ScrollTrigger);

const CompaniesContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const sectionRefs = useRef([]);
  sectionRefs.current = [];

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Get unique industries
  const industries = ["All", ...new Set(companyData.map(company => company.industry))];

  // Filter companies based on search and industry
  const filteredCompanies = companyData.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "All" || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  // Group companies by industry for better organization
  const groupedCompanies = filteredCompanies.reduce((acc, company) => {
    if (!acc[company.industry]) {
      acc[company.industry] = [];
    }
    acc[company.industry].push(company);
    return acc;
  }, {});

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      const card = section.querySelector(".company-card");
      
      if (card) {
        gsap.set(card, { opacity: 0, y: 30 });
        
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
        });
      }
    });
  }, [filteredCompanies]);

  const handleCompanyClick = (companyName) => {
    // Open Google search for the company with "careers" keyword
    const searchQuery = encodeURIComponent(`${companyName} careers Pakistan`);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
  };

  const handleLinkedInSearch = (companyName) => {
    // Open LinkedIn search for the company
    const searchQuery = encodeURIComponent(`${companyName} Pakistan`);
    window.open(`https://www.linkedin.com/search/results/companies/?keywords=${searchQuery}`, '_blank');
  };

  const getIndustryColor = (industry) => {
    const colors = {
      'IT': 'bg-blue-500',
      'Fin-Tech': 'bg-green-500',
      'E-Commerce': 'bg-purple-500',
      'Ed-Tech': 'bg-yellow-500',
      'Health-Tech': 'bg-red-500',
      'Engineering': 'bg-gray-500',
      'default': 'bg-[#FF6542]'
    };
    return colors[industry] || colors.default;
  };

  return (
    <div className="-mt-36 relative w-screen rounded-t-4xl flex flex-col bg-[#2b2b2b] p-10 overflow-hidden text-white">
      
      {/* Statistics Section */}
      <div className="max-w-6xl mx-auto w-full mt-12 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-[#333] rounded-xl">
            <div className="text-3xl font-bold text-[#FF6542]">{companyData.length}</div>
            <div className="text-gray-300 text-sm">Total Companies</div>
          </div>
          <div className="text-center p-4 bg-[#333] rounded-xl">
            <div className="text-3xl font-bold text-[#FF6542]">{industries.length - 1}</div>
            <div className="text-gray-300 text-sm">Industries</div>
          </div>
          <div className="text-center p-4 bg-[#333] rounded-xl">
            <div className="text-3xl font-bold text-[#FF6542]">
              {Object.values(groupedCompanies).reduce((max, companies) => Math.max(max, companies.length), 0)}
            </div>
            <div className="text-gray-300 text-sm">Largest Sector</div>
          </div>
          <div className="text-center p-4 bg-[#333] rounded-xl">
            <div className="text-3xl font-bold text-[#FF6542]">100%</div>
            <div className="text-gray-300 text-sm">Active Hiring</div>
          </div>
        </div>
      </div>
      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto w-full mt-12 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#333] border border-gray-600 rounded-xl focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white placeholder-gray-400"
            />
          </div>

          {/* Industry Filter */}
          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="pl-12 pr-8 py-3 bg-[#333] border border-gray-600 rounded-xl focus:ring-2 focus:ring-[#FF6542] focus:border-transparent text-white appearance-none cursor-pointer min-w-[200px]"
            >
              {industries.map(industry => (
                <option key={industry} value={industry} className="bg-[#333]">
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="text-gray-300 text-sm">
            {filteredCompanies.length} companies found
          </div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="max-w-6xl mx-auto w-full">
        {selectedIndustry === "All" ? (
          // Show companies grouped by industry
          Object.entries(groupedCompanies).map(([industry, companies]) => (
            <div key={industry} className="mb-12">
              <h2 className="text-2xl font-bold text-[#FF6542] mb-6 flex items-center">
                <FaBuilding className="mr-3" />
                {industry} ({companies.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    ref={addToRefs}
                    className="company-card"
                  >
                    <div
                      onClick={() => handleCompanyClick(company.name)}
                      className="bg-[#333] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:bg-[#404040] border border-gray-600 hover:border-[#FF6542]"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white group-hover:text-[#FF6542] transition-colors duration-300 line-clamp-2">
                            {company.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`text-xs px-2 py-1 rounded-full text-white ${getIndustryColor(company.industry)}`}>
                              {company.industry}
                            </span>
                          </div>
                        </div>
                        <FaExternalLinkAlt className="text-gray-400 group-hover:text-[#FF6542] transition-colors duration-300 ml-2 flex-shrink-0" />
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-600">
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCompanyClick(company.name);
                            }}
                            className="flex-1 text-xs bg-[#FF6542] hover:bg-orange-600 text-white px-3 py-2 rounded transition-colors duration-300"
                          >
                            Search Jobs
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLinkedInSearch(company.name);
                            }}
                            className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition-colors duration-300"
                          >
                            LinkedIn
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          // Show filtered companies in a single grid
          <div>
            <h2 className="text-2xl font-bold text-[#FF6542] mb-6 flex items-center">
              <FaBuilding className="mr-3" />
              {selectedIndustry} Companies ({filteredCompanies.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCompanies.map((company) => (
                <div
                  key={company.id}
                  ref={addToRefs}
                  className="company-card"
                >
                  <div
                    onClick={() => handleCompanyClick(company.name)}
                    className="bg-[#333] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:bg-[#404040] border border-gray-600 hover:border-[#FF6542]"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-[#FF6542] transition-colors duration-300 line-clamp-2">
                          {company.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full text-white ${getIndustryColor(company.industry)}`}>
                            {company.industry}
                          </span>
                        </div>
                      </div>
                      <FaExternalLinkAlt className="text-gray-400 group-hover:text-[#FF6542] transition-colors duration-300 ml-2 flex-shrink-0" />
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-600">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCompanyClick(company.name);
                          }}
                          className="flex-1 text-xs bg-[#FF6542] hover:bg-orange-600 text-white px-3 py-2 rounded transition-colors duration-300"
                        >
                          Search Jobs
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLinkedInSearch(company.name);
                          }}
                          className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition-colors duration-300"
                        >
                          LinkedIn
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-16">
            <FaBuilding className="text-6xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No companies found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or selecting a different industry.
            </p>
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="max-w-4xl mx-auto w-full mt-16 p-6 bg-[#333] rounded-xl border border-gray-600">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <FaSearch className="mr-3 text-[#FF6542]" />
          How to Use This Directory
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
          <div>
            <h4 className="font-semibold text-white mb-2">🔍 Search & Discover</h4>
            <ul className="text-sm space-y-1">
              <li>• Search by company name</li>
              <li>• Filter by industry type</li>
              <li>• Browse {companyData.length}+ companies</li>
              <li>• View organized by sectors</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">🎯 Quick Actions</h4>
            <ul className="text-sm space-y-1">
              <li>• "Search Jobs" - Find current openings</li>
              <li>• "LinkedIn" - View company profiles</li>
              <li>• Click cards for career search</li>
              <li>• Research company culture</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">💼 Apply Smart</h4>
            <ul className="text-sm space-y-1">
              <li>• Target companies in your field</li>
              <li>• Check recent job postings</li>
              <li>• Follow on LinkedIn first</li>
              <li>• Tailor your applications</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-[#2b2b2b] rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400 mb-2">
            💡 <strong className="text-white">Pro Tip:</strong> These companies have actively recruited from Pakistani universities. 
            Use this as your starting point for targeted job applications!
          </p>
          <p className="text-xs text-gray-500">
            Data based on university career fair participation and industry presence in Pakistan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompaniesContent;
