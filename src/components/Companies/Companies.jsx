import React, { useEffect } from 'react'
import CompaniesTitle from './CompaniesTitle';
import CompaniesTable from './CompaniesTable';

const Companies = () => {
  useEffect(() => {
      // Scroll to top of the page when the component is mounted
      window.scrollTo(0, 0);
    }, []);
  return (
    <main className="relative bg-[#F4F2ED] min-h-screen w-screen overflow-x-hidden">
        <CompaniesTitle />
        <CompaniesTable/>
    </main>
  )
}

export default Companies
