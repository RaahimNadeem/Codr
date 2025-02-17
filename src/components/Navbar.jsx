import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Tips & Prep", path: "/tips-prep" },
  { name: "Resources", path: "/resources" },
  { name: "Companies", path: "/companies" },
];

const NavBar = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolledUp, setIsScrolledUp] = useState(false); // Track scroll direction
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  // Hide or show navbar based on scroll direction
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      setIsScrolledUp(false); // At the top, no need for inverse colors
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      setIsScrolledUp(false); // Scrolling down, no inverse colors
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      setIsScrolledUp(true); // Scrolling up, apply inverse colors
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Apply GSAP animation for showing/hiding navbar
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className={`fixed inset-x-0 top-4 z-50 h-16 transition-all duration-700 sm:inset-x-6 rounded-xl ${
        isScrolledUp ? "bg-[#121212] text-white" : "bg-transparent text-black"
      }`}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex items-center justify-end pr-5 sm:pr-24">
          <div className="flex items-center gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="relative text-xs sm:text-sm uppercase font-medium transition duration-300 
                          before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full 
                          before:origin-left before:scale-x-0 before:bg-white before:transition-transform 
                          before:duration-300 hover:before:scale-x-100"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
