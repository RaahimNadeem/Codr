const ResumeGeneratorTitlePage = () => {
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
            resume generator
          </div>

          {/* Description */}
          <div className="mt-12 text-md lg:text-2xl w-3/4 sm:w-2/3 lg:w-1/2">
            Create a professional resume using Jake's LaTeX template. This generator 
            produces clean, ATS-friendly resumes that have helped countless students 
            land their dream jobs. Simply fill in your details and get a polished 
            resume in seconds.
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

export default ResumeGeneratorTitlePage;
