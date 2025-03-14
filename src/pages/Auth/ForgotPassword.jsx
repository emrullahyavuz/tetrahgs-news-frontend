"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const { requestPasswordReset } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Form doğrulama
    if (!email.trim()) {
      setError("E-posta adresi zorunludur")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Geçerli bir e-posta adresi giriniz")
      return
    }

    setIsSubmitting(true)
    setError("")
    setSuccess(false)

    try {
      await requestPasswordReset(email)
      setSuccess(true)
      setEmail("")
    } catch (err) {
      console.error("Password reset error:", err)
      setError(err.message || "Şifre sıfırlama isteği gönderilirken bir hata oluştu")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0D1117] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#181A2A] p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Şifrenizi mi unuttunuz?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>
        )}

        {success ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <p>Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen e-postanızı kontrol edin.</p>
            <p className="mt-4 text-center">
              <Link to="/auth/login" className="text-[#4B6BFB] hover:underline">
                Giriş sayfasına dön
              </Link>
            </p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                E-posta Adresi
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-[#242535] rounded-md focus:outline-none focus:ring-[#4B6BFB] focus:border-[#4B6BFB] focus:z-10 sm:text-sm"
                placeholder="E-posta adresiniz"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4B6BFB] hover:bg-[#4B6BFB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4B6BFB] ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    İşleniyor...
                  </span>
                ) : (
                  "Şifre Sıfırlama Bağlantısı Gönder"
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <Link to="/auth/login" className="text-sm text-[#4B6BFB] hover:underline">
                Giriş sayfasına dön
              </Link>
              <Link to="/auth/register" className="text-sm text-[#4B6BFB] hover:underline">
                Yeni hesap oluştur
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword

