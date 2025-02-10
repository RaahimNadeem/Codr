const Hero = () => {
    return (
      <div className="relative h-dvh w-screen overflow-x-hidden">
        {/* Main Page Background */}
        <div
          id="main-page"
          className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-[#F4F2ED]"
        >
          {/* Title */}
          <div className="absolute left-0 top-0 z-40 size-full">
            <div className="mt-20 px-5 sm:px-24">
              <div className="text-9xl font-bold text-[#FF6542]">codr</div>
              <div className="mt-10 text-xl sm:mt-18 lg:mt-30 sm:text-2xl md:w-3/4 lg:w-3/4 xl:w-3/4 2xl:w-1/2 px-5 md:px-24 xl:px-48">
                Think of <span className="font-bold">Codr</span> as your go-to
                guide for navigating the sometimes overwhelming world after
                graduation.

                         {/* Contact Information for sm and larger screens - Bottom Left */}
            <div className="hidden sm:flex absolute bottom-10 sm:w-1/3 md:w-3/9 lg:w-3/8 justify-between text-xs font-mono uppercase">
              <div className="w-1/3 text-gray-700 text-left">
                <p>GOT QUESTIONS? <br /> I'M HERE TO HELP</p>
              </div>
  
              <div className="w-1/3 sm:w-1/4 text-black font-bold text-left">
                <p>
                  IF THIS SITE <br /> DOESN'T HAVE <br /> EVERYTHING YOU <br /> NEED, FEEL FREE TO <br /> GET IN TOUCH
                </p>
              </div>
  
              <div className="w-1/3 text-gray-700 text-left">
              <a
                  href="mailto:raahim.nade@gmail.com"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EMAIL
                </a>
                <br />
                <a
                  href="https://www.linkedin.com/in/raahim-nadeem/"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LINKEDIN
                </a>
                <br />
                <a
                  href="https://www.instagram.com/raahim.jpeg/"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  INSTAGRAM
                </a>
              </div>
            </div>
              </div>

              

              
            </div>


  
            {/* Contact Information for Mobile (hidden on sm and above) */}
            <div className="relative top-18 w-4/5 mx-auto flex justify-between text-center text-xs font-mono uppercase sm:hidden">
              <div className="w-1/4 text-gray-700 text-left">
                <p>GOT QUESTIONS? I'M HERE TO HELP</p>
              </div>
  
              <div className="w-1/4 text-black font-bold text-left">
                <p>
                  If this site doesn't have everything you need, feel free to
                  reach out
                </p>
              </div>
  
              <div className="w-1/4 text-gray-700 text-left">
                <a
                  href="mailto:raahim.nade@gmail.com"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EMAIL
                </a>
                <br />
                <a
                  href="https://www.linkedin.com/in/raahim-nadeem/"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <br />
                <a
                  href="https://www.instagram.com/raahim.jpeg/"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>
            </div>
  
   
          </div>
  
          {/* Bottom-Right Image */}
          <img
            src="../public/portrait.png"
            alt="Portrait"
            className="absolute bottom-0 max-w-5/10 left-1/2 transform -translate-x-1/2 sm:w-1/3 md:translate-x-1/3 sm:translate-x-1/5 lg:translate-x-1/5"
          />
        </div>
      </div>
    );
  };
  
  export default Hero;
  