const CompaniesTitlePage = () => {
  return (
    <>
      <div className="relative h-dvh w-screen flex flex-col bg-[#F4F2ED] justify-center items-center overflow-hidden">
        {/* Main Page Background */}
        <div
          id="main-page"
          className="relative z-10 flex flex-col items-center text-center p-5"
        >
          {/* Title */}
          <div className="text-6xl lg:text-9xl font-bold text-[#FF6542] hover:text-[#2b2b2b] transition-colors duration-700">
            companies
          </div>

          {/* Description */}
          <div className="mt-12 text-md lg:text-2xl w-3/4 sm:w-2/3 lg:w-1/2">
            This is a list of IT companies in Pakistan, based on those that have
            visited my university's career fair over the years. You can explore 
            each company to check who is currently hiring or actively recruiting. 
            Use this as your starting point for job hunting!
          </div>

          {/* Scroll Down Indication */}
          <div className="mt-12 animate-bounce text-md lg:text-lg text-gray-600">
            Scroll down ↓
          </div>
        </div>
      </div>
    </>
  );
};

export default CompaniesTitlePage;
