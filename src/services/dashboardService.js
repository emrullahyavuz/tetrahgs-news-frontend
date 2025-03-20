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
          window.location.href = "/login"
        }
      }
    }
    return Promise.reject(error)
  },
)

// Dashboard API service
const dashboardApi = {
  // Dashboard istatistiklerini getir
  getStats: async () => {
    try {
      const response = await api.get("/dashboard/stats")
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Popüler kategorileri getir
  getPopularCategories: async () => {
    try {
      const response = await api.get("/dashboard/categories")
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Görüntülenme analizini getir
  getViewsAnalytics: async (period = "week") => {
    try {
      const response = await api.get(`/dashboard/views?period=${period}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },
}

export default dashboardApi

