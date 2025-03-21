import axios from "axios"

const API_URL = "http://localhost:5000/api"

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Yetki hatası durumunda kullanıcıyı login sayfasına yönlendir
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token süresi dolmuş veya geçersiz
      if (error.response.status === 401) {
        localStorage.removeItem("token")
        // Eğer tarayıcı ortamındaysak yönlendirme yap
        if (typeof window !== "undefined") {
          window.location.href = "/login"
        }
      }
    }
    return Promise.reject(error)
  },
)

// Habere ait yorumları getir
export const getCommentsByNewsId = async (newsId) => {
  try {
    const response = await api.get(`/comments/news/${newsId}`)
    return {
      comments: response.data.data,
      pagination: response.data.pagination,
    }
  } catch (error) {
    throw error.response?.data || { message: error.message }
  }
}

// Belirli bir yorumu getir
export const getCommentById = async (commentId) => {
  try {
    const response = await api.get(`/comments/${commentId}`)
    return {
      success: true,
      comment: response.data.data,
    }
  } catch (error) {
    throw error.response?.data || { message: error.message }
  }
}

// Yeni yorum ekle
export const createComment = async (commentData) => {
  try {
    const response = await api.post("/comments", commentData)
    return {
      success: true,
      comment: response.data.data,
    }
  } catch (error) {
    throw error.response?.data || { message: error.message }
  }
}

// Yorumu güncelle
export const updateComment = async (commentId, commentData) => {
  try {
    const response = await api.put(`/comments/${commentId}`, commentData)
    return {
      success: true,
      comment: response.data.data,
    }
  } catch (error) {
    throw error.response?.data || { message: error.message }
  }
}

// Yorumu sil
export const deleteComment = async (commentId) => {
  try {
    await api.delete(`/comments/${commentId}`)
    return {
      success: true,
    }
  } catch (error) {
    throw error.response?.data || { message: error.message }
  }
}

// Yorumu beğen
export const likeComment = async (commentId) => {
  try {
    const response = await api.post(`/comments/${commentId}/like`)
    return {
      success: true,
      likes: response.data.likes,
    }
  } catch (error) {
    throw error.response?.data || { message: error.message }
  }
}

// Yorum beğenisini kaldır
export const unlikeComment = async (commentId) => {
  try {
    const response = await api.delete(`/comments/${commentId}/like`)
    return {
      success: true,
    }
  } catch (error) {
    throw error.response?.data || { message: error.message }
  }
}

// Yorumu raporla
export const reportComment = async (commentId, reason) => {
  try {
    const response = await api.post(`/comments/${commentId}/report`, { reason })
    return {
      success: true,
    }
  } catch (error) {
    throw error.response?.data || { message: error.message }
  }
}

// Yorumu onayla
export const approveComment = async (commentId) => {
  try {
    const response = await api.put(`/comments/${commentId}/approve`)
    return {
      success: true,
      comment: response.data.data,
    }
  } catch (error) {
    throw error.response?.data || { message: error.message }
  }
}

