import React from "react";
import companyData from "./companyData";
import "./styles.css"; // Ensure you import your CSS file
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Company Name",
    selector: (row) => row.name,
    sortable: true,
    reorder: true,
  },
  {
    name: "Industry",
    selector: (row) => row.industry,
    sortable: true,
    reorder: true,
  },
];

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#2B2B2B", // Change header background color
      color: "white", // Change text color
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center",
    },
  },
  rows: {
    style: {
      minHeight: "60px", // Adjust row height
      fontSize: "16px",
      color: "#333",
      backgroundColor: "#fff",
      "&:nth-of-type(odd)": {
        backgroundColor: "#f9f9f9", // Alternating row colors
      },
      "&:hover": {
        backgroundColor: "#FFEDD5", // Highlight on hover
        cursor: "pointer",
      },
    },
  },
  cells: {
    style: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
    },
  },
};

const Companies = () => {
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden flex justify-center items-center p-5 bg-[#F4F2ED]">
      <div className="relative z-10 h-dvh w-screen flex flex-col items-center text-center p-5">
        {/* Title */}
        <h1 className="text-7xl sm:text-8xl mt-22 font-bold text-black hover:text-[#FF6542] transition-colors duration-700">
          companies
        </h1>

        {/* Description */}
        <p className="mt-8 sm:mt-14 lg:mt-16 text-lg w-4/5 sm:w-1/2 leading-relaxed text-left text-gray-800">
          This is a list of IT companies in Pakistan, based on those that have
          visited my university’s career fair over the years. I’ll do my best to
          keep it updated as things change.
        </p>

        {/* Table of Companies */}
        <div className="overflow-x-auto custom-scrollbar mt-10 w-4/5 sm:3/4 overflow-y-auto rounded-xl">
          <DataTable
            columns={columns}
            data={companyData}
            customStyles={customStyles}
            fixedHeader
            fixedHeaderScrollHeight="550px" // Set the scroll height for the table body
          />
        </div>
      </div>
    </div>
  );
};

export default Companies;
