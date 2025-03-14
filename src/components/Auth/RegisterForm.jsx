"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registerError, setRegisterError] = useState("")

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Hata mesajını temizle
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Ad Soyad zorunludur"
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-posta adresi zorunludur"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz"
    }

    if (!formData.password) {
      newErrors.password = "Şifre zorunludur"
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor"
    }

    if (!formData.gender) {
      newErrors.gender = "Cinsiyet seçimi zorunludur"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Form doğrulama
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setIsSubmitting(true)
    setRegisterError("")

    try {
      // Kayıt için gerekli verileri hazırla
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        userType: "user", // Varsayılan olarak normal kullanıcı
        status: true, // Varsayılan olarak aktif
      }

      await register(userData)
      navigate("/") // Başarılı kayıttan sonra ana sayfaya yönlendir
    } catch (err) {
      console.error("Register error:", err)
      setRegisterError(err.response?.data?.message || "Kayıt olurken bir hata oluştu")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0D1117] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#181A2A] p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Yeni hesap oluşturun
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Zaten hesabınız var mı?{" "}
            <Link to="/auth/login" className="font-medium text-[#4B6BFB] hover:text-[#4B6BFB]/80">
              Giriş yapın
            </Link>
          </p>
        </div>

        {registerError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {registerError}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ad Soyad
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.fullName ? "border-red-300" : "border-gray-300 dark:border-gray-700"
                } placeholder-gray-500 text-gray-900 dark:text-white dark:bg-[#242535] rounded-md focus:outline-none focus:ring-[#4B6BFB] focus:border-[#4B6BFB] focus:z-10 sm:text-sm`}
                placeholder="Ad Soyad"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                E-posta Adresi
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.email ? "border-red-300" : "border-gray-300 dark:border-gray-700"
                } placeholder-gray-500 text-gray-900 dark:text-white dark:bg-[#242535] rounded-md focus:outline-none focus:ring-[#4B6BFB] focus:border-[#4B6BFB] focus:z-10 sm:text-sm`}
                placeholder="E-posta adresiniz"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-300" : "border-gray-300 dark:border-gray-700"
                } placeholder-gray-500 text-gray-900 dark:text-white dark:bg-[#242535] rounded-md focus:outline-none focus:ring-[#4B6BFB] focus:border-[#4B6BFB] focus:z-10 sm:text-sm`}
                placeholder="Şifre"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="mb-4">
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
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.confirmPassword ? "border-red-300" : "border-gray-300 dark:border-gray-700"
                } placeholder-gray-500 text-gray-900 dark:text-white dark:bg-[#242535] rounded-md focus:outline-none focus:ring-[#4B6BFB] focus:border-[#4B6BFB] focus:z-10 sm:text-sm`}
                placeholder="Şifre tekrar"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cinsiyet
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.gender ? "border-red-300" : "border-gray-300 dark:border-gray-700"
                } placeholder-gray-500 text-gray-900 dark:text-white dark:bg-[#242535] rounded-md focus:outline-none focus:ring-[#4B6BFB] focus:border-[#4B6BFB] focus:z-10 sm:text-sm`}
              >
                <option value="">Seçiniz</option>
                <option value="Erkek">Erkek</option>
                <option value="Kadın">Kadın</option>
                <option value="Belirtmek İstemiyorum">Belirtmek İstemiyorum</option>
              </select>
              {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
            </div>
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
                  Kayıt yapılıyor...
                </span>
              ) : (
                "Kayıt Ol"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register

