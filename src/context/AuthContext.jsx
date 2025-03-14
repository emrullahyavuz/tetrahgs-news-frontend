"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const API_URL = "http://localhost:5000/"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Kullanıcı oturumunu kontrol et
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUser(response.data.user)
      } catch (err) {
        console.error("Auth check error:", err)
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Giriş yap
  const login = async (email, password) => {
    try {
      setError(null)
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password })

      localStorage.setItem("token", response.data.token)
      setUser(response.data.user)

      return response.data
    } catch (err) {
      setError(err.response?.data?.message || "Giriş yapılırken bir hata oluştu.")
      throw err
    }
  }

  // Çıkış yap
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  // Kayıt ol
  const register = async (userData) => {
    try {
      setError(null)
      const response = await axios.post(`${API_URL}/api/auth/register`, userData)

      localStorage.setItem("token", response.data.token)
      setUser(response.data.user)

      return response.data
    } catch (err) {
      setError(err.response?.data?.message || "Kayıt olurken bir hata oluştu.")
      throw err
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

