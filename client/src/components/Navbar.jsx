import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton } from "@clerk/clerk-react";
import {
  Building2,
  CalendarCheck,
  ChevronRight,
  Compass,
  Hotel,
  House,
  Info,
  LayoutDashboard,
  LogIn,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const navLinks = [
  { name: "Home", path: "/", icon: House },
  { name: "Hotels", path: "/rooms", icon: Hotel },
  { name: "Experience", path: "/experience", icon: Compass },
  { name: "About", path: "/about", icon: Info },
];

// "/rooms/123" should still highlight "Hotels"
const isActive = (path, linkPath) =>
  linkPath === "/" ? path === "/" : path.startsWith(linkPath);

const Navbar = () => {
  const { user, navigate, isOwner, setShowHotelReg } = useAppContext();
  const { openSignIn } = useClerk();

  const path = useLocation().pathname;
  const [hasScrolled, setHasScrolled] = useState(() => window.scrollY > 10);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Transparent navbar only on top of the home hero
  const isScrolled = path !== "/" || hasScrolled;

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock page scroll and allow Escape while the mobile menu is open
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  const handleOwnerClick = () => {
    setIsMenuOpen(false);
    if (isOwner) {
      navigate("/owner");
      window.scrollTo(0, 0);
    } else {
      setShowHotelReg(true);
    }
  };

  const userMenu = (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="Profile"
          labelIcon={<UserRound className="w-4 h-4" />}
          onClick={() => navigate("profile")}
        />
        <UserButton.Action
          label="My Bookings"
          labelIcon={<CalendarCheck className="w-4 h-4" />}
          onClick={() => navigate("my-bookings")}
        />
      </UserButton.MenuItems>
    </UserButton>
  );

  const OwnerIcon = isOwner ? LayoutDashboard : Building2;

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <Link
        to="/"
        onClick={() => window.scrollTo(0, 0)}
        className="flex items-center gap-2"
      >
        <img
          src={assets.logo}
          alt="logo"
          className={`w-36 md:w-40 object-cover transition-all duration-500 ${
            isScrolled ? "invert opacity-80" : ""
          }`}
        />
      </Link>

      {/* Desktop Nav */}
      <div
        className={`hidden md:flex items-center gap-1 p-1 rounded-full border transition-all duration-500 ${
          isScrolled
            ? "bg-gray-100/80 border-gray-200"
            : "bg-white/10 border-white/20 backdrop-blur-md"
        }`}
      >
        {navLinks.map(({ name, path: linkPath, icon: Icon }) => {
          const active = isActive(path, linkPath);
          const colors = active
            ? isScrolled
              ? "bg-gray-900 text-white shadow-sm"
              : "bg-white text-gray-900 shadow-sm"
            : isScrolled
            ? "text-gray-600 hover:text-gray-900 hover:bg-white"
            : "text-white/90 hover:text-white hover:bg-white/15";

          return (
            <Link
              key={linkPath}
              to={linkPath}
              onClick={() => window.scrollTo(0, 0)}
              aria-current={active ? "page" : undefined}
              className={`group flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${colors}`}
            >
              <Icon
                className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                strokeWidth={2}
              />
              <span className="hidden lg:inline">{name}</span>
              <span className="lg:hidden">{active && name}</span>
            </Link>
          );
        })}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-3">
        <button
          onClick={() => navigate("/search")}
          aria-label="Search"
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 cursor-pointer ${
            isScrolled
              ? "text-gray-700 hover:bg-gray-100"
              : "text-white hover:bg-white/15"
          }`}
        >
          <Search className="w-5 h-5" />
        </button>

        {user && (
          <button
            onClick={handleOwnerClick}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 cursor-pointer ${
              isScrolled
                ? "border-gray-300 text-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                : "border-white/40 text-white hover:bg-white hover:text-gray-900"
            }`}
          >
            <OwnerIcon className="w-4 h-4" />
            {isOwner ? "Dashboard" : "List Your Hotel"}
          </button>
        )}

        {user ? (
          userMenu
        ) : (
          <button
            onClick={openSignIn}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all duration-300 cursor-pointer hover:-translate-y-0.5 hover:shadow-md ${
              isScrolled ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            }`}
          >
            <LogIn className="w-4 h-4" />
            Login
          </button>
        )}
      </div>

      {/* Mobile Right */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={() => navigate("/search")}
          aria-label="Search"
          className={`flex items-center justify-center w-9 h-9 rounded-full ${
            isScrolled ? "text-gray-700" : "text-white"
          }`}
        >
          <Search className="w-5 h-5" />
        </button>
        {user && userMenu}
        <button
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          className={`flex items-center justify-center w-9 h-9 rounded-full cursor-pointer ${
            isScrolled ? "text-gray-700" : "text-white"
          }`}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 h-screen bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Menu Panel */}
      <aside
        className={`fixed top-0 right-0 h-screen w-[82%] max-w-sm bg-white text-gray-800 shadow-2xl flex flex-col md:hidden transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <img src={assets.logo} alt="logo" className="w-32 invert opacity-80" />
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-1 p-4">
          {navLinks.map(({ name, path: linkPath, icon: Icon }) => {
            const active = isActive(path, linkPath);
            return (
              <Link
                key={linkPath}
                to={linkPath}
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  active ? "bg-gray-900 text-white" : "hover:bg-gray-100"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-9 h-9 rounded-lg ${
                    active ? "bg-white/15" : "bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </span>
                <span className="flex-1">{name}</span>
                <ChevronRight
                  className={`w-4 h-4 ${active ? "opacity-70" : "opacity-30"}`}
                />
              </Link>
            );
          })}
        </div>

        <div className="mt-auto p-4 border-t border-gray-100">
          {user ? (
            <button
              onClick={handleOwnerClick}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-300 font-medium hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors cursor-pointer"
            >
              <OwnerIcon className="w-5 h-5" />
              {isOwner ? "Dashboard" : "List Your Hotel"}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                openSignIn();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-black transition-colors cursor-pointer"
            >
              <LogIn className="w-5 h-5" />
              Login
            </button>
          )}
        </div>
      </aside>
    </nav>
  );
};

export default Navbar;
