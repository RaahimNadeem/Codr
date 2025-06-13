import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Tips & Prep", path: "/tips-prep" },
  { name: "Resources", path: "/resources" },
  { name: "Companies", path: "/companies" },
  { name: "Resume Generator", path: "/resume-generator", isNew: true },
];

const NavBar = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolledUp, setIsScrolledUp] = useState(false); // Track scroll direction
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Close mobile menu when clicking outside or on link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on window resize (when switching to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) { // sm breakpoint
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div
      ref={navContainerRef}
      className={`fixed inset-x-0 top-4 z-50 h-16 transition-all duration-700 sm:inset-x-6 rounded-xl ${
        isScrolledUp ? "bg-[#121212] text-white" : "bg-transparent text-[#2b2b2b]"
      }`}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex items-center justify-between px-5 sm:justify-end sm:pr-24">
          
          {/* Logo - visible on mobile */}
          <div className="flex items-center sm:hidden">
            <Link to="/" className="text-lg font-bold text-[#FF6542]">
              codr
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`relative text-xs sm:text-sm uppercase font-medium transition duration-300 
                  before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full 
                  before:origin-left before:scale-x-0 before:transition-transform 
                  before:duration-300 hover:before:scale-x-100 ${
                    isScrolledUp ? "before:bg-white" : "before:bg-[#2b2b2b]"
                  }`}
              >
                <span className="flex items-center gap-2">
                  {item.name}
                  {item.isNew && (
                    <span className="bg-gradient-to-r from-[#FF6542] to-[#FF8A65] text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
                      NEW
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className={`sm:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolledUp ? "hover:bg-white/10" : "hover:bg-black/10"
            }`}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 sm:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          
          {/* Menu Content */}
          <div className="relative bg-[#2b2b2b] rounded-xl mx-4 mt-4 p-6 shadow-2xl border border-gray-700">
            <div className="flex flex-col space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className="text-white text-lg font-medium py-4 px-4 rounded-lg hover:bg-[#FF6542] hover:text-white transition-all duration-300 border-b border-gray-600/30 last:border-b-0 group"
                >
                  <span className="flex items-center justify-between">
                    <span>{item.name}</span>
                    {item.isNew && (
                      <span className="bg-gradient-to-r from-[#FF6542] to-[#FF8A65] text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse ml-2">
                        NEW
                      </span>
                    )}
                  </span>
                  <div className="w-0 h-0.5 bg-[#FF6542] group-hover:w-full transition-all duration-300 mt-1"></div>
                </Link>
              ))}
            </div>
            
            {/* Close button hint */}
            <div className="mt-6 pt-4 border-t border-gray-600/30">
              <p className="text-gray-400 text-sm text-center">
                Tap outside to close
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
