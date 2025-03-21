import { createContext, useContext, useState, useEffect } from "react"
import {getCurrentUser,loginUser,registerUser} from "../services/authService"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Sayfa yüklendiğinde token kontrolü yap
  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkAuthStatus()
      } catch (err) {
        console.error("Kimlik doğrulama hatası:", err)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  // Token kontrolü yapan fonksiyon
  const checkAuthStatus = async () => {
    try {
      setLoading(true)
      setError(null)

      // localStorage'dan token kontrolü
      const token = localStorage.getItem("token")
      if (!token) {
        setIsAuthenticated(false)
        setUser(null)
        return false
      }

      // Token geçerli mi kontrol et
      const response = await getCurrentUser()

      if (response.success && response.user) {
        setUser(response.user)
        setIsAuthenticated(true)
        return true
      } else {
        // Token geçersizse çıkış yap
        logout()
        return false
      }
    } catch (err) {
      console.error("Token kontrolü sırasında hata:", err)
      setError(err.message || "Kimlik doğrulama hatası")
      logout()
      return false
    } finally {
      setLoading(false)
    }
  }

  // Giriş yap
  const login = async (email, password) => {
    try {
      setLoading(true)
      setError(null)

      const response = await loginUser(email, password)

      if (response.token) {
        localStorage.setItem("token", response.token)
        if (response.refreshToken) {
          localStorage.setItem("refreshToken", response.refreshToken)
        }

        setUser(response.user)
        setIsAuthenticated(true)
        return response
      }
    } catch (err) {
      setError(err.message || "Giriş yapılırken bir hata oluştu")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Çıkış yap
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    setUser(null)
    setIsAuthenticated(false)
  }

  // Kayıt ol
  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)

      const response = await registerUser(userData)

      if (response.token) {
        localStorage.setItem("token", response.token)
        if (response.refreshToken) {
          localStorage.setItem("refreshToken", response.refreshToken)
        }

        setUser(response.user)
        setIsAuthenticated(true)
        return response
      }
    } catch (err) {
      setError(err.message || "Kayıt olurken bir hata oluştu")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        register,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

