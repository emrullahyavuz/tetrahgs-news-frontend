import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import tetraHGS from "../../assets/tetrahgs.png"
import notificationService from "../../services/notificationService"
import {
  Bell,
  Search,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Moon,
  Sun,
  ChevronDown,
  MessageSquare,
  BarChart2,
  UserPlus,
  RefreshCw,
  Check,
} from "lucide-react"

const AdminHeader = () => {
  const { user, isAuthenticated, logout, checkAuthStatus } = useAuth()
  const navigate = useNavigate()

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const profileRef = useRef(null)
  const notificationsRef = useRef(null)

  // Sayfa yüklendiğinde token kontrolü yap
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuthStatus()
      } catch (err) {
        console.error("Kimlik doğrulama hatası:", err)
        navigate("/login", { replace: true })
      }
    }

    verifyAuth()
  }, [checkAuthStatus, navigate])

  // Kullanıcı giriş yapmamışsa admin sayfasına erişimi engelle
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true })
    }
  }, [isAuthenticated, navigate])

  // Bildirimleri getir
  const fetchNotifications = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await notificationService.getNotifications({ limit: 10 })
      setNotifications(response.data)
      setUnreadCount(response.pagination.unreadCount)
      setLoading(false)
    } catch (err) {
      console.error("Bildirimler getirilirken hata:", err)
      setError("Bildirimler getirilirken bir hata oluştu")
      setLoading(false)
    }
  }

  // Component mount olduğunda bildirimleri getir
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications()
    }
  }, [isAuthenticated])

  // Periyodik olarak bildirimleri güncelle (her 30 saniyede bir)
  useEffect(() => {
    if (!isAuthenticated) return

    const interval = setInterval(() => {
      fetchNotifications()
    }, 30000)

    return () => clearInterval(interval)
  }, [isAuthenticated])

  // Dark mode toggle
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true"
    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem("darkMode", newMode.toString())
    if (newMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead()
      setNotifications(
        notifications.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      )
      setUnreadCount(0)
    } catch (err) {
      console.error("Bildirimler okundu olarak işaretlenirken hata:", err)
    }
  }

  const markAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id)
      setNotifications(
        notifications.map((notification) =>
          notification.id === id ? { ...notification, isRead: true } : notification,
        ),
      )
      setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0))
    } catch (err) {
      console.error("Bildirim okundu olarak işaretlenirken hata:", err)
    }
  }

  // Bildirime tıklandığında ilgili sayfaya yönlendir
  const handleNotificationClick = (notification) => {
    markAsRead(notification.id)

    // Bildirim tipine göre yönlendirme yap
    switch (notification.type) {
      case "comment":
        navigate(`/admin/comments/pending/${notification.entityId}`)
        break
      case "user":
        navigate(`/admin/users/${notification.entityId}`)
        break
      default:
        navigate("/admin/notifications")
        break
    }

    setIsNotificationsOpen(false)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "system":
        return <BarChart2 className="h-5 w-5 text-purple-500" />
      case "user":
        return <UserPlus className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  // Çıkış işlemi
  const handleLogout = () => {
    logout()
    navigate("/login") // Çıkış sonrası login sayfasına yönlendir
  }

  // Kullanıcı giriş yapmamışsa header'ı gösterme
  if (!isAuthenticated) {
    return null
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
              <Link to="/admin" className="flex items-center">
                <img
                  className="h-8 w-auto"
                  src={tetraHGS || "/placeholder.svg?height=32&width=32"}
                  alt="Admin Panel Logo"
                />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                  TetraHaber Admin Panel
                </span>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Ara..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Moon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>

            {/* Notifications */}
            <div className="ml-3 relative" ref={notificationsRef}>
              <div>
                <button
                  onClick={() => {
                    setIsNotificationsOpen(!isNotificationsOpen)
                    setIsProfileOpen(false)
                    if (!isNotificationsOpen) {
                      fetchNotifications()
                    }
                  }}
                  className="relative p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Bildirimleri görüntüle</span>
                  <Bell className="h-6 w-6" aria-hidden="true" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
                  )}
                </button>
              </div>

              {isNotificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Bildirimler</h3>
                        <div className="flex items-center space-x-2">
                          {loading ? (
                            <RefreshCw className="h-4 w-4 text-gray-400 animate-spin" />
                          ) : (
                            <button
                              onClick={fetchNotifications}
                              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                              title="Yenile"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </button>
                          )}
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                            >
                              Tümünü okundu işaretle
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {loading && notifications.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-center text-gray-500 dark:text-gray-400">
                          <RefreshCw className="h-5 w-5 mx-auto mb-2 animate-spin" />
                          Bildirimler yükleniyor...
                        </div>
                      ) : error ? (
                        <div className="px-4 py-3 text-sm text-center text-red-500">{error}</div>
                      ) : notifications.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-center text-gray-500 dark:text-gray-400">
                          Bildirim bulunmuyor
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer ${
                              !notification.isRead ? "bg-blue-50 dark:bg-blue-900/20" : ""
                            }`}
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                              <div className="ml-3 w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{notification.message}</p>
                                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{notification.timeAgo}</p>
                              </div>
                              {notification.type === "comment" && (
                                <button
                                  className="ml-2 p-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full hover:bg-green-200 dark:hover:bg-green-800/30"
                                  title="Yorumu Onayla"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(`/admin/comments/approve/${notification.entityId}`)
                                  }}
                                >
                                  <Check size={16} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-600">
                      <Link
                        to="/admin/notifications"
                        className="block px-4 py-2 text-sm text-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        Tüm bildirimleri görüntüle
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="ml-3 relative" ref={profileRef}>
              <div>
                <button
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen)
                    setIsNotificationsOpen(false)
                  }}
                  className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Kullanıcı menüsünü aç</span>
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
                    {user?.profileImage ? (
                      <img
                        className="h-full w-full object-cover"
                        src={user.profileImage || "/placeholder.svg?height=32&width=32"}
                        alt={user.fullName}
                      />
                    ) : (
                      <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:block">
                    {user?.fullName || user?.name || "Admin Kullanıcı"}
                  </span>
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-500 dark:text-gray-400 hidden md:block" />
                </button>
              </div>

              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.fullName || user?.name || "Admin Kullanıcı"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.email || "admin@example.com"}
                      </p>
                    </div>
                    <Link
                      to="/admin/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <User className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      Profilim
                    </Link>
                    <Link
                      to="/admin/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <Settings className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      Ayarlar
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <LogOut className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      Çıkış Yap
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 shadow-lg">
          <Link
            to="/admin"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/news"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Haberler
          </Link>
          <Link
            to="/admin/categories"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Kategoriler
          </Link>
          <Link
            to="/admin/comments"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Yorumlar
          </Link>
          <Link
            to="/admin/users"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Kullanıcılar
          </Link>
          <Link
            to="/admin/settings"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Ayarlar
          </Link>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader

