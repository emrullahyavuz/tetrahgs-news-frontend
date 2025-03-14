import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import SwichDarkMode from "../../assets/SwichDarkMode.svg"
import Swich from "../../assets/Swich.svg"
import tetraHGS from "../../assets/tetrahgs.png"
import { useAuth } from "../../context/AuthContext"
import Modal from "../UI/Modal"

const Header = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [darkMode])

  const handleLogout = () => {
    logout()
    setShowModal(false)
    navigate("/")
  }

  return (
    <header className="flex justify-between items-center max-w-6xl mx-auto px-4 md:py-16 md:px-4 py-8 mb-10 w-full h-[100px]">
      {/* Logo and Navigation */}
      <div className="flex items-center space-x-12">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 w-[158px] h-[36px]">
          <img
            src={tetraHGS || "/placeholder.svg"}
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
        <NavLink to="/" className="hover:text-gray-900 dark:hover:text-[#4B6BFB]">
          Home
        </NavLink>
        <NavLink to="/blog" className="hover:text-gray-900 dark:hover:text-[#4B6BFB]">
          Blog
        </NavLink>
        <NavLink to="/technology" className="hover:text-gray-900 dark:hover:text-[#4B6BFB]">
          Teknolojik Haberler
        </NavLink>
        <NavLink to="/about" className="hover:text-gray-900 dark:hover:text-[#4B6BFB]">
          About
        </NavLink>
        <NavLink to="/contact" className="hover:text-gray-900 dark:hover:text-[#4B6BFB]">
          Contact
        </NavLink>
      </nav>

      {/* Hamburger Menü Butonu */}
      <button
        onClick={toggleMenu}
        className="lg:hidden z-10 p-2 w-full flex justify-end rounded-md focus:outline-none"
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
          {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white dark:bg-[#0D1117] flex flex-col items-center justify-center">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 p-2 rounded-md focus:outline-none"
            aria-label="Menüyü kapat"
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
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <nav className="flex flex-col items-center space-y-6 text-xl">
            <NavLink to="/" className="hover:text-[#4B6BFB]" onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink to="/blog" className="hover:text-[#4B6BFB]" onClick={toggleMenu}>
              Blog
            </NavLink>
            <NavLink to="/technology" className="hover:text-[#4B6BFB]" onClick={toggleMenu}>
              Teknolojik Haberler
            </NavLink>
            <NavLink to="/about" className="hover:text-[#4B6BFB]" onClick={toggleMenu}>
              About
            </NavLink>
            <NavLink to="/contact" className="hover:text-[#4B6BFB]" onClick={toggleMenu}>
              Contact
            </NavLink>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setShowModal(true)
                  toggleMenu()
                }}
                className="flex items-center gap-2 hover:text-[#4B6BFB]"
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
            ) : (
              <Link to="/auth/login" className="flex items-center gap-2 hover:text-[#4B6BFB]" onClick={toggleMenu}>
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
                <span>Giriş Yap</span>
              </Link>
            )}
            <button onClick={toggleDarkMode} className="mt-4 flex items-center gap-2" aria-label="Toggle theme">
              <img
                src={darkMode ? SwichDarkMode : Swich}
                alt="Theme toggle"
                width={48}
                height={28}
                className="text-gray-600"
              />
              <span>{darkMode ? "Açık Mod" : "Koyu Mod"}</span>
            </button>
          </nav>
        </div>
      )}

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
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <span className="text-gray-700 dark:text-gray-300">
                Merhaba, {user?.fullName || user?.name || "Kullanıcı"}
              </span>
            </div>
            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 hover:text-gray-600">
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
  )
}

export default Header

