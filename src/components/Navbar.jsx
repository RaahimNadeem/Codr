import { Link } from "react-router-dom";

const navItems = [
  
  { name: "Home", path: "/" },
  { name: "Tips & Prep", path: "/tips-prep" },
  { name: "Companies", path: "/companies" },
  { name: "Resources", path: "/resources" },
];

const NavBar = () => {
  return (
    <div className="fixed inset-x-0 top-4 z-50 h-16 transition-all duration-700 sm:inset-x-6">
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex items-center justify-end pr-5 sm:pr-24">
          <div className="flex items-center gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="relative text-black text-xs sm:text-sm uppercase font-medium transition duration-300 
                          before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full 
                          before:origin-left before:scale-x-0 before:bg-black before:transition-transform 
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
