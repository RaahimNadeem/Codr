const TitlePage = () => {
  return (
    <>
      <div className="relative h-dvh w-screen flex flex-col bg-[#F4F2ED] justify-center items-center  overflow-hidden">
        {/* Main Page Background */}
        <div
          id="main-page"
          className="relative z-10 flex flex-col items-center text-center p-5"
        >
          {/* Title */}
          <div className=" text-6xl lg:text-9xl font-bold text-[#FF6542] hover:text-[#2b2b2b] transition-colors duration-700">
            resources
          </div>

          {/* Description */}
          <div className="mt-12 text-md lg:text-2xl w-3/4 sm:w-2/3 lg:w-1/2">
            When I was navigating this journey, I wish I had a clearer map of
            resources to guide me. That’s why I’m sharing these tools and
            resources with you—so you don’t have to go through the same
            struggles I did. If they help you even a fraction as much as they
            helped me, then they’re doing their job. Take advantage of them and
            build your foundation!{" "}
          </div>

          {/* Scroll Down Indication */}
          <div className="mt-12  animate-bounce text-md lg:text-lg text-gray-600">
            Scroll down ↓
          </div>
        </div>
      </div>
    </>
  );
};

export default TitlePage;
