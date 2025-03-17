import axios from "axios"

const API_URL = "http://localhost:5000"

// Tüm haberleri getir
export const getAllNews = async (page = 1, limit = 6) => {
  try {
    const response = await axios.get(`${API_URL}/api/news?page=${page}&limit=${limit}`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Haberler yüklenirken bir hata oluştu." }
  }
}

// Öne çıkan haberi getir
export const getFeaturedNews = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/news/featured`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Öne çıkan haber yüklenirken bir hata oluştu." }
  }
}

// Kategoriye göre haberleri getir
export const getNewsByCategory = async (categorySlug, page = 1, limit = 6) => {
  try {
    const response = await axios.get(`${API_URL}/api/news/category/${categorySlug}?page=${page}&limit=${limit}`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Kategoriye göre haberler yüklenirken bir hata oluştu." }
  }
}

// Popüler haberleri getir
export const getPopularNews = async (limit = 4) => {
  try {
    const response = await axios.get(`${API_URL}/api/news/popular?limit=${limit}`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Popüler haberler yüklenirken bir hata oluştu." }
  }
}

// Haber detayını getir
export const getNewsById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/news/${id}`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Haber detayı yüklenirken bir hata oluştu." }
  }
}

