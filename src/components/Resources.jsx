import React from "react";
import { FaFileAlt, FaCode, FaLaptopCode, FaBook, FaGraduationCap, FaBuilding, FaShieldAlt, FaQuestionCircle } from "react-icons/fa";

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
];

const Resources = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-10 bg-[#F4F2ED]">
      {/* Title */}
      <h1 className="text-7xl sm:text-8xl mt-22 font-bold text-black hover:text-[#FF6542] transition-colors duration-700">
        Resources
      </h1>

      {/* Description */}
      <p className="mt-6 sm:mt-10 text-xl text-gray-700 text-center w-4/5 sm:w-1/2">
        A carefully curated list of resources to help you with resumes, coding interviews, job search, and technical skills.
      </p>

      {/* Resource List */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-10">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-500 hover:-translate-y-1 border border-gray-200"
          >
            {resource.icon}
            <h3 className="mt-4 text-2xl font-semibold text-black group-hover:text-[#FF6542] transition duration-300">
              {resource.title}
            </h3>
            <p className="mt-2 text-gray-600">{resource.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Resources;
