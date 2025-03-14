import axios from "axios"

const API_URL = "https://api.example.com"

// Giriş yap
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, { email, password })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Giriş yapılırken bir hata oluştu." }
  }
}

// Kayıt ol
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Kayıt olurken bir hata oluştu." }
  }
}

// Kullanıcı bilgilerini getir
export const getCurrentUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Kullanıcı bilgileri alınırken bir hata oluştu." }
  }
}

// Şifremi unuttum
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/forgot-password`, { email })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Şifre sıfırlama isteği gönderilirken bir hata oluştu." }
  }
}

// Şifre sıfırlama
export const resetPassword = async (token, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/reset-password`, { token, password })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Şifre sıfırlanırken bir hata oluştu." }
  }
}

