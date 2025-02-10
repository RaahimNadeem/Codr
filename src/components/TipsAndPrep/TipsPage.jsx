import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TipsPage = () => {
    const tips = [
        {
          number: "01",
          title: "01. Leetcode Is Your Friend.",
          description:
            "Yes, I know. You’ve heard this a thousand times already, and it’s tempting to roll your eyes and write it off as the lazy, cookie-cutter advice that it is. But here’s the thing: it’s also true. I cannot overstate how many of the technical questions I faced in interviews were pulled directly from Leetcode. Like, literally copy-pasted. So, please, for the love of all that is good, don’t wait until the night before your technical interview to dive in. Start now. Focus on easy-to-medium difficulty questions.",
          videoSrc: "/Videos/Leetcode.mp4",
        },
        {
          number: "02",
          title: "02. Your Resume Is Not a Personality Test.",
          description:
            "You don’t need to cram your resume with hobbies or extracurriculars—unless they directly relate to the job you’re applying for. What employers care about is whether you can do the job they’re hiring for. Period. So use that precious resume real estate wisely. List your tech stack, libraries, tools, frameworks, whatever. The stuff that actually matters.",
          videoSrc: "/Videos/Resume.mp4",
        },
        {
          number: "03",
          title: "03. Ask Yourself What You Actually Want to Do.",
          description:
            "Hear me out: just because you graduated as a CS major doesn’t mean you have no choice but to become a software engineer (if that makes you miserable). If you don’t like coding, there are plenty of adjacent roles—product management, UX design, technical writing—that let you leverage your technical background without chaining you to a lifetime of debugging someone else’s spaghetti code.",
          videoSrc: "/Videos/Want.mp4",
        },
        {
          number: "04",
          title: "04. Salary Isn’t Everything. (But It’s Not Nothing Either.)",
          description:
            "Salary is undeniably important but don’t make it your only factor. A job that pays slightly less but offers a supportive team, growth opportunities, and reasonable work-life balance is often worth more in the long run than a high-paying one that leaves you miserable. That said, don’t let anyone guilt you into accepting an exploitative offer in the name of ‘learning opportunities.’ Know your worth, but also keep the bigger picture in mind.",
          videoSrc: "/Videos/Salary.mp4",
        },
        {
          number: "05",
          title: "05. Work Is Work. Period.",
          description:
            "Many might disagree with me but the whole ‘find a job you love and you’ll never work a day in your life’ thing? It’s a myth. Every job, no matter how dreamy it seems, eventually becomes work. Because deadlines. Because performance reviews. Because corporate bureaucracy. What you should aim for is a job you don’t actively hate. A job that lets you live your life and pursue the things that actually bring you joy.",
          videoSrc: "/Videos/Work.mp4",
        },
        {
          number: "06",
          title: "06. Don’t overlook Glassdoor.",
          description:
            "It’s an excellent resource for getting insights into a company’s interview process, employee reviews, pros and cons, and even a basic idea of their salary packages. While it’s not always 100% accurate or up-to-date, it’s incredibly helpful as a starting point.",
          videoSrc: "/Videos/Glassdoor.mp4",
        },
      ];
    

  const sectionRefs = useRef([]);
  sectionRefs.current = [];

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      const circle = section.querySelector(".circle-number");
      const video = section.querySelector(".video-container video");

      gsap.set(circle, { backgroundColor: "transparent", color: "white", borderColor: "white" });
      gsap.set(video, { scale: 0.9, opacity: 0 });

   

      // Video Scale & Fade-In
      gsap.to(video, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          scrub: true, // Reacts to scroll speed
        },
      });
    });
  }, []);

  return (
    <div className="-mt-36 relative w-screen rounded-t-4xl flex flex-col bg-[#2b2b2b] p-10 overflow-hidden text-white">
      {tips.map((tip, index) => (
        <div
          key={index}
          ref={addToRefs}
          className="flex mt-12 md:mt-0 flex-col md:h-screen w-full md:items-center"
        >
          <div
            className={`flex flex-col md:flex-row flex-1 items-stretch justify-center gap-x-16 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Left Side - Tip Text */}
            <div className="flex-1 flex flex-col justify-center text-left p-6 md:p-10">
              <h2 className="text-2xl md:text-4xl xl:text-6xl font-bold">
                {tip.title}
              </h2>
              <p className="text-base md:text-lg xl:text-xl mt-4 md:mt-6">
                {tip.description}
              </p>
            </div>

            {/* Vertical Divider with Circle */}
            <div className="relative flex items-center">
              {/* White Line */}
              <div className="hidden md:flex w-[2px] h-full bg-white"></div>

              {/* Circle with Number */}
              <div
                className="hidden sm:flex absolute left-1/2 -translate-x-1/2 
                bg-[#2b2b2b] text-white font-bold text-lg md:text-2xl 
                flex items-center justify-center w-12 h-12 md:w-16 md:h-16 
                rounded-full border-2 border-white circle-number"
              >
                {tip.number}
              </div>
            </div>

            {/* Right Side - Video */}
            {tip.videoSrc && (
              <div className="flex-1 flex justify-center items-center p-10 video-container">
                <video
                  className="w-9/10 h-5/10 object-cover rounded-lg"
                  src={tip.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                ></video>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TipsPage;
