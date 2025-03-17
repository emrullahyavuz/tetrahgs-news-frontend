import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {
  ArrowLeft,
  Calendar,
  MessageCircle,
  Star,
  StarHalf,
  Send,
  ThumbsUp,
  User,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useComments } from "../context/CommentContext"
import { useAuth } from "../context/AuthContext"
import { getNewsById } from "../services/newsService"

// Star Rating Component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
      ))}
      <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">{rating ? rating.toFixed(1) : "0.0"}</span>
    </div>
  )
}

// Comment Component
const Comment = ({ comment, onLike, onReply, onDelete, isOwner }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 py-6 last:border-0">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <img
            src={comment.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
            alt={comment.author}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-gray-900 dark:text-white">{comment.author}</h4>
            <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">{comment.content}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLike(comment.id)}
              className="inline-flex items-center text-gray-500 hover:text-[#4B6BFB] transition-colors"
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span className="text-sm">{comment.likes || 0}</span>
            </button>
            <button
              onClick={() => onReply(comment)}
              className="text-sm text-gray-500 hover:text-[#4B6BFB] transition-colors"
            >
              Reply
            </button>
            {isOwner && (
              <button
                onClick={() => onDelete(comment.id)}
                className="text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Related Article Card
const RelatedArticleCard = ({ article }) => {
  return (
    <Link to={`/news/${article.id}`} className="block group">
      <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-[#181A2A] border border-gray-100 dark:border-[#181A2A]">
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.imageUrl || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-white/90 dark:bg-[#181A2A]/90 text-[#4B6BFB] rounded-lg text-sm font-medium">
              {article.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-[#4B6BFB] transition-colors">
            {article.title}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{article.date}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

const NewsDetailPage = () => {
  const { id } = useParams()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAllComments, setShowAllComments] = useState(false)
  const [replyTo, setReplyTo] = useState(null)

  // Yorum context'inden gerekli fonksiyonları al
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    fetchComments,
    addComment,
    removeComment,
    likeComment,
  } = useComments()

  // Auth context'inden kullanıcı bilgilerini al
  const { user, isAuthenticated } = useAuth()

  // Form state for new comment
  const [commentContent, setCommentContent] = useState("")
  const [commentName, setCommentName] = useState("")
  const [commentEmail, setCommentEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState("")

  useEffect(() => {
    // Kullanıcı giriş yapmışsa, form alanlarını doldur
    if (isAuthenticated && user) {
      setCommentName(user.fullName || user.name || "")
      setCommentEmail(user.email || "")
    }
  }, [isAuthenticated, user])

  useEffect(() => {
    // Haber ve yorumları yükle
    const fetchNewsAndComments = async () => {
      try {
        setLoading(true)

        // Haber detayını API'den çek
        const response = await getNewsById(id)
        setNews(response.news)

        // Yorumları API'den çek
        await fetchComments(id)

        setError(null)
      } catch (err) {
        console.error("Haber yüklenirken hata:", err)
        setError("Haber yüklenemedi. Lütfen daha sonra tekrar deneyin.")
      } finally {
        setLoading(false)
      }
    }

    fetchNewsAndComments()
    // Scroll to top when navigating to a new news post
    window.scrollTo(0, 0)
  }, [id, fetchComments])

  // Yorum gönderme işlemi
  const handleCommentSubmit = async (e) => {
    e.preventDefault()

    // Form doğrulama
    if (!commentContent.trim()) {
      setFormError("Yorum içeriği boş olamaz.")
      return
    }

    if (!isAuthenticated && !commentName.trim()) {
      setFormError("İsim alanı zorunludur.")
      return
    }

    setIsSubmitting(true)
    setFormError("")

    try {
      // Yorum verilerini hazırla
      const commentData = {
        content: commentContent,
        parentId: replyTo ? replyTo.id : null,
      }

      // Kullanıcı giriş yapmamışsa, isim ve e-posta bilgilerini ekle
      if (!isAuthenticated) {
        commentData.author = commentName
        commentData.email = commentEmail
      }

      // Yorumu API'ye gönder
      await addComment(id, commentData)

      // Form alanlarını temizle
      setCommentContent("")
      setReplyTo(null)

      // Kullanıcı giriş yapmamışsa, isim ve e-posta alanlarını da temizle
      if (!isAuthenticated) {
        setCommentName("")
        setCommentEmail("")
      }
    } catch (err) {
      setFormError(err.message || "Yorum gönderilirken bir hata oluştu.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Yoruma beğeni ekle
  const handleLikeComment = (commentId) => {
    likeComment(commentId)
  }

  // Yoruma yanıt ver
  const handleReplyComment = (comment) => {
    setReplyTo(comment)
    // Yorum formuna scroll
    document.getElementById("comment-form").scrollIntoView({ behavior: "smooth" })
  }

  // Yorumu sil
  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Bu yorumu silmek istediğinizden emin misiniz?")) {
      try {
        await removeComment(commentId)
      } catch (err) {
        console.error("Yorum silinirken hata oluştu:", err)
        alert(err.message || "Yorum silinirken bir hata oluştu.")
      }
    }
  }

  const displayedComments = showAllComments ? comments : comments.slice(0, 3)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0D1117]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4B6BFB]"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Haber yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0D1117]">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Hata</h2>
          <p className="text-gray-700 dark:text-gray-300">{error}</p>
          <Link to="/news" className="mt-6 inline-block px-6 py-2 bg-[#4B6BFB] text-white rounded-lg">
            Haberlere Dön
          </Link>
        </div>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0D1117]">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Haber Bulunamadı</h2>
          <p className="text-gray-700 dark:text-gray-300">Aradığınız haber mevcut değil veya kaldırılmış olabilir.</p>
          <Link to="/news" className="mt-6 inline-block px-6 py-2 bg-[#4B6BFB] text-white rounded-lg">
            Haberlere Dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-[#0D1117] min-h-screen">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-[#4B6BFB]/10 to-purple-500/10 dark:from-[#4B6BFB]/20 dark:to-purple-500/20">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link to="/news" className="inline-flex items-center text-[#4B6BFB] mb-6 hover:underline">
            <ArrowLeft size={18} className="mr-2" />
            <span className="text-[#F7A91E]">Tüm haberlere dön</span>
          </Link>

          {/* News Header */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link
                to={`/news?category=${news.categorySlug}`}
                className="px-3 py-1 bg-[#4B6BFB]/10 text-[#4B6BFB] dark:bg-[#4B6BFB]/20 rounded-full text-sm font-medium"
              >
                {news.category}
              </Link>
              <span className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Clock size={14} className="mr-1" />
                {Math.ceil(news.content.length / 1000)} dk okuma
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {news.title}
            </h1>

            {/* Views and Comments Count */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <span className="flex items-center text-gray-600 dark:text-gray-400">
                <MessageCircle size={16} className="mr-1" />
                {comments.length} yorum
              </span>
              <span className="flex items-center text-gray-600 dark:text-gray-400">
                <User size={16} className="mr-1" />
                {news.views} görüntülenme
              </span>
            </div>

            {/* Author and Meta Info */}
            <div className="flex items-center mb-8 p-4 bg-white dark:bg-[#181A2A] rounded-xl shadow-sm">
              <img
                src={news.authorImage || "https://randomuser.me/api/portraits/men/32.jpg"}
                alt={news.author}
                className="w-12 h-12 rounded-full mr-4 border-2 border-white dark:border-[#181A2A] shadow-sm"
              />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{news.author}</h3>
                <p className="text-gray-500 text-sm">Yazar</p>
              </div>
              <div className="ml-auto flex items-center text-gray-500">
                <Calendar size={16} className="mr-1" />
                <span>{news.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Image */}
        <div className="max-w-4xl mx-auto mb-10 -mt-6">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src={news.imageUrl || "/placeholder.svg"} alt={news.title} className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* News Content */}
              <div className="bg-white dark:bg-[#181A2A] rounded-xl shadow-sm p-6 md:p-8 mb-8">
                <div
                  className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-[#4B6BFB] prose-img:rounded-xl prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:text-sm"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />
              </div>

              {/* Tags */}
              {news.tags && news.tags.length > 0 && (
                <div className="bg-white dark:bg-[#181A2A] rounded-xl shadow-sm p-6 mb-8">
                  <h3 className="text-lg font-medium mb-4 dark:text-white">Etiketler</h3>
                  <div className="flex flex-wrap gap-2">
                    {news.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 bg-gray-100 dark:bg-[#0D1117] text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <div className="bg-white dark:bg-[#181A2A] rounded-xl shadow-sm p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-6 dark:text-white">Yorumlar ({comments.length})</h3>

                {/* Comment Form */}
                <div id="comment-form" className="mb-8 bg-gray-50 dark:bg-[#0D1117] p-6 rounded-xl">
                  <h4 className="text-lg font-medium mb-4 dark:text-white">
                    {replyTo ? `${replyTo.author} kullanıcısına yanıt ver` : "Yorum yap"}
                  </h4>

                  {replyTo && (
                    <div className="mb-4 p-3 bg-gray-100 dark:bg-[#181A2A] rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{replyTo.content}"</p>
                      <button onClick={() => setReplyTo(null)} className="text-xs text-[#4B6BFB] mt-2 hover:underline">
                        Yanıtı İptal Et
                      </button>
                    </div>
                  )}

                  {formError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{formError}</div>}

                  <form onSubmit={handleCommentSubmit}>
                    {!isAuthenticated && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            İsim *
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={commentName}
                            onChange={(e) => setCommentName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#4B6BFB] focus:border-transparent dark:bg-[#181A2A] dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            E-posta (yayınlanmayacak)
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={commentEmail}
                            onChange={(e) => setCommentEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#4B6BFB] focus:border-transparent dark:bg-[#181A2A] dark:text-white"
                          />
                        </div>
                      </div>
                    )}
                    <div className="mb-4">
                      <label
                        htmlFor="comment"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Yorum *
                      </label>
                      <textarea
                        id="comment"
                        rows={4}
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#4B6BFB] focus:border-transparent dark:bg-[#181A2A] dark:text-white"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex items-center px-6 py-3 bg-[#F7A91E] rounded-lg transition-colors ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#231F20] mr-2"></div>
                          <span className="text-[#231F20]">Gönderiliyor...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2 text-[#231F20]" />
                          <span className="text-[#231F20] hover:text-white">Yorum Gönder</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Comments Loading State */}
                {commentsLoading && (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#4B6BFB]"></div>
                  </div>
                )}

                {/* Comments Error State */}
                {commentsError && <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-6">{commentsError}</div>}

                {/* Comments List */}
                {!commentsLoading && comments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">Henüz yorum yok. İlk yorumu siz yapın!</p>
                  </div>
                ) : (
                  <div className="space-y-0">
                    {displayedComments.map((comment) => (
                      <Comment
                        key={comment.id}
                        comment={comment}
                        onLike={handleLikeComment}
                        onReply={handleReplyComment}
                        onDelete={handleDeleteComment}
                        isOwner={isAuthenticated && user && (user.id === comment.userId || user.userType === "admin")}
                      />
                    ))}
                  </div>
                )}

                {/* Show More Comments Button */}
                {comments.length > 3 && (
                  <button
                    onClick={() => setShowAllComments(!showAllComments)}
                    className="mt-6 w-full py-3 flex items-center justify-center text-[#4B6BFB] bg-gray-50 dark:bg-[#0D1117] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {showAllComments ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-2" />
                        Daha Az Göster
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-2 text-[#F7A91E]" />
                        <span className="text-[#F7A91E]">Tüm Yorumları Göster ({comments.length})</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              {/* Author Card */}
              <div className="bg-white dark:bg-[#181A2A] rounded-xl shadow-sm p-6 mb-6">
                <div className="text-center">
                  <img
                    src={news.authorImage || "https://randomuser.me/api/portraits/men/32.jpg"}
                    alt={news.author}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-white dark:border-[#181A2A] shadow-sm"
                  />
                  <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-1">{news.author}</h3>
                  <p className="text-gray-500 text-sm mb-4">Yazar</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    Teknoloji ve yazılım alanında uzmanlaşmış, güncel gelişmeleri takip eden bir yazar.
                  </p>
                  <button className="w-full py-2 bg-[#4B6BFB]/10 text-[#4B6BFB] rounded-lg hover:bg-[#4B6BFB]/20 transition-colors">
                    Tüm Yazıları Görüntüle
                  </button>
                </div>
              </div>

              {/* Share Card */}
              <div className="bg-white dark:bg-[#181A2A] rounded-xl shadow-sm p-6 mb-6">
                <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-4">Bu Haberi Paylaş</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="flex-1 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#1877F2]/90 transition-colors">
                    Facebook
                  </button>
                  <button className="flex-1 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1DA1F2]/90 transition-colors">
                    Twitter
                  </button>
                  <button className="flex-1 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#0A66C2]/90 transition-colors">
                    LinkedIn
                  </button>
                </div>
              </div>

              {/* Tags Card */}
              {news.tags && news.tags.length > 0 && (
                <div className="bg-white dark:bg-[#181A2A] rounded-xl shadow-sm p-6">
                  <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-4">Popüler Etiketler</h3>
                  <div className="flex flex-wrap gap-2">
                    {news.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 bg-gray-100 dark:bg-[#0D1117] text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Articles */}
          {news.relatedNews && news.relatedNews.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">İlgili Haberler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.relatedNews.map((article) => (
                  <RelatedArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsDetailPage

