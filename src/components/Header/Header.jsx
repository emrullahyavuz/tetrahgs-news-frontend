import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SwichDarkMode from "../../assets/SwichDarkMode.svg";
import Swich from "../../assets/Swich.svg";
import tetraHGS from "../../assets/tetrahgs.png";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {auth,logout} = useAuth()

  const session = auth;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="flex justify-between items-center max-w-6xl mx-auto px-4  md:py-16 md:px-4 py-8 mb-10 w-full h-[100px]">
      {/* Logo and Navigation */}
      <div className="flex items-center space-x-12">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 w-[158px] h-[36px]">
          <img
            src={tetraHGS}
            alt="Theme toggle"
            width={80}
            height={80}
            className="text-gray-600 dark:brightness-0 dark:invert"
          />
          <span className="font-semibold text-xl">
            {" "}
            <span className="font-light">Tetra</span>Blog
          </span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="hidden md:flex items-center space-x-10 py-[6px] font-work-sans text-[#3B3C4A] dark:text-white ">
        <NavLink
          to="/"
          className="hover:text-gray-900 dark:hover:text-[#4B6BFB]"
        >
          Home
        </NavLink>
        <NavLink
          to="/blog"
          className="hover:text-gray-900 dark:hover:text-[#4B6BFB]"
        >
          Blog
        </NavLink>
        <NavLink
          to="/single-post"
          className="hover:text-gray-900 dark:hover:text-[#4B6BFB]"
        >
          Single Post
        </NavLink>
        <NavLink
          to="/about"
          className="hover:text-gray-900 dark:hover:text-[#4B6BFB]"
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className="hover:text-gray-900 dark:hover:text-[#4B6BFB]"
        >
          Contact
        </NavLink>
      </nav>

      {/* Hamburger Menü Butonu */}
      <button
        onClick={toggleMenu}
        className="lg:hidden z-10 p-2 w-full flex justify-end rounded-md  focus:outline-none"
        aria-label="Ana menüyü aç/kapat"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobil Menü */}
      <div
        className={`fixed inset-0 z-10 lg:hidden bg-white transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-700 hover:text-blue-500"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Ürünler
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-700 hover:text-blue-500"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Hakkımızda
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-700 hover:text-blue-500"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            İletişim
          </NavLink>
        </div>
      </div>

      {/* Search and Theme Toggle */}
      <div className="flex items-center space-x-4 gap-10">
        {/* Search Bar */}
        <div className="relative md:block hidden">
          <input
            type="search"
            placeholder="Search"
            className="pl-5 pr-4 py-2 w-[166px] h-[36px] border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-[#242535] border-none dark:text-[#A1A1AA] [&::-webkit-search-cancel-button]:hidden"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-4 h-4 text-[#52525B]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="rounded-full hover:bg-gray-100 !ml-0 md:block hidden"
          aria-label="Toggle theme"
        >
          <img
            src={darkMode ? SwichDarkMode : Swich}
            alt="Theme toggle"
            width={48}
            height={28}
            className="text-gray-600"
          />
        </button>
        {/* Auth Buttons */}
        {session ? (
          <div className="flex items-center gap-4">
           
            <button className="flex items-center gap-2 hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span onClick={() => {
                toast.success("Çıkış Yapıldı")
                logout()
              }}>Çıkış</span>
            </button>
          </div>
        ) : (
          <button className="hidden lg:flex items-center gap-2 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <Link to="auth/login">Giriş Yap</Link>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
