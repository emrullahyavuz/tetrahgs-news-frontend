import { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  getCommentsByNewsId,
  createComment,
  updateComment,
  deleteComment,
} from "../services/commentService";

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchedNewsIds = useRef(new Set()); // Daha önce istek yapılan haber ID'lerini saklar

  // Haber ID'sine göre yorumları getir (tekrarlanan istekleri önlemek için)
  const fetchComments = async (newsId) => {
    if (!newsId || fetchedNewsIds.current.has(newsId)) return; // Zaten bu haber için istek yapıldıysa tekrar yapma

    try {
      setLoading(true);
      setError(null);
      fetchedNewsIds.current.add(newsId); // İstek yapılan haber ID'yi kaydet

      const response = await getCommentsByNewsId(newsId);
      setComments(response.comments || []);

      return response.comments || [];
    } catch (err) {
      setError(err.message || "Yorumlar yüklenirken bir hata oluştu.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Yeni yorum ekle
  const addComment = async (newsId, commentData) => {
    try {
      setLoading(true);
      setError(null);
      debugger;
      const response = await createComment({ newsId, ...commentData });

      if (response.comment) {
        setComments((prevComments) => [response.comment, ...prevComments]);
      }

      return response;
    } catch (err) {
      setError(err.message || "Yorum eklenirken bir hata oluştu.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Yorumu güncelle
  const editComment = async (commentId, commentData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateComment(commentId, commentData);

      if (response.comment) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId ? response.comment : comment
          )
        );
      }

      return response;
    } catch (err) {
      setError(err.message || "Yorum güncellenirken bir hata oluştu.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Yorumu sil
  const removeComment = async (commentId) => {
    try {
      setLoading(true);
      setError(null);
      await deleteComment(commentId);

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );

      return { success: true };
    } catch (err) {
      setError(err.message || "Yorum silinirken bir hata oluştu.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Yoruma beğeni ekle
  const likeComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: (comment.likes || 0) + 1 }
          : comment
      )
    );
  };

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
  );
};

export const useComments = () => useContext(CommentContext);
