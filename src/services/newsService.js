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

// News API service
const newsApi = {
  // Haberleri getir (filtreleme ve arama desteği ile)
  
  getNews: async (params = {}) => {
    try {
      debugger
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
      debugger
      const response = await api.post("/news", newsData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Haberi güncelle
  updateNews: async (id, newsData) => {
    try {
      debugger
      const response = await api.put(`/news/${id}`, newsData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Haberi sil
  deleteNews: async (id) => {
    try {
      const response = await api.delete(`/news/${id}`)
      return response.data
    } catch (error) {
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
      const response = await api.put(`/news/${id}/status`, { status })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },
}

export default newsApi

