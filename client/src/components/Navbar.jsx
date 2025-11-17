import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/experience" },
    { name: "About", path: "/about" },
  ];
  const path = useLocation().pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0  w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img
          onClick={() => navigate("/")}
          // src={assets.logo}
          src="/logo.png"
          alt="logo"
          className={`w-[165px] h-[35px] object-cover ${isScrolled && "invert opacity-80"}`}
        />
      </Link>
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => {
          const active = path === link.path;
          const lineColor = isScrolled ? "bg-gray-700" : "bg-white";
          const textColor = isScrolled ? "text-gray-700" : "text-white";

          return (
            <Link
              key={i}
              to={link.path}
              className={`group flex flex-col gap-0.5 ${textColor}`}
            >
              {link.name}

              {/* Active underline */}
              {active && (
                <div
                  className={`${lineColor} h-0.5 w-full transition-all duration-300`}
                />
              )}

              {/* Hover underline only when NOT active */}
              {!active && (
                <div
                  className={`${lineColor} h-0.5 w-0 group-hover:w-full transition-all duration-300`}
                />
              )}
            </Link>
          );
        })}

        <button
          className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
            isScrolled ? "text-black" : "text-white"
          } transition-all`}
        >
          Dashboard
        </button>
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <img
          src={assets.searchIcon}
          alt="searchIcon"
          className={`${
            isScrolled && "invert"
          } h-7 transition-all duration-500`}
        />
        <button
          className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer ${
            !isScrolled ? "text-white bg-black" : "bg-white text-black"
          }`}
        >
          Login
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <img
          onClick={() => setIsMenuOpen((prev) => !prev)}
          src={assets.menuIcon}
          alt="menuIcon"
          className={`${isScrolled && "invert"} h-4 cursor-pointer`}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 cursor-pointer  "
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeIcon} alt="closeIcon" className={` h-4`} />
        </button>

        {navLinks.map((link, i) => (
          <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </a>
        ))}

        <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
          Dashboard
        </button>

        <button className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
