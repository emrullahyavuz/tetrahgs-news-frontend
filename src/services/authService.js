import axios from "axios"
import {jwtDecode} from "jwt-decode"

const API_URL = "http://localhost:5000"

// Giriş yap
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, { email, password })

    // Token'ı localStorage'a kaydet
    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
    }

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
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw { message: "Oturum açılmamış" }
    }

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

// Çıkış yap
export const logout = () => {
  localStorage.removeItem("token")
  return { success: true, message: "Çıkış başarılı" }
}

// Token'dan kullanıcı ID'sini al
export const getUserId = () => {
  const token = localStorage.getItem("token")
  if (!token) return null

  try {
    const decoded = jwtDecode(token)
    return decoded.id
  } catch (error) {
    console.error("Token çözümlenirken hata oluştu:", error)
    return null
  }
}

// Token'dan kullanıcı rolünü al
export const getUserRole = () => {
  const token = localStorage.getItem("token")
  if (!token) return null

  try {
    const decoded = jwtDecode(token)
    return decoded.role
  } catch (error) {
    console.error("Token çözümlenirken hata oluştu:", error)
    return null
  }
}

// Kullanıcının giriş yapmış olup olmadığını kontrol et
export const isAuthenticated = () => {
  const token = localStorage.getItem("token")
  if (!token) return false

  try {
    const decoded = jwtDecode(token)
    // Token süresi dolmuş mu kontrol et
    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token")
      return false
    }
    return true
  } catch (error) {
    console.error("Token doğrulanırken hata oluştu:", error)
    localStorage.removeItem("token")
    return false
  }
}

// Kullanıcının belirli bir role sahip olup olmadığını kontrol et
export const hasRole = (requiredRole) => {
  const token = localStorage.getItem("token")
  if (!token) return false

  try {
    const decoded = jwtDecode(token)
    // Admin her şeye erişebilir
    if (decoded.role === 1) return true
    // Editor, admin olmayan rollere erişebilir
    if (decoded.role === 2 && requiredRole !== 1) return true
    // Diğer durumlar için rol eşleşmesi gerekir
    return decoded.role === requiredRole
  } catch (error) {
    console.error("Rol kontrolü yapılırken hata oluştu:", error)
    return false
  }
}

