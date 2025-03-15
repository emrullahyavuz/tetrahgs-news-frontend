import axios from "axios"

const API_URL = "http://localhost:5000"

// Tüm yorumları getir (Admin, Editor)
export const getAllComments = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/comments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Yorumlar yüklenirken bir hata oluştu." }
  }
}

// Haber ID'sine göre yorumları getir (Public)
export const getCommentsByNewsId = async (newsId) => {
  try {
    
    const response = await axios.get(`${API_URL}/api/comments/news/${newsId}`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Yorumlar yüklenirken bir hata oluştu." }
  }
}

// Onay bekleyen yorumları getir (Admin, Editor)
export const getPendingComments = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/comments/pending`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Onay bekleyen yorumlar yüklenirken bir hata oluştu." }
  }
}

// Kullanıcının kendi yorumlarını getir (Private)
export const getUserComments = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/comments/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Yorumlarınız yüklenirken bir hata oluştu." }
  }
}

// Yorum oluştur (Private)
export const createComment = async (commentData) => {
  try {
    debugger;
    const response = await axios.post(`${API_URL}/api/comments`, commentData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Yorum gönderilirken bir hata oluştu." }
  }
}

// Yorum güncelle (Admin, Editor, Comment Owner)
export const updateComment = async (commentId, commentData) => {
  try {
    const response = await axios.put(`${API_URL}/api/comments/${commentId}`, commentData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Yorum güncellenirken bir hata oluştu." }
  }
}

// Yorumu onayla (Admin, Editor)
export const approveComment = async (commentId) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/comments/${commentId}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Yorum onaylanırken bir hata oluştu." }
  }
}

// Yorumu reddet (Admin, Editor)
export const rejectComment = async (commentId) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/comments/${commentId}/reject`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Yorum reddedilirken bir hata oluştu." }
  }
}

// Yorumu sil (Admin, Editor, Comment Owner)
export const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Yorum silinirken bir hata oluştu." }
  }
}

// Haber ID'sine göre yorum sayısını getir (Public)
export const getCommentCountByNewsId = async (newsId) => {
  try {
    const response = await axios.get(`${API_URL}/api/comments/count/news/${newsId}`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Yorum sayısı yüklenirken bir hata oluştu." }
  }
}

