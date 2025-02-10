const navItems = ["Tips & Prep", "Companies", "Resources"];

const NavBar = () => {
  return (
    <div className="fixed inset-x-0 top-4 z-50 h-16 transition-all duration-700 sm:inset-x-6">
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex items-center justify-end pr-5 sm:pr-24">
          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(/ & /g, "-")}`}
                className="relative text-black  text-xs sm:text-sm uppercase font-medium transition duration-300 
                          before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full 
                          before:origin-left before:scale-x-0 before:bg-black before:transition-transform 
                          before:duration-300 hover:before:scale-x-100"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
