import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Check, X, ArrowLeft, AlertCircle } from "lucide-react"
import {getCommentById,deleteComment,approveComment} from "../../services/commentService"
import newsApi from "../../services/newsService"

const CommentApproval = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [comment, setComment] = useState(null)
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [approving, setApproving] = useState(false)
  const [rejecting, setRejecting] = useState(false)

  // Yorumu getir
  useEffect(() => {
    const fetchComment = async () => {
      try {
        setLoading(true)
        // Burada commentService'e getCommentById eklenmelidir
        const response = await getCommentById(id)
        setComment(response.comment)

        // Yorumun ait olduğu haberi getir
        if (response.comment?.newsId) {
          const newsResponse = await newsApi.getNewsById(response.comment.newsId)
          setNews(newsResponse.data)
        }

        setLoading(false)
      } catch (err) {
        console.error("Yorum getirilirken hata:", err)
        setError("Yorum getirilirken bir hata oluştu")
        setLoading(false)
      }
    }

    if (id) {
      fetchComment()
    }
  }, [id])

  // Yorumu onayla
  const handleApprove = async () => {
    try {
      setApproving(true)
      await approveComment(id)
      navigate("/admin/comments", { state: { message: "Yorum başarıyla onaylandı" } })
    } catch (err) {
      console.error("Yorum onaylanırken hata:", err)
      setError("Yorum onaylanırken bir hata oluştu")
      setApproving(false)
    }
  }

  // Yorumu reddet
  const handleReject = async () => {
    try {
      setRejecting(true)
      await deleteComment(id)
      navigate("/admin/comments", { state: { message: "Yorum başarıyla reddedildi" } })
    } catch (err) {
      console.error("Yorum reddedilirken hata:", err)
      setError("Yorum reddedilirken bir hata oluştu")
      setRejecting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
        <span className="flex items-center">
          <AlertCircle size={18} className="mr-2" />
          {error}
        </span>
        <button className="absolute top-0 right-0 px-4 py-3" onClick={() => setError(null)}>
          &times;
        </button>
      </div>
    )
  }

  if (!comment) {
    return (
      <div className="text-center py-8">
        <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-medium text-gray-900 dark:text-white">Yorum bulunamadı</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">İstenen yorum bulunamadı veya silinmiş olabilir.</p>
        <button
          onClick={() => navigate("/admin/comments")}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Yorumlara Dön
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Yorum Onayı</h2>
        <button
          onClick={() => navigate("/admin/comments")}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <ArrowLeft size={16} className="mr-1" />
          Geri
        </button>
      </div>

      {/* Haber Bilgisi */}
      {news && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">İlgili Haber</h3>
          <p className="text-gray-700 dark:text-gray-300 font-medium">{news.title}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Kategori: {news.category}</span>
            <button
              onClick={() => window.open(`/news/${news.id}`, "_blank")}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Haberi Görüntüle
            </button>
          </div>
        </div>
      )}

      {/* Yorum Detayı */}
      <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex items-start">
          <img
            src={comment.user?.avatar || `/placeholder.svg?height=40&width=40`}
            alt={comment.user?.name}
            className="h-10 w-10 rounded-full object-cover mr-3"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">{comment.user?.name || "Anonim"}</h4>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(comment.createdAt).toLocaleString("tr-TR")}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
          </div>
        </div>
      </div>

      {/* Onay/Red Butonları */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleReject}
          disabled={rejecting}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {rejecting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              İşleniyor...
            </>
          ) : (
            <>
              <X size={16} className="mr-2" />
              Reddet
            </>
          )}
        </button>
        <button
          onClick={handleApprove}
          disabled={approving}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {approving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              İşleniyor...
            </>
          ) : (
            <>
              <Check size={16} className="mr-2" />
              Onayla
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default CommentApproval

