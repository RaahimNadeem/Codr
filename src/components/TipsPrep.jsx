import { useState } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBookOpen } from "react-icons/fa";

const TipsPrep = () => {
  const [stage, setStage] = useState(null);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden flex justify-center items-center">
      {/* Main Page Background */}
      <div
        id="main-page"
        className="relative z-10 h-dvh w-screen flex flex-col items-center text-center bg-[#F4F2ED] p-5"
      >
        {/* Title */}
        <motion.div
          className="text-8xl mt-22 font-bold text-black hover:text-[#FF6542] transition-colors duration-700"
        >
          tips & prep
        </motion.div>

        {/* Description */}
        <div className="mt-10 sm:mt-18 lg:mt-22 text-lg w-2/3 sm:w-1/2">
          I remember how much I didn’t know back when I was applying for jobs,
          how many avoidable mistakes I made because no one laid it out clearly.
          So, here’s my attempt to do that. If I can make this whole process even
          1% easier for someone else, I feel like that’s worth doing.
        </div>

        {/* Question Section */}
        <div className="mt-16 text-lg font-semibold">
          <p>Where are you at in your journey? Pick your adventure:</p>
          <div className="flex gap-8 mt-6">
            <motion.button
              className="flex items-center gap-3 px-5 py-3 bg-[#FF6542] text-white rounded-lg shadow-md hover:bg-[#E54A2F] transition"
              whileHover={{ scale: 1.1 }}
              onClick={() => setStage("graduating")}
            >
              <FaGraduationCap className="text-2xl" /> About to graduate
            </motion.button>

            <motion.button
              className="flex items-center gap-3 px-5 py-3 bg-[#4A90E2] text-white rounded-lg shadow-md hover:bg-[#357ABD] transition"
              whileHover={{ scale: 1.1 }}
              onClick={() => setStage("early")}
            >
              <FaBookOpen className="text-2xl" /> Still a few years away
            </motion.button>
          </div>
        </div>

        {/* Display Tips Based on Selection */}
        {stage && (
          <motion.div
            className="mt-12 p-6 bg-white shadow-lg rounded-lg w-3/4 sm:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {stage === "graduating" ? (
              <p>
                Ah, the final boss level! 🎓 Job applications, resumes, interviews,
                and existential crises—don’t worry, I’ve got your back. Let’s
                break it down step by step so you can land that first gig without
                feeling like a deer in headlights.
              </p>
            ) : (
              <div>
                <p>
                  You’ve got time, and that’s a superpower. 🦸‍♂️ This is the phase
                  where you can experiment, explore different fields, and build a
                  killer foundation. Let’s talk about which courses and skills will
                  set you up for an epic future.
                </p>
                <h3 className="mt-6 text-xl font-bold">Course Recommendations</h3>
                <p className="mt-2">
                  Since I’m from LUMS, some of these courses may not exist at your
                  university, but I believe most CS programs will have similar
                  alternatives.
                </p>
                <ul className="mt-4 space-y-2">
                  <li><strong>1. I'm Too Young To Die</strong> - Beginner-friendly courses to get you started.</li>
                  <li><strong>2. Hurt Me Plenty</strong> - A moderate challenge with solid rewards.</li>
                  <li><strong>3. I Am Death Incarnate</strong> - The ultimate test of your endurance and skill.</li>
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TipsPrep;
