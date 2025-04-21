import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "Community", path: "/community" },
  { name: "Join Us", path: "/join-us" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[hsl(0,0%,5%)]/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="nexo-container flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center group"
        >
          <img 
            src="/nexo/nexo-logo.svg" 
            alt="Nexo Logo" 
            className="h-8 w-auto group-hover:opacity-80 transition-opacity duration-300" 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative text-sm font-medium transition-colors duration-300 ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-gray-300 hover:text-white"
              } group`}
            >
              {item.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ${
                location.pathname === item.path ? "w-full" : "group-hover:w-full"
              }`}></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* Mobile Menu Panel */}
        <div 
          className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#050505] z-50 p-6 md:hidden flex flex-col transform transition-transform duration-300 ease-in-out shadow-2xl ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center">
              <img 
                src="/nexo/nexo-logo.svg" 
                alt="Nexo Logo" 
                className="h-8 w-auto" 
              />
            </Link>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-300"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex flex-col space-y-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`py-2 px-4 text-lg font-medium rounded-lg transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-gray-300 hover:bg-gray-800/40 hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pt-8 border-t border-gray-800">
            <Link 
              to="/join-us" 
              className="nexo-button w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Join NEXO Community
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
