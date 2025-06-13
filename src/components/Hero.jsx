const Hero = () => {
  return (
    <>
      <style jsx>{`
        .hero-image {
          @media (max-height: 780px) {
            width: 360px !important;
            max-width: 28vw !important;
          }
        }
      `}</style>
      <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Main Page Background */}
      <div
        id="main-page"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-[#F4F2ED]"
      >
        {/* Title */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 lg:mt-4 px-5 sm:px-24">
            <div className="text-9xl font-bold text-[#FF6542] lg:text-[12rem] xl:text-[16rem]">codr</div>
            <div className="mt-10 text-xl sm:mt-18 lg:mt-18 sm:text-2xl xl:text-3xl md:w-3/4 lg:w-3/4 xl:w-3/4 2xl:w-3/5 ">
              <div className="px-5 md:px-24 xl:px-64">
                Think of <span className="font-bold">codr</span> as your go-to
                guide for navigating the sometimes overwhelming world after
                graduation.
              </div>
              
             
              
          
              {/* Poem*/}
              <div className="hidden 2xl:flex mt-10 lg:mt-20 xl:mt-20 w-1/4 text-grey-700 text-xs font-mono opacity-50">
                <p>
                  "It matters not how strait the gate, <br />
                  How charged with punishments the scroll, <br />
                  I am the master of my fate, <br />
                  I am the captain of my soul.” <br /> <br />- Invictus by
                  William Ernest Henley
                </p>
              </div>

              {/* Contact Information for sm and larger screens - Bottom Left */}
              <div className="hidden sm:flex absolute bottom-6 mt-10 sm:w-1/3 md:w-3/9 lg:w-3/8 justify-between text-xs font-mono uppercase">
                <div className="w-1/4 md:w-1/4 text-gray-700 text-left ">
                  <p>GOT QUESTIONS? I'M HERE TO HELP</p>
                </div>

                <div className="w-1/4 md:w-1/6 text-black font-bold text-left">
                  <p>
                    If you can't find what you need, feel free to reach out.
                  </p>
                </div>

                <div className="w-1/4 md:w-1/6 text-gray-700 text-left">
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
          <div className="relative top-12 w-4/5 mx-auto  flex justify-between text-center text-xs font-mono uppercase sm:hidden">
            <div className="w-1/4 text-gray-700 text-left">
              <p>GOT QUESTIONS? I'M HERE TO HELP</p>
            </div>

            <div className="w-1/4 text-black font-bold text-left hidden">
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
          src="/Videos/Portrait.png"
          alt="Portrait"
          className="hero-image absolute bottom-0 max-w-5/10 left-1/2 transform -translate-x-1/2 sm:w-1/3 md:translate-x-1/3 sm:translate-x-1/5 lg:translate-x-1/5 
                     w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] xl:w-[550px]
                     max-w-[25vw] md:max-w-[30vw] lg:max-w-[35vw] xl:max-w-[40vw]"
        />
      </div>
    </div>
    </>
  );
};

export default Hero;
