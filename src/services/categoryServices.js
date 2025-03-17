import axios from "axios"

const API_URL = "http://localhost:5000"

// Tüm kategorileri getir
export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/categories`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Kategoriler yüklenirken bir hata oluştu." }
  }
}

// Kategori detayını getir
export const getCategoryBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/api/categories/${slug}`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Kategori detayı yüklenirken bir hata oluştu." }
  }
}

