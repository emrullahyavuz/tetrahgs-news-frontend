import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [tokenValid, setTokenValid] = useState(true)

  const { token } = useParams()
  const navigate = useNavigate()
  const { resetUserPassword } = useAuth()

  // Token kontrolü
  useEffect(() => {
    if (!token) {
      setTokenValid(false)
      setError("Geçersiz veya eksik şifre sıfırlama bağlantısı.")
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Form doğrulama
    if (!password) {
      setError("Şifre zorunludur")
      return
    }

    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır")
      return
    }

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      await resetUserPassword(token, password)
      setSuccess(true)

      // 3 saniye sonra giriş sayfasına yönlendir
      setTimeout(() => {
        navigate("/auth/login")
      }, 3000)
    } catch (err) {
      console.error("Password reset error:", err)
      setError(err.message || "Şifre sıfırlanırken bir hata oluştu")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0D1117] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#181A2A] p-8 rounded-xl shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Geçersiz Bağlantı
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Bu şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş.
            </p>
          </div>
          <div className="text-center">
            <Link to="/auth/forgot-password" className="font-medium text-[#4B6BFB] hover:text-[#4B6BFB]/80">
              Yeni bir şifre sıfırlama bağlantısı talep et
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0D1117] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#181A2A] p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Şifrenizi Sıfırlayın
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">Lütfen yeni şifrenizi girin.</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>
        )}

        {success ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <p>Şifreniz başarıyla sıfırlandı. Giriş sayfasına yönlendiriliyorsunuz...</p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Yeni Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-[#242535] rounded-md focus:outline-none focus:ring-[#4B6BFB] focus:border-[#4B6BFB] focus:z-10 sm:text-sm"
                placeholder="Yeni şifreniz"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Şifre Tekrar
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-[#242535] rounded-md focus:outline-none focus:ring-[#4B6BFB] focus:border-[#4B6BFB] focus:z-10 sm:text-sm"
                placeholder="Şifrenizi tekrar girin"
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
                  "Şifreyi Sıfırla"
                )}
              </button>
            </div>

            <div className="text-center">
              <Link to="/auth/login" className="text-sm text-[#4B6BFB] hover:underline">
                Giriş sayfasına dön
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPassword

