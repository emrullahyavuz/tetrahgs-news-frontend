import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X, ChevronDown, Search } from "lucide-react";
import { motion } from "framer-motion";
import tetraHGS from "../../assets/tetrahgs.png";
import { useAuth } from "../../context/AuthContext";
import Modal from "../UI/Modal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    setShowModal(false);
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center max-w-7xl mx-auto px-4 md:py-16 md:px-4 py-8 mb-10 w-full h-[100px]">
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
            <span className="font-light">Tetra</span>Haber
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

        <div
            className="relative"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <Link to="news" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Haberler <ChevronDown className="ml-1" size={16} />
            </Link>
            {showCategories && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 z-10 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md"
              >
                <ul className="py-2">
                  <li><Link to={""} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Yapay Zeka</Link></li>
                  <li><Link to={""} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Siber Güvenlik</Link></li>
                  <li><Link to={""} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Blockchain</Link></li>
                </ul>
              </motion.div>
            )}
          </div>
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
        <NavLink to="/admin/dashboard">Admin Dashboard</NavLink>
      </nav>

      {/* Search and Theme Toggle */}
      <div className="flex items-center space-x-4 gap-10">
        {/* Search Bar */}
        <div className="relative">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
        
      >
        <Search className="w-5 h-5 text-[#52525B]" />
      </div>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isOpen ? 180 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`absolute right-0 top-0 overflow-hidden ${
          isOpen ? "border border-gray-300 dark:border-gray-700 rounded-lg" : ""
        }`}
      >
        <input
          type="search"
          placeholder="Search"
          className="pl-5 pr-4 py-2 w-[180px] h-[36px] bg-gray-100 focus:outline-none dark:bg-[#242535] dark:text-[#A1A1AA] border-none transition-all duration-300"
        />
      </motion.div>
    </div>

        {/* Theme Toggle Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        

        {/* Auth Buttons */}
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <span className="text-gray-700 dark:text-gray-300">
                Merhaba, {user?.fullName || user?.name || "Kullanıcı"}
              </span>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 hover:text-gray-600"
            >
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
              <span>Çıkış</span>
            </button>
          </div>
        ) : (
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
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <Link to="/auth/login">Giriş Yap</Link>
          </button>
        )}
      </div>

      {showModal && (
        <Modal
          title="Çıkış Yap"
          desc="Çıkış yapmak istediğinize emin misiniz?"
          setShowModal={setShowModal}
          onConfirm={handleLogout}
        />
      )}
    </header>
  );
};

export default Header;
