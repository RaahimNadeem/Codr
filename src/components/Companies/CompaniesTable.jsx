import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import companyData from "./companyData";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Company Name",
    selector: (row) => row.name,
    sortable: true,
    reorder: true,
    grow: 2,
    style: {
      fontWeight: '500',
      fontSize: '14px',
    },
  },
  {
    name: "Industry",
    selector: (row) => row.industry,
    sortable: true,
    reorder: true,
    grow: 1,
    style: {
      color: '#FF6542',
      fontWeight: '500',
      fontSize: '14px',
    },
  },
];

const customStyles = {
  table: {
    style: {
      backgroundColor: 'transparent',
      borderRadius: '24px',
    },
  },
  headRow: {
    style: {
      backgroundColor: '#2B2B2B',
      minHeight: '64px',
      borderRadius: '24px 24px 0 0',
      border: 'none',
    },
  },
  headCells: {
    style: {
      backgroundColor: 'transparent',
      color: 'white',
      fontSize: '15px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      paddingLeft: '32px',
      paddingRight: '32px',
      paddingTop: '20px',
      paddingBottom: '20px',
    },
  },
  rows: {
    style: {
      minHeight: '56px',
      fontSize: '15px',
      color: '#2B2B2B',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderBottom: '1px solid rgba(229, 231, 235, 0.3)',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: 'rgba(255, 247, 237, 0.9)',
        cursor: 'pointer',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(255, 101, 66, 0.15)',
        borderBottom: '1px solid rgba(255, 101, 66, 0.2)',
      },
      '&:last-child': {
        borderRadius: '0 0 24px 24px',
        borderBottom: 'none',
      },
    },
  },
  cells: {
    style: {
      paddingLeft: '32px',
      paddingRight: '32px',
      paddingTop: '16px',
      paddingBottom: '16px',
    },
  },
  pagination: {
    style: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderTop: '1px solid rgba(229, 231, 235, 0.3)',
      color: '#2B2B2B',
      minHeight: '64px',
      borderRadius: '0 0 24px 24px',
      paddingLeft: '32px',
      paddingRight: '32px',
    },
    pageButtonsStyle: {
      borderRadius: '12px',
      height: '40px',
      width: '40px',
      padding: '0',
      margin: '6px',
      color: '#2B2B2B',
      border: '2px solid transparent',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#FF6542',
        color: 'white',
        border: '2px solid #FF6542',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(255, 101, 66, 0.3)',
      },
      '&:disabled': {
        opacity: 0.4,
        cursor: 'not-allowed',
        transform: 'none',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          color: '#2B2B2B',
          border: '2px solid transparent',
          transform: 'none',
          boxShadow: 'none',
        },
      },
    },
  },
};

gsap.registerPlugin(ScrollTrigger);

const CompaniesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check initial screen size
    setIsMobile(window.innerWidth < 800);
    
    // Add resize listener
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const filteredData = companyData.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const stats = {
    total: companyData.length,
    showing: filteredData.length,
    industries: [...new Set(companyData.map(company => company.industry))].length,
    itCompanies: companyData.filter(company => company.industry === 'IT').length
  };

  return (
    <div className="-mt-36 relative w-screen rounded-t-4xl flex flex-col bg-[#2b2b2b] overflow-hidden text-white">
      {/* Main Content Container */}
      <div className="px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16 max-w-4xl mx-auto">
          <div className="bg-[#3b3b3b] backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-[#343434] hover:border-[#FF6542] transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-2xl lg:text-3xl font-bold text-[#FF6542] mb-2">{stats.total}</div>
            <div className="text-sm lg:text-base text-gray-400">Total Companies</div>
          </div>
          <div className="bg-[#3b3b3b] backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-[#343434] hover:border-[#FF6542] transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-2xl lg:text-3xl font-bold text-[#FF6542] mb-2">{stats.showing}</div>
            <div className="text-sm lg:text-base text-gray-400">Showing</div>
          </div>
          <div className="bg-[#3b3b3b] backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-[#343434] hover:border-[#FF6542] transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-2xl lg:text-3xl font-bold text-[#FF6542] mb-2">{stats.industries}</div>
            <div className="text-sm lg:text-base text-gray-400">Industries</div>
          </div>
          <div className="bg-[#3b3b3b] backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-[#343434] hover:border-[#FF6542] transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-2xl lg:text-3xl font-bold text-[#FF6542] mb-2">{stats.itCompanies}</div>
            <div className="text-sm lg:text-base text-gray-400">IT Companies</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12 lg:mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Search companies or industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 lg:py-5 rounded-2xl border-2 border-[#343434] 
                        focus:border-[#FF6542] focus:outline-none transition-all duration-300
                        text-white placeholder-gray-400 bg-[#3b3b3b] backdrop-blur-sm shadow-2xl
                        text-lg lg:text-xl hover:border-gray-500"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/20 max-w-6xl mx-auto">
          <DataTable
            columns={columns}
            data={filteredData}
            customStyles={customStyles}
            pagination
            paginationPerPage={isMobile ? 12 : 15}
            paginationRowsPerPageOptions={isMobile ? [10, 12, 20] : [10, 15, 25, 50]}
            highlightOnHover
            pointerOnHover
            responsive
            dense={isMobile}
            paginationComponentOptions={{
              rowsPerPageText: 'Companies per page:',
              rangeSeparatorText: 'of',
              selectAllRowsItem: true,
              selectAllRowsItemText: 'All',
            }}
            noDataComponent={
              <div className="py-24 text-center">
                <div className="text-gray-400 text-xl mb-4">No companies found</div>
                <div className="text-gray-500 text-base">
                  Try adjusting your search terms
                </div>
              </div>
            }
          />
        </div>
        
        {/* Footer Info */}
        <div className="text-center mt-16 lg:mt-20 text-base lg:text-lg text-gray-400 max-w-3xl mx-auto px-4">
          <p className="leading-relaxed">
            Companies are listed based on career fair participation and may not reflect 
            current hiring status. Please visit individual company websites for the most 
            up-to-date information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompaniesTable;
