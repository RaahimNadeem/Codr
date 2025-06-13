import React, { useState, useMemo, useEffect } from "react";
import companyData from "./Companies/companyData";
import "./styles.css";
import DataTable from "react-data-table-component";

const Companies = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Scroll to top of the page when the component is mounted
    window.scrollTo(0, 0);
    
    // Check initial screen size
    setIsMobile(window.innerWidth < 800);
    
    // Add resize listener
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get unique industries for filter
  const industries = useMemo(() => {
    const unique = [...new Set(companyData.map(company => company.industry))].sort();
    return unique;
  }, []);

  // Filter companies based on search and industry
  const filteredData = useMemo(() => {
    return companyData.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchText.toLowerCase()) ||
                           company.industry.toLowerCase().includes(searchText.toLowerCase());
      const matchesIndustry = selectedIndustry === "" || company.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    });
  }, [searchText, selectedIndustry]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = filteredData.length;
    const industryCount = {};
    filteredData.forEach(company => {
      industryCount[company.industry] = (industryCount[company.industry] || 0) + 1;
    });
    return { total, industryCount };
  }, [filteredData]);

  const columns = [
    {
      name: "Company Name",
      selector: (row) => row.name,
      sortable: true,
      reorder: true,
      grow: isMobile ? 3 : 2,
      style: {
        fontSize: isMobile ? '13px' : '14px',
        fontWeight: '500',
      },
    },
    {
      name: "Industry",
      selector: (row) => row.industry,
      sortable: true,
      reorder: true,
      grow: 1,
      style: {
        fontSize: isMobile ? '12px' : '14px',
        color: '#FF6542',
        fontWeight: '500',
      },
    },
  ];

  const customStyles = {
    table: {
      style: {
        backgroundColor: 'transparent',
      },
    },
    headRow: {
      style: {
        backgroundColor: '#2B2B2B',
        minHeight: '56px',
        borderRadius: '12px 12px 0 0',
      },
    },
    headCells: {
      style: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        paddingLeft: isMobile ? '12px' : '24px',
        paddingRight: isMobile ? '12px' : '24px',
      },
    },
    rows: {
      style: {
        minHeight: '48px',
        fontSize: isMobile ? '13px' : '14px',
        color: '#2B2B2B',
        backgroundColor: 'white',
        borderBottom: '1px solid #E5E7EB',
        '&:hover': {
          backgroundColor: '#FFF7ED',
          cursor: 'pointer',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        '&:last-child': {
          borderRadius: '0 0 12px 12px',
        },
      },
    },
    cells: {
      style: {
        paddingLeft: isMobile ? '12px' : '24px',
        paddingRight: isMobile ? '12px' : '24px',
        paddingTop: '12px',
        paddingBottom: '12px',
      },
    },
    pagination: {
      style: {
        backgroundColor: 'transparent',
        borderTop: '1px solid #E5E7EB',
        color: '#2B2B2B',
        minHeight: '56px',
      },
      pageButtonsStyle: {
        borderRadius: '8px',
        height: '36px',
        width: '36px',
        padding: '0',
        margin: '4px',
        color: '#2B2B2B',
        '&:hover': {
          backgroundColor: '#FF6542',
          color: 'white',
        },
      },
    },
  };

  const paginationComponentOptions = {
    rowsPerPageText: 'Rows per page:',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-[#2b2b2b]">
      {/* Title Page Section */}
      <div className="relative h-dvh w-screen flex flex-col bg-[#2b2b2b] justify-center items-center overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center p-5">
          {/* Title */}
          <div className="text-6xl lg:text-9xl font-bold text-[#FF6542] hover:text-white transition-colors duration-700">
            companies
          </div>

          {/* Description */}
          <div className="mt-12 text-md lg:text-2xl w-3/4 sm:w-2/3 lg:w-1/2 text-gray-300">
            This is a list of IT companies in Pakistan, based on those that have
            visited my university's career fair over the years. You can go through each company to check who is currently hiring or actively recruiting.
          </div>

          {/* Scroll Down Indication */}
          <div className="mt-12 animate-bounce text-md lg:text-lg text-gray-400">
            Scroll down ↓
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-12">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search companies or industries..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-6 py-3 rounded-full border-2 border-gray-600 
                      focus:border-[#FF6542] focus:outline-none transition-colors
                      text-white placeholder-gray-400 bg-gray-800 shadow-lg"
          />
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-8 text-sm text-gray-400 mb-8">
          <span>{stats.total} Total Companies</span>
          <span>{filteredData.length} Showing</span>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <DataTable
            columns={columns}
            data={filteredData}
            customStyles={customStyles}
            pagination
            paginationPerPage={isMobile ? 15 : 20}
            paginationRowsPerPageOptions={isMobile ? [10, 15, 25] : [10, 20, 30, 50]}
            paginationComponentOptions={{
              rowsPerPageText: 'Companies per page:',
              rangeSeparatorText: 'of',
              selectAllRowsItem: true,
              selectAllRowsItemText: 'All',
            }}
            fixedHeader
            fixedHeaderScrollHeight={isMobile ? "60vh" : "70vh"}
            noDataComponent={
              <div className="py-24 text-center">
                <div className="text-gray-400 text-lg mb-4">No companies found</div>
                <div className="text-gray-500 text-sm">
                  Try adjusting your search terms
                </div>
              </div>
            }
            responsive
            dense={isMobile}
            highlightOnHover
            pointerOnHover
          />
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 text-sm text-gray-400 max-w-2xl mx-auto">
          <p>
            Companies are listed based on career fair participation and may not reflect 
            current hiring status. Please visit individual company websites for the most 
            up-to-date information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Companies;
