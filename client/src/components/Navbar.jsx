import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";
const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/experience" },
    { name: "About", path: "/about" },
  ];
  const { showHotelReg, user, navigate, isOwner, setShowHotelReg } =
    useAppContext();

  const BookIcon = () => (
    <svg
      className="w-4 h-4 text-gray-700"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
      />
    </svg>
  );

  const path = useLocation().pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openSignIn } = useClerk();
  useEffect(() => {
    if (path !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }
    setIsScrolled((prev) => (path !== "/" ? true : prev));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [path]);

  return (
    <nav
      className={`fixed top-0 left-0  w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <Link
        onClick={() => scroll(0, 0)}
        to="/"
        className="flex items-center gap-2"
      >
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="logo"
          className={`w-40 object-cover ${isScrolled && "invert opacity-80"}`}
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
              onClick={() => scroll(0, 0)}
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
        {user && (
          <button
            onClick={() => {
              if (isOwner) {
                navigate("/owner");
                window.scrollTo(0, 0);
              } else {
                setShowHotelReg(true);
              }
            }}
            className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
              isScrolled ? "text-black" : "text-white"
            } transition-all`}
          >
            {isOwner ? "Dashboard" : "List Your Hotels"}
          </button>
        )}
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

        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer ${
              !isScrolled ? "text-white bg-black" : "bg-white text-black"
            }`}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-4 flex-row-reverse md:hidden">
        <div className="flex items-center   gap-3 md:hidden">
          <img
            onClick={() => setIsMenuOpen((prev) => !prev)}
            src={assets.menuIcon}
            alt="menuIcon"
            className={`${isScrolled && "invert"} h-4 cursor-pointer`}
          />
        </div>

        {/* Mobile Menu */}
        {user && (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>
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

        {user && (
          <button
            onClick={() => {
              if (isOwner) {
                navigate("/owner");
                window.scrollTo(0, 0);
              } else {
                setShowHotelReg(true);
              }
            }}
            className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all"
          >
            {isOwner ? "Dashboard" : "List Your Hotels"}
          </button>
        )}
        {!user && (
          <button
            onClick={openSignIn}
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
