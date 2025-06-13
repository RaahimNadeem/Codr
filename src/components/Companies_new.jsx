import React, { useState } from "react";
import companyData from "./Companies/companyData";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Company Name",
    selector: (row) => row.name,
    sortable: true,
    reorder: true,
    style: {
      fontWeight: '500',
    },
  },
  {
    name: "Industry",
    selector: (row) => row.industry,
    sortable: true,
    reorder: true,
    style: {
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
      paddingLeft: '24px',
      paddingRight: '24px',
    },
  },
  rows: {
    style: {
      minHeight: '48px',
      fontSize: '14px',
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
      paddingLeft: '24px',
      paddingRight: '24px',
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

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredData = companyData.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-[#F4F2ED]">
      {/* Navbar spacing */}
      <div className="h-20"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-[#FF6542] mb-8 
                         hover:text-[#2b2b2b] transition-colors duration-700">
            companies
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-[#2b2b2b] leading-relaxed 
                        max-w-4xl mx-auto mb-8">
            This is a list of IT companies in Pakistan, based on those that have
            visited my university's career fair over the years. You can go through 
            each company to check who is currently hiring or actively recruiting.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="Search companies or industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-full border-2 border-gray-200 
                        focus:border-[#FF6542] focus:outline-none transition-colors
                        text-[#2b2b2b] placeholder-gray-400 bg-white shadow-sm"
            />
          </div>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <span>{companyData.length} Total Companies</span>
            <span>{filteredData.length} Showing</span>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <DataTable
            columns={columns}
            data={filteredData}
            customStyles={customStyles}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30, 50]}
            highlightOnHover
            pointerOnHover
            responsive
            dense={window.innerWidth < 800}
            paginationComponentOptions={{
              rowsPerPageText: 'Companies per page:',
              rangeSeparatorText: 'of',
              selectAllRowsItem: true,
              selectAllRowsItemText: 'All',
            }}
            noDataComponent={
              <div className="py-24 text-center">
                <div className="text-gray-400 text-lg mb-4">No companies found</div>
                <div className="text-gray-500 text-sm">
                  Try adjusting your search terms
                </div>
              </div>
            }
          />
        </div>
        
        {/* Footer Info */}
        <div className="text-center mt-12 text-sm text-gray-500 max-w-2xl mx-auto">
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
