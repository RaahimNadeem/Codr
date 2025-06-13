const Hero = () => {
  return (
    <>
      <style jsx>{`
        .hero-image {
          /* Mobile (portrait orientation) - 50% of viewport height */
          height: 50vh;
          width: auto;
          object-fit: contain;
        }
        
        /* Desktop and larger screens - 50% of viewport width */
        @media (min-width: 768px) {
          .hero-image {
            width: 50vw;
            height: auto;
            max-height: 80vh;
          }
        }
        
        /* Landscape mobile - use width instead of height */
        @media (max-height: 600px) and (orientation: landscape) {
          .hero-image {
            width: 50vw;
            height: auto;
            max-height: 70vh;
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
          className="hero-image absolute bottom-0 
                     left-1/2 transform -translate-x-1/2
                     md:left-auto md:right-0 md:translate-x-0"
        />
      </div>
    </div>
    </>
  );
};

export default Hero;
