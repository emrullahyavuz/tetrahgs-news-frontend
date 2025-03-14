"use client"

import { createContext, useContext, useState } from "react"
import { getCommentsByNewsId, createComment, updateComment, deleteComment } from "../services/commentService"

const CommentContext = createContext()

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Haber ID'sine göre yorumları getir
  const fetchComments = async (newsId) => {
    try {
      setLoading(true)
      setError(null)
      const response = await getCommentsByNewsId(newsId)
      setComments(response.comments || [])
      return response.comments || []
    } catch (err) {
      setError(err.message || "Yorumlar yüklenirken bir hata oluştu.")
      return []
    } finally {
      setLoading(false)
    }
  }

  // Yeni yorum ekle
  const addComment = async (newsId, commentData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await createComment({
        newsId,
        ...commentData,
      })

      // Yeni yorumu listeye ekle
      if (response.comment) {
        setComments((prevComments) => [response.comment, ...prevComments])
      }

      return response
    } catch (err) {
      setError(err.message || "Yorum eklenirken bir hata oluştu.")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Yorumu güncelle
  const editComment = async (commentId, commentData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await updateComment(commentId, commentData)

      // Yorumu listede güncelle
      if (response.comment) {
        setComments((prevComments) =>
          prevComments.map((comment) => (comment.id === commentId ? response.comment : comment)),
        )
      }

      return response
    } catch (err) {
      setError(err.message || "Yorum güncellenirken bir hata oluştu.")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Yorumu sil
  const removeComment = async (commentId) => {
    try {
      setLoading(true)
      setError(null)
      await deleteComment(commentId)

      // Yorumu listeden kaldır
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId))

      return { success: true }
    } catch (err) {
      setError(err.message || "Yorum silinirken bir hata oluştu.")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Yoruma beğeni ekle (frontend'de simüle edilmiş)
  const likeComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, likes: (comment.likes || 0) + 1 } : comment,
      ),
    )
  }

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        error,
        fetchComments,
        addComment,
        editComment,
        removeComment,
        likeComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}

export const useComments = () => useContext(CommentContext)

