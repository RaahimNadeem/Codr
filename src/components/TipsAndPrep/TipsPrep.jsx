import React, { useEffect } from 'react'
import TipsPage from './TipsPage'
import TitlePage from './TitlePage'


const TipsPrep = () => {
  useEffect(() => {
      // Scroll to top of the page when the component is mounted
      window.scrollTo(0, 0);
    }, []);
  return (
    <main className="relative bg-[#F4F2ED] min-h-screen w-screen overflow-x-hidden">
        <TitlePage />
        <TipsPage/>
    </main>
  )
}

export default TipsPrep
