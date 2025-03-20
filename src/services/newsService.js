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

// News API service
const newsApi = {
  // Haberleri getir (filtreleme ve arama desteği ile)
  getNews: async (params = {}) => {
    try {
      const response = await api.get("/news", { params })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Belirli bir haberi getir
  getNewsById: async (id) => {
    try {
      const response = await api.get(`/news/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Yeni haber ekle
  createNews: async (newsData) => {
    try {
      const response = await api.post("/news", newsData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Haberi güncelle
  updateNews: async (id, newsData) => {
    try {
      console.log(`Haber güncelleniyor (ID: ${id}):`, newsData)
      const response = await api.put(`/news/${id}`, newsData)
      console.log("Güncelleme yanıtı:", response.data)
      return response.data
    } catch (error) {
      console.error("Haber güncellenirken hata:", error)
      throw error.response?.data || error.message
    }
  },

  // Haberi sil
  deleteNews: async (id) => {
    try {
      console.log(`Haber siliniyor (ID: ${id})`)
      const response = await api.delete(`/news/${id}`)
      console.log("Silme yanıtı:", response.data)
      return response.data
    } catch (error) {
      console.error("Haber silinirken hata:", error)
      throw error.response?.data || error.message
    }
  },

  // Kategorileri getir
  getCategories: async () => {
    try {
      const response = await api.get("/news/categories/all")
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Haber durumunu güncelle
  updateNewsStatus: async (id, status) => {
    try {
      console.log(`Haber durumu güncelleniyor (ID: ${id}):`, status)
      const response = await api.put(`/news/${id}/status`, { status })
      console.log("Durum güncelleme yanıtı:", response.data)
      return response.data
    } catch (error) {
      console.error("Haber durumu güncellenirken hata:", error)
      throw error.response?.data || error.message
    }
  },
}

export default newsApi

