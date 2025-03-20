import { Navigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

const API_URL = "http://localhost:5000/api"

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        setIsAuthenticated(false)
        setLoading(false)
        return
      }

      try {
        // Token'ı doğrula
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.data.user) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          localStorage.removeItem("token")
        }
      } catch (error) {
        setIsAuthenticated(false)
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    verifyToken()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Kullanıcı giriş yapmamışsa, login sayfasına yönlendir
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}

