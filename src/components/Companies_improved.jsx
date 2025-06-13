import React, { useState, useMemo } from "react";
import companyData from "./Companies/companyData";
import "./styles.css";
import DataTable from "react-data-table-component";

const Companies = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");

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
      grow: 2,
      style: {
        fontSize: '14px',
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
        fontSize: '14px',
      },
      cell: (row) => (
        <span className="px-2 py-1 bg-[#FF6542] text-white text-xs rounded-full">
          {row.industry}
        </span>
      ),
    },
  ];

  const customStyles = {
    table: {
      style: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
    headRow: {
      style: {
        backgroundColor: "#2B2B2B",
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        border: 'none',
        minHeight: '56px',
      },
    },
    headCells: {
      style: {
        color: "white",
        fontSize: "14px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        paddingLeft: '16px',
        paddingRight: '16px',
      },
    },
    rows: {
      style: {
        minHeight: "52px",
        fontSize: "14px",
        color: "#374151",
        backgroundColor: "#fff",
        borderBottomWidth: '1px',
        borderBottomColor: '#e5e7eb',
        '&:nth-of-type(odd)': {
          backgroundColor: "#f9fafb",
        },
        '&:hover': {
          backgroundColor: "#fef3c7",
          transform: "scale(1.001)",
          transition: "all 0.2s ease",
        },
        '&:last-of-type': {
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
        },
      },
    },
    cells: {
      style: {
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '12px',
        paddingBottom: '12px',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#f9fafb',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
        borderTop: '1px solid #e5e7eb',
        minHeight: '56px',
      },
      pageButtonsStyle: {
        borderRadius: '6px',
        height: '32px',
        width: '32px',
        padding: '4px',
        margin: '2px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backgroundColor: 'transparent',
        border: '1px solid #d1d5db',
        color: '#374151',
        '&:hover:not(:disabled)': {
          backgroundColor: '#FF6542',
          color: 'white',
          borderColor: '#FF6542',
        },
        '&:disabled': {
          cursor: 'not-allowed',
          opacity: 0.5,
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
    <div className="min-h-screen w-full bg-[#F4F2ED] px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#FF6542] hover:text-[#2b2b2b] transition-colors duration-700 mb-6">
            companies
          </h1>
          <p className="text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed text-[#2b2b2b] mb-8">
            This is a list of IT companies in Pakistan, based on those that have
            visited my university's career fair over the years. You can go through each company to check who is currently hiring or actively recruiting.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
            <div className="text-2xl font-bold text-[#FF6542]">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Companies</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
            <div className="text-2xl font-bold text-[#FF6542]">{industries.length}</div>
            <div className="text-sm text-gray-600">Industries</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
            <div className="text-2xl font-bold text-[#FF6542]">{stats.industryCount['IT'] || 0}</div>
            <div className="text-sm text-gray-600">IT Companies</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
            <div className="text-2xl font-bold text-[#FF6542]">{stats.industryCount['Fin-Tech'] || 0}</div>
            <div className="text-sm text-gray-600">Fin-Tech Companies</div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Companies
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by company name or industry..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-[#FF6542] transition-colors"
              />
            </div>
            <div className="sm:w-64">
              <label htmlFor="industry-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Industry
              </label>
              <select
                id="industry-filter"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6542] focus:border-[#FF6542] transition-colors"
              >
                <option value="">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <DataTable
            columns={columns}
            data={filteredData}
            customStyles={customStyles}
            pagination
            paginationPerPage={15}
            paginationRowsPerPageOptions={[10, 15, 25, 50]}
            paginationComponentOptions={paginationComponentOptions}
            fixedHeader
            fixedHeaderScrollHeight="60vh"
            noDataComponent={
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">No companies found</div>
                <div className="text-gray-500 text-sm">
                  Try adjusting your search criteria or filters
                </div>
              </div>
            }
            responsive
          />
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Showing {filteredData.length} of {companyData.length} companies
            {selectedIndustry && ` in ${selectedIndustry}`}
            {searchText && ` matching "${searchText}"`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Companies;
