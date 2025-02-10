import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TipsPage = () => {
  const tips = [
    {
      number: "01",
      title: "01. Leetcode Is Your Friend.",
      description:
        "Yes, I know. You’ve heard this a thousand times already, and it’s tempting to roll your eyes and write it off as the lazy, cookie-cutter advice that it is. But here’s the thing: it’s also true...",
    },
    {
      number: "02",
      title: "02. Your Resume Is Not a Personality Test.",
      description:
        "You don’t need to cram your resume with hobbies or extracurriculars—unless they directly relate to the job you’re applying for...",
    },
    {
      number: "03",
      title: "03. Ask Yourself What You Actually Want to Do.",
      description:
        "Hear me out: just because you graduated as a CS major doesn’t mean you have no choice but to become a software engineer...",
    },
    {
      number: "04",
      title: "04. Salary Isn’t Everything. (But It’s Not Nothing Either.)",
      description:
        "Salary is undeniably important but don’t make it your only factor...",
    },
    {
      number: "05",
      title: "05. Work Is Work. Period.",
      description:
        "Many might disagree with me but the whole ‘find a job you love and you’ll never work a day in your life’ thing? It’s a myth...",
    },
    {
      number: "06",
      title: "06. Don’t overlook Glassdoor.",
      description:
        "It’s an excellent resource for getting insights into a company’s interview process, employee reviews, pros and cons...",
    },
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP Animation
    gsap.fromTo(
      ".tip-item",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "bottom 10%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="relative w-screen flex flex-col bg-[#2b2b2b] overflow-hidden text-white p-6">
      {tips.map((tip, index) => (
        <motion.div
          key={index}
          className="tip-item flex flex-col md:flex-row md:h-dvh w-full md:items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          {/* Left Side - Tip Text */}
          <div className="flex-1 flex flex-col mt-12 md:mt-48 justify-center p-6 md:p-10">
            <h2 className="text-2xl md:text-4xl xl:text-6xl font-bold">
              {tip.title}
            </h2>
            <p className="text-base md:text-lg xl:text-xl mt-4 md:mt-6">
              {tip.description}
            </p>
          </div>

          {/* Middle Divider with Tip Number */}
          <div className="hidden md:flex relative items-center">
            {/* Thin Vertical Line */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-white transform -translate-x-1/2"></div>

            {/* Tip Number */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="w-16 flex justify-center items-center z-10"
            >
              <div className="border-2 border-white bg-[#2b2b2b] text-white px-4 py-2 rounded-full font-bold text-lg lg:text-2xl">
                {tip.number}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Placeholder for Graphic */}
          <div className="hidden md:flex flex-1 justify-center items-center p-10">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              className="w-32 h-32 md:w-48 md:h-48 bg-gray-700 rounded-full flex justify-center items-center"
            >
              <span className="text-lg md:text-2xl lg:text-3xl">📌</span>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TipsPage;
