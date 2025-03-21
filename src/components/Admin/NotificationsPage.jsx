"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Bell,
  Search,
  Filter,
  Trash2,
  Check,
  RefreshCw,
  AlertCircle,
  MessageSquare,
  BarChart2,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
  Clock,
  ArrowDown,
  ArrowUp,
} from "lucide-react"
import notificationService from "../../services/notificationService"

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedNotifications, setSelectedNotifications] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // Filtreleme state'leri
  const [filters, setFilters] = useState({
    type: "",
    read: "",
    page: 1,
    limit: 20,
    sortBy: "createdAt",
    sortOrder: "desc",
  })

  // Pagination state'i
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    totalItems: 0,
    totalPages: 0,
    unreadCount: 0,
  })

  // Bildirimleri getir
  const fetchNotifications = async () => {
    try {
      setLoading(true)
      setError(null)

      // Arama sorgusu varsa filtrelere ekle
      const params = { ...filters }
      if (searchQuery) {
        params.search = searchQuery
      }

      const response = await notificationService.getNotifications(params)
      setNotifications(response.data)
      setPagination({
        page: filters.page,
        limit: filters.limit,
        totalItems: response.pagination.totalItems,
        totalPages: Math.ceil(response.pagination.totalItems / filters.limit),
        unreadCount: response.pagination.unreadCount,
      })

      setLoading(false)
    } catch (err) {
      console.error("Bildirimler getirilirken hata:", err)
      setError("Bildirimler getirilirken bir hata oluştu")
      setLoading(false)
    }
  }

  // Component mount olduğunda bildirimleri getir
  useEffect(() => {
    fetchNotifications()
  }, [])

  // Filtreler değiştiğinde bildirimleri yeniden getir
  useEffect(() => {
    fetchNotifications()
  }, [filters.page, filters.limit, filters.type, filters.read, filters.sortBy, filters.sortOrder])

  // Tüm bildirimleri seç/kaldır
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(notifications.map((notification) => notification.id))
    }
    setSelectAll(!selectAll)
  }

  // Tek bir bildirimi seç/kaldır
  const handleSelectNotification = (id) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter((notificationId) => notificationId !== id))
    } else {
      setSelectedNotifications([...selectedNotifications, id])
    }
  }

  // Bildirimi okundu olarak işaretle
  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id)

      // Bildirimleri güncelle
      setNotifications(
        notifications.map((notification) =>
          notification.id === id ? { ...notification, isRead: true } : notification,
        ),
      )

      // Okunmamış bildirim sayısını güncelle
      setPagination({
        ...pagination,
        unreadCount: pagination.unreadCount > 0 ? pagination.unreadCount - 1 : 0,
      })

      setSuccessMessage("Bildirim okundu olarak işaretlendi")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      console.error("Bildirim okundu olarak işaretlenirken hata:", err)
      setError("Bildirim okundu olarak işaretlenirken bir hata oluştu")
    }
  }

  // Seçili bildirimleri okundu olarak işaretle
  const handleMarkSelectedAsRead = async () => {
    try {
      setLoading(true)

      // Her bir seçili bildirim için okundu işaretleme işlemi
      for (const id of selectedNotifications) {
        await notificationService.markAsRead(id)
      }

      // Bildirimleri güncelle
      setNotifications(
        notifications.map((notification) =>
          selectedNotifications.includes(notification.id) ? { ...notification, isRead: true } : notification,
        ),
      )

      // Okunmamış bildirim sayısını güncelle
      const newUnreadCount =
        pagination.unreadCount -
        selectedNotifications.filter((id) => notifications.find((n) => n.id === id && !n.isRead)).length

      setPagination({
        ...pagination,
        unreadCount: newUnreadCount > 0 ? newUnreadCount : 0,
      })

      setSelectedNotifications([])
      setSelectAll(false)
      setLoading(false)
      setSuccessMessage("Seçili bildirimler okundu olarak işaretlendi")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      console.error("Bildirimler okundu olarak işaretlenirken hata:", err)
      setError("Bildirimler okundu olarak işaretlenirken bir hata oluştu")
      setLoading(false)
    }
  }

  // Tüm bildirimleri okundu olarak işaretle
  const handleMarkAllAsRead = async () => {
    try {
      setLoading(true)
      await notificationService.markAllAsRead()

      // Bildirimleri güncelle
      setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })))

      // Okunmamış bildirim sayısını güncelle
      setPagination({
        ...pagination,
        unreadCount: 0,
      })

      setSelectedNotifications([])
      setSelectAll(false)
      setLoading(false)
      setSuccessMessage("Tüm bildirimler okundu olarak işaretlendi")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      console.error("Tüm bildirimler okundu olarak işaretlenirken hata:", err)
      setError("Tüm bildirimler okundu olarak işaretlenirken bir hata oluştu")
      setLoading(false)
    }
  }

  // Bildirimi sil
  const handleDeleteNotification = async (id) => {
    try {
      await notificationService.deleteNotification(id)

      // Bildirimleri güncelle
      const updatedNotifications = notifications.filter((notification) => notification.id !== id)
      setNotifications(updatedNotifications)

      // Toplam bildirim sayısını güncelle
      setPagination({
        ...pagination,
        totalItems: pagination.totalItems - 1,
        totalPages: Math.ceil((pagination.totalItems - 1) / pagination.limit),
        unreadCount: pagination.unreadCount - (notifications.find((n) => n.id === id && !n.isRead) ? 1 : 0),
      })

      setSuccessMessage("Bildirim silindi")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      console.error("Bildirim silinirken hata:", err)
      setError("Bildirim silinirken bir hata oluştu")
    }
  }

  // Seçili bildirimleri sil
  const handleDeleteSelected = async () => {
    try {
      setLoading(true)

      // Her bir seçili bildirim için silme işlemi
      for (const id of selectedNotifications) {
        await notificationService.deleteNotification(id)
      }

      // Bildirimleri güncelle
      const updatedNotifications = notifications.filter(
        (notification) => !selectedNotifications.includes(notification.id),
      )
      setNotifications(updatedNotifications)

      // Okunmamış bildirim sayısını güncelle
      const deletedUnreadCount = selectedNotifications.filter((id) =>
        notifications.find((n) => n.id === id && !n.isRead),
      ).length

      // Toplam bildirim sayısını güncelle
      setPagination({
        ...pagination,
        totalItems: pagination.totalItems - selectedNotifications.length,
        totalPages: Math.ceil((pagination.totalItems - selectedNotifications.length) / pagination.limit),
        unreadCount: pagination.unreadCount - deletedUnreadCount,
      })

      setSelectedNotifications([])
      setSelectAll(false)
      setLoading(false)
      setSuccessMessage("Seçili bildirimler silindi")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      console.error("Bildirimler silinirken hata:", err)
      setError("Bildirimler silinirken bir hata oluştu")
      setLoading(false)
    }
  }

  // Arama formunu handle et
  const handleSearch = (e) => {
    e.preventDefault()
    setFilters({
      ...filters,
      page: 1, // Arama yapıldığında ilk sayfaya dön
    })
    fetchNotifications()
  }

  // Filtre değişikliklerini handle et
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
      page: 1, // Filtre değiştiğinde ilk sayfaya dön
    })
  }

  // Sayfa değişikliğini handle et
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setFilters({
        ...filters,
        page: newPage,
      })
    }
  }

  // Sıralama değişikliğini handle et
  const handleSortChange = (field) => {
    const newSortOrder = field === filters.sortBy && filters.sortOrder === "asc" ? "desc" : "asc"
    setFilters({
      ...filters,
      sortBy: field,
      sortOrder: newSortOrder,
      page: 1, // Sıralama değiştiğinde ilk sayfaya dön
    })
  }

  // Bildirim tipine göre ikon getir
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

  // Bildirim tipine göre yönlendirme URL'si getir
  const getNotificationUrl = (notification) => {
    switch (notification.type) {
      case "comment":
        return `/admin/comments/approve/${notification.entityId}`
      case "user":
        return `/admin/users/${notification.entityId}`
      default:
        return "#"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bildirimler</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Son güncelleme: {new Date().toLocaleString("tr-TR")}
          </span>
          <button
            onClick={fetchNotifications}
            className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            title="Yenile"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg relative">
          <span className="flex items-center">
            <CheckCircle size={18} className="mr-2" />
            {successMessage}
          </span>
          <button className="absolute top-0 right-0 px-4 py-3" onClick={() => setSuccessMessage("")}>
            &times;
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg relative">
          <span className="flex items-center">
            <AlertCircle size={18} className="mr-2" />
            {error}
          </span>
          <button className="absolute top-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            &times;
          </button>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <form onSubmit={handleSearch} className="relative flex-1">
            <input
              type="text"
              placeholder="Bildirim ara..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
            <button type="submit" className="hidden">
              Ara
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Tüm Tipler</option>
              <option value="comment">Yorum</option>
              <option value="user">Kullanıcı</option>
              <option value="system">Sistem</option>
            </select>

            <select
              name="read"
              value={filters.read}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Tüm Durumlar</option>
              <option value="true">Okunmuş</option>
              <option value="false">Okunmamış</option>
            </select>

            <button
              onClick={() => {
                setFilters({
                  type: "",
                  read: "",
                  page: 1,
                  limit: 20,
                  sortBy: "createdAt",
                  sortOrder: "desc",
                })
                setSearchQuery("")
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center text-gray-700 dark:text-gray-300"
            >
              <Filter size={16} className="mr-1" />
              Filtreleri Temizle
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {selectedNotifications.length > 0 ? `${selectedNotifications.length} bildirim seçildi` : "Tümünü seç"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleMarkSelectedAsRead}
              disabled={selectedNotifications.length === 0 || loading}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Check size={16} className="mr-1" />
              Seçilenleri Okundu İşaretle
            </button>
            <button
              onClick={handleDeleteSelected}
              disabled={selectedNotifications.length === 0 || loading}
              className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Trash2 size={16} className="mr-1" />
              Seçilenleri Sil
            </button>
            <button
              onClick={handleMarkAllAsRead}
              disabled={pagination.unreadCount === 0 || loading}
              className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <CheckCircle size={16} className="mr-1" />
              Tümünü Okundu İşaretle
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-10"
                >
                  <span className="sr-only">Seç</span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-10"
                >
                  <span className="sr-only">Tip</span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSortChange("title")}
                >
                  <div className="flex items-center">
                    Başlık
                    {filters.sortBy === "title" &&
                      (filters.sortOrder === "asc" ? (
                        <ArrowUp size={14} className="ml-1" />
                      ) : (
                        <ArrowDown size={14} className="ml-1" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Mesaj
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSortChange("createdAt")}
                >
                  <div className="flex items-center">
                    Tarih
                    {filters.sortBy === "createdAt" &&
                      (filters.sortOrder === "asc" ? (
                        <ArrowUp size={14} className="ml-1" />
                      ) : (
                        <ArrowDown size={14} className="ml-1" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Durum
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading && notifications.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center">
                      <RefreshCw size={24} className="animate-spin text-blue-500 mr-2" />
                      <span>Yükleniyor...</span>
                    </div>
                  </td>
                </tr>
              ) : notifications.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center justify-center py-6">
                      <Bell size={48} className="text-gray-400 dark:text-gray-500 mb-2" />
                      <p className="text-gray-500 dark:text-gray-400">Bildirim bulunamadı</p>
                    </div>
                  </td>
                </tr>
              ) : (
                notifications.map((notification) => (
                  <tr
                    key={notification.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      !notification.isRead ? "bg-blue-50 dark:bg-blue-900/10" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedNotifications.includes(notification.id)}
                        onChange={() => handleSelectNotification(notification.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">{getNotificationIcon(notification.type)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {notification.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock size={14} className="mr-1" />
                        {notification.timeAgo}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          notification.isRead
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        }`}
                      >
                        {notification.isRead ? "Okundu" : "Okunmadı"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={getNotificationUrl(notification)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          title="Görüntüle"
                        >
                          <Eye size={18} />
                        </Link>
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                            title="Okundu İşaretle"
                          >
                            <Check size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          title="Sil"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Toplam <span className="font-medium">{pagination.totalItems}</span> bildirimden{" "}
                  <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> ile{" "}
                  <span className="font-medium">
                    {Math.min(pagination.page * pagination.limit, pagination.totalItems)}
                  </span>{" "}
                  arası gösteriliyor
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft size={16} />
                  </button>

                  {[...Array(pagination.totalPages).keys()].map((x) => {
                    // Çok fazla sayfa varsa, sadece belirli sayfaları göster
                    if (
                      pagination.totalPages <= 7 ||
                      x === 0 ||
                      x === pagination.totalPages - 1 ||
                      (x >= pagination.page - 2 && x <= pagination.page + 2)
                    ) {
                      return (
                        <button
                          key={x + 1}
                          onClick={() => handlePageChange(x + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            pagination.page === x + 1
                              ? "z-10 bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-500 text-blue-600 dark:text-blue-400"
                              : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }
                            `}
                        >
                          {x + 1}
                        </button>
                      )
                    } else if (
                      (x === 1 && pagination.page > 4) ||
                      (x === pagination.totalPages - 2 && pagination.page < pagination.totalPages - 3)
                    ) {
                      return (
                        <span
                          key={x}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          ...
                        </span>
                      )
                    }
                    return null
                  })}

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight size={16} />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationsPage

