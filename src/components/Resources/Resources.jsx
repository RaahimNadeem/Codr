import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFileAlt, FaCode, FaLaptopCode, FaBook, FaGraduationCap, FaBuilding, FaShieldAlt, FaQuestionCircle, FaExclamationCircle } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const resources = [
  {
    title: "Resume Template (Overleaf)",
    description: "A professional LaTeX resume template for a clean, ATS-friendly design.",
    link: "https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs",
    icon: <FaFileAlt className="text-3xl text-[#FF6542]" />,
  },
  {
    title: "LeetCode Practice (NeetCode)",
    description: "Structured roadmap for preparing for FAANG-level coding interviews.",
    link: "https://neetcode.io/roadmap",
    icon: <FaCode className="text-3xl text-[#2D9CDB]" />,
  },
  {
    title: "Technical Interview Prep (HackerRank)",
    description: "Practice coding problems that companies use in online assessments.",
    link: "https://www.hackerrank.com/",
    icon: <FaLaptopCode className="text-3xl text-[#27AE60]" />,
  },
  {
    title: "Project-Based Learning (GitHub)",
    description: "A collection of real-world coding projects for various stacks and languages.",
    link: "https://github.com/practical-tutorials/project-based-learning",
    icon: <FaBook className="text-3xl text-[#F2994A]" />,
  },
  {
    title: "Free Paid Courses (HacksNation)",
    description: "A platform that shares premium courses for free in various domains.",
    link: "https://hacksnation.com/",
    icon: <FaGraduationCap className="text-3xl text-[#9B51E0]" />,
  },
  {
    title: "Tech Companies in Pakistan (GitHub)",
    description: "An extensive list of software companies in Pakistan, useful for job seekers.",
    link: "https://github.com/hamza121star/tech-companies-in-pakistan",
    icon: <FaBuilding className="text-3xl text-[#3498DB]" />,
  },
  {
    title: "Cybersecurity Companies in Pakistan (GitHub)",
    description: "A directory of cybersecurity firms operating in Pakistan.",
    link: "https://github.com/huzaifahere/cyber-security-companies-in-pakistan",
    icon: <FaShieldAlt className="text-3xl text-[#E74C3C]" />,
  },
  {
    title: "Technical Interview Questions Guide (GitHub)",
    description: "A collection of real interview questions asked at Pakistani tech companies.",
    link: "https://github.com/UsmanGill-UG/Technical-Interview-Questions-Guide",
    icon: <FaQuestionCircle className="text-3xl text-[#8E44AD]" />,
  },
  {
    title: "Data Science Cheatsheet",
    description: "A comprehensive overview of data science topics. Perfect for anyone learning data science.",
    link: "https://github.com/aaronwangy/Data-Science-Cheatsheet/blob/main/Data_Science_Cheatsheet.pdf",
    icon: <FaFileAlt className="text-3xl text-[#FF6542]" />,
  },
  {
    title: "Leetcode SQL 50",
    description: "A great resource for practicing SQL for coding interviews, especially for database roles (but some SWE interviews might also throw some SQL questions your way).",
    link: "https://leetcode.com/studyplan/top-sql-50/",
    icon: <FaCode className="text-3xl text-[#2D9CDB]" />,
  },
  {
    title: "SQL Basics Cheat Sheet",
    description: "A cheatsheet to quickly refresh your knowledge on SQL basics.",
    link: "https://learnsql.com/blog/sql-basics-cheat-sheet/",
    icon: <FaLaptopCode className="text-3xl text-[#27AE60]" />,
  },
  {
    title: "How to NOT Fail a Technical Interview",
    description: "A YouTube video with valuable tips on acing technical interviews.",
    link: "https://www.youtube.com/watch?v=1t1_a1BZ04o&t=125s",
    icon: <FaBook className="text-3xl text-[#F2994A]" />,
  },
  {
    title: "The Most Important Resource EVER",
    description: "If there's only one resource you end of using out of all these, let it be this.",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    icon: <FaExclamationCircle  className="text-3xl text-[#9B51E0]" />,
  },
];

const Resources = () => {
  const sectionRefs = useRef([]);
  sectionRefs.current = [];

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      const card = section.querySelector(".resource-card");
      
      gsap.set(card, { opacity: 0 });
      
      gsap.to(card, {
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <div className="-mt-36 relative w-screen rounded-t-4xl flex flex-col bg-[#2b2b2b] p-10 overflow-hidden text-white">      
      <div className="grid mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {resources.map((resource, index) => (
          <div
            key={index}
            ref={addToRefs}
            className="resource-card bg-[#333] p-6 rounded-2xl shadow-lg text-center flex flex-col items-center"
          >
            <div className="icon text-4xl mb-4">{resource.icon}</div>
            <h3 className="text-xl font-semibold mb-4">{resource.title}</h3>
            <p className="text-sm text-gray-300 mb-4">{resource.description}</p>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6542] hover:text-white transition-colors duration-300"
            >
              Visit Resource
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
