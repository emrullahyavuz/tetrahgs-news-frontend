import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import {
  Calendar,
  Eye,
  Star,
  MessageSquare,
  Clock,
  User,
  ArrowUpRight,
  Share2,
  Bookmark,
  ThumbsUp,
  ChevronLeft,
  AlertCircle,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  LinkIcon,
  Check,
  Tag,
} from "lucide-react"
import newsApi from "../services/newsService"
// import commentApi from "../services/commentService"
import { useAuth } from "../context/AuthContext"
import CategoryBadge from "../components/CategoryBadge"
import CompactNewsCard from "../components/CompactNewsCard"

export default function NewsDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  const [news, setNews] = useState(null)
  const [relatedNews, setRelatedNews] = useState([])
  const [editorNews, setEditorNews] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [commentText, setCommentText] = useState("")
  const [submittingComment, setSubmittingComment] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [copied, setCopied] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)

  // Haberi getir
  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await newsApi.getNewsById(id)
      setNews(response.data)
      setLoading(false)

      // Haberi görüntülenme sayısını artır
      await newsApi.incrementViewCount(id)

      // İlgili haberleri getir
      fetchRelatedNews(response.data.category)

      // Editörün diğer haberlerini getir
      if (response.data.author?.id) {
        fetchEditorNews(response.data.author.id)
      }

      // Yorumları getir
      fetchComments()
    } catch (err) {
      setError(err.message || "Haber getirilirken bir hata oluştu")
      setLoading(false)
    }
  }

  // İlgili haberleri getir
  const fetchRelatedNews = async (category) => {
    try {
      const response = await newsApi.getNews({
        category,
        limit: 4,
        excludeId: id,
      })
      setRelatedNews(response.data)
    } catch (err) {
      console.error("İlgili haberler getirilirken bir hata oluştu:", err)
    }
  }

  // Editörün diğer haberlerini getir
  const fetchEditorNews = async (authorId) => {
    try {
      const response = await newsApi.getNewsByAuthor(authorId, {
        limit: 3,
        excludeId: id,
      })
      setEditorNews(response.data)
    } catch (err) {
      console.error("Editörün haberleri getirilirken bir hata oluştu:", err)
    }
  }

  // Yorumları getir
  const fetchComments = async () => {
    try {
      const response = await commentApi.getCommentsByNewsId(id)
      setComments(response.data)
    } catch (err) {
      console.error("Yorumlar getirilirken bir hata oluştu:", err)
    }
  }

  // Component mount olduğunda haberi getir
  useEffect(() => {
    fetchNews()
    // URL değiştiğinde sayfanın üstüne kaydır
    window.scrollTo(0, 0)
  }, [id])

  // Yorum gönder
  const handleSubmitComment = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/news/${id}` } })
      return
    }

    if (!commentText.trim()) return

    try {
      setSubmittingComment(true)
      await commentApi.addComment({
        newsId: id,
        content: commentText,
      })
      setCommentText("")
      fetchComments() // Yorumları yeniden getir
      setSubmittingComment(false)
    } catch (err) {
      console.error("Yorum gönderilirken bir hata oluştu:", err)
      setSubmittingComment(false)
    }
  }

  // Haberi puanla
  const handleRateNews = async (rating) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/news/${id}` } })
      return
    }

    try {
      await newsApi.rateNews(id, rating)
      setUserRating(rating)
      // Haberi yeniden getir (güncel puanı almak için)
      fetchNews()
    } catch (err) {
      console.error("Haber puanlanırken bir hata oluştu:", err)
    }
  }

  // Haberi paylaş
  const handleShare = (platform) => {
    const url = window.location.href
    const title = news?.title || "Teknoloji Haberi"

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
        break
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          "_blank",
        )
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        break
      case "copy":
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        break
      default:
        break
    }

    setShowShareOptions(false)
  }

  // Tarih formatını düzenle
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("tr-TR", options)
  }

  // Zaman farkını hesapla
  const getTimeAgo = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} saniye önce`
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} dakika önce`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} saat önce`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) {
      return `${diffInDays} gün önce`
    }

    return formatDate(dateString)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" />
            Geri Dön
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg relative mb-6">
            <span className="flex items-center">
              <AlertCircle size={18} className="mr-2" />
              {error}
            </span>
            <button className="absolute top-0 right-0 mt-3 mr-4" onClick={() => setError(null)}>
              &times;
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* News Content */}
        {!loading && news && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - 2/3 width */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                {/* News Header */}
                <div className="relative">
                  <img
                    className="w-full h-80 object-cover"
                    src={news.imageUrl || `/placeholder.svg?height=400&width=800`}
                    alt={news.title}
                  />
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <CategoryBadge category={news.category} />
                    {news.isBreaking && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-600 text-white">
                        Son Dakika
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {/* Title */}
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{news.title}</h1>

                  {/* Author and Date */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-4 sm:mb-0">
                      <Link to={`/editor/${news.author?.id}`} className="flex items-center group">
                        <img
                          src={news.author?.avatar || `/placeholder.svg?height=48&width=48`}
                          alt={news.author?.name}
                          className="h-12 w-12 rounded-full object-cover mr-3"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {news.author?.name || "Anonim"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{news.author?.title || "Editör"}</p>
                        </div>
                      </Link>

                      <Link
                        to={`/editor/${news.author?.id}`}
                        className="ml-4 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center"
                      >
                        Tüm Yazıları
                        <ArrowUpRight size={12} className="ml-1" />
                      </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={16} className="mr-1" />
                        <span>{formatDate(news.createdAt)}</span>
                      </div>

                      {news.updatedAt && news.updatedAt !== news.createdAt && (
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock size={16} className="mr-1" />
                          <span>Güncellendi: {getTimeAgo(news.updatedAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mb-6">
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300 italic">{news.summary}</p>
                  </div>

                  {/* Content */}
                  <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
                    <div dangerouslySetInnerHTML={{ __html: news.content }} />
                  </div>

                  {/* Tags */}
                  {news.tags && news.tags.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Etiketler:</h3>
                      <div className="flex flex-wrap gap-2">
                        {news.tags.map((tag) => (
                          <Link
                            key={tag}
                            to={`/tag/${tag.toLowerCase()}`}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stats and Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-t border-b border-gray-200 dark:border-gray-700 mb-8">
                    <div className="flex items-center space-x-6 mb-4 sm:mb-0">
                      <div className="flex items-center">
                        <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {news.viewCount || 0} görüntülenme
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{comments.length} yorum</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <button
                          onClick={() => setShowShareOptions(!showShareOptions)}
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Share2 size={18} />
                        </button>

                        {showShareOptions && (
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                            <div className="p-2">
                              <button
                                onClick={() => handleShare("facebook")}
                                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                              >
                                <Facebook size={16} className="mr-2 text-blue-600" />
                                Facebook
                              </button>
                              <button
                                onClick={() => handleShare("twitter")}
                                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                              >
                                <Twitter size={16} className="mr-2 text-blue-400" />
                                Twitter
                              </button>
                              <button
                                onClick={() => handleShare("linkedin")}
                                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                              >
                                <Linkedin size={16} className="mr-2 text-blue-700" />
                                LinkedIn
                              </button>
                              <button
                                onClick={() => handleShare("copy")}
                                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                              >
                                {copied ? (
                                  <>
                                    <Check size={16} className="mr-2 text-green-500" />
                                    Kopyalandı!
                                  </>
                                ) : (
                                  <>
                                    <LinkIcon size={16} className="mr-2 text-gray-500" />
                                    Bağlantıyı Kopyala
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <Bookmark size={18} />
                      </button>

                      <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <ThumbsUp size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Bu haberi değerlendirin</h3>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRateNews(star)}
                          className={`p-1 ${
                            star <= userRating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
                          } hover:text-yellow-500 focus:outline-none transition-colors`}
                        >
                          <Star size={24} fill={star <= userRating ? "currentColor" : "none"} />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        {news.rating ? `${news.rating.toFixed(1)} / 5 (${news.ratingCount || 0} oy)` : "Henüz oy yok"}
                      </span>
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      Yorumlar ({comments.length})
                    </h3>

                    {/* Comment Form */}
                    <div className="mb-8">
                      <form onSubmit={handleSubmitComment} className="space-y-4">
                        <div>
                          <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder={isAuthenticated ? "Yorumunuzu yazın..." : "Yorum yapmak için giriş yapın"}
                            disabled={!isAuthenticated || submittingComment}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                            rows={4}
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={!isAuthenticated || !commentText.trim() || submittingComment}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {submittingComment ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                Gönderiliyor...
                              </>
                            ) : (
                              <>
                                <Send size={16} className="mr-2" />
                                Yorum Gönder
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Comments List */}
                    {comments.length === 0 ? (
                      <div className="text-center py-8 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        <MessageSquare size={32} className="mx-auto text-gray-400 dark:text-gray-500 mb-2" />
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">Henüz yorum yok</h4>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">İlk yorumu siz yapın!</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {comments.map((comment) => (
                          <div key={comment.id} className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                            <div className="flex items-start">
                              <img
                                src={comment.user?.avatar || `/placeholder.svg?height=40&width=40`}
                                alt={comment.user?.name}
                                className="h-10 w-10 rounded-full object-cover mr-3"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                    {comment.user?.name || "Anonim"}
                                  </h4>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {getTimeAgo(comment.createdAt)}
                                  </span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                                <div className="mt-2 flex items-center space-x-4">
                                  <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Yanıtla
                                  </button>
                                  <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center">
                                    <ThumbsUp size={12} className="mr-1" />
                                    Beğen ({comment.likeCount || 0})
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - 1/3 width */}
            <div className="lg:col-span-1 space-y-8">
              {/* Author Info */}
              {news.author && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <User size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
                    Yazar Hakkında
                  </h3>
                  <div className="flex items-center mb-4">
                    <img
                      src={news.author.avatar || `/placeholder.svg?height=64&width=64`}
                      alt={news.author.name}
                      className="h-16 w-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">{news.author.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{news.author.title || "Editör"}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {news.author.bio || "Teknoloji ve bilim alanında uzmanlaşmış deneyimli bir editör."}
                  </p>
                  <Link
                    to={`/editor/${news.author.id}`}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Tüm Yazılarını Gör
                    <ArrowUpRight size={16} className="ml-1" />
                  </Link>
                </div>
              )}

              {/* Editor's Other Articles */}
              {editorNews.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <User size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
                    Editörün Diğer Yazıları
                  </h3>
                  <div className="space-y-4">
                    {editorNews.map((news) => (
                      <CompactNewsCard key={news.id} news={news} />
                    ))}
                  </div>
                </div>
              )}

              {/* Related News */}
              {relatedNews.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Tag size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
                    Benzer Haberler
                  </h3>
                  <div className="space-y-4">
                    {relatedNews.map((news) => (
                      <CompactNewsCard key={news.id} news={news} />
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-sm p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Güncel Haberlerden Haberdar Olun</h3>
                <p className="text-sm text-blue-100 mb-4">En son teknoloji haberlerini e-posta kutunuza gönderelim.</p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Abone Ol
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

