import { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kullanıcı oturumunu kontrol et
  useEffect(() => {
    const checkAuth = async () => {
      debugger
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser(token);
        setUser(response.user);
      } catch (err) {
        console.error("Auth check error:", err);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Giriş yap
  const login = async (email, password) => {
    try {
      setError(null);
      debugger;
      const response = await loginUser(email, password);

      localStorage.setItem("token", response.token);
      setUser(response.user);

      return response;
    } catch (err) {
      setError(err.message || "Giriş yapılırken bir hata oluştu.");
      throw err;
    }
  };

  // Çıkış yap
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Kayıt ol
  const register = async (userData) => {
    try {
      setError(null);
      const response = await registerUser(userData);

      localStorage.setItem("token", response.token);
      setUser(response.user);

      return response;
    } catch (err) {
      setError(err.message || "Kayıt olurken bir hata oluştu.");
      throw err;
    }
  };

  // Şifremi unuttum
  const requestPasswordReset = async (email) => {
    try {
      setError(null);
      const response = await forgotPassword(email);
      return response;
    } catch (err) {
      setError(
        err.message || "Şifre sıfırlama isteği gönderilirken bir hata oluştu."
      );
      throw err;
    }
  };

  // Şifre sıfırlama
  const resetUserPassword = async (token, password) => {
    try {
      setError(null);
      const response = await resetPassword(token, password);
      return response;
    } catch (err) {
      setError(err.message || "Şifre sıfırlanırken bir hata oluştu.");
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    requestPasswordReset,
    resetUserPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
