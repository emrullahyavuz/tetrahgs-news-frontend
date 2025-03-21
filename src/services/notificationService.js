import axios from "axios"

const API_URL = "http://localhost:5000/api"


// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Yetki hatası durumunda kullanıcıyı login sayfasına yönlendir
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token süresi dolmuş veya geçersiz
      if (error.response.status === 401) {
        localStorage.removeItem("token")
        // Eğer tarayıcı ortamındaysak yönlendirme yap
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login"
        }
      }
    }
    return Promise.reject(error)
  },
)

// Bildirim API service
const notificationService = {
  // Bildirimleri getir
  getNotifications: async (params = {}) => {
    try {
      const response = await api.get("/notifications", { params })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Bildirimi okundu olarak işaretle
  markAsRead: async (id) => {
    try {
      const response = await api.put(`/notifications/${id}/read`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Tüm bildirimleri okundu olarak işaretle
  markAllAsRead: async () => {
    try {
      const response = await api.put("/notifications/read-all")
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Bildirimi sil
  deleteNotification: async (id) => {
    try {
      const response = await api.delete(`/notifications/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },
}

export default notificationService

