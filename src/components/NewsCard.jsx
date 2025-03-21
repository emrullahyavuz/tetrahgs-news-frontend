import { Link } from "react-router-dom"
import { Eye, Star, MessageSquare, Clock, User, ArrowUpRight } from "lucide-react"
import CategoryBadge from "./CategoryBadge"

const NewsCard = ({ news }) => {
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

  // Özeti kısalt
  const truncateSummary = (text, maxLength = 120) => {
    if (!text || text.length <= maxLength) return text
    return text.substr(0, maxLength) + "..."
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Link to={`/news/${news.id}`}>
          <img
            className="h-48 w-full object-cover"
            src={news.imageUrl || `/placeholder.svg?height=300&width=400`}
            alt={news.title}
          />
        </Link>
        <div className="absolute top-3 left-3">
          <CategoryBadge category={news.category} />
        </div>
        {news.isBreaking && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-600 text-white">
              Son Dakika
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <Link to={`/news/${news.id}`} className="block">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
            {news.title}
          </h3>
        </Link>

        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{truncateSummary(news.summary)}</p>

        <div className="mt-4 flex items-center">
          <Link to={`/editor/${news.author?.id}`} className="flex items-center group">
            <img
              src={news.author?.avatar || `/placeholder.svg?height=32&width=32`}
              alt={news.author?.name}
              className="h-8 w-8 rounded-full object-cover mr-2"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {news.author?.name || "Anonim"}
            </span>
          </Link>

          <div className="ml-auto flex items-center space-x-3">
            <div className="flex items-center" title="Puan">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-xs text-gray-700 dark:text-gray-300">{news.rating?.toFixed(1) || "4.5"}</span>
            </div>
            <div className="flex items-center" title="Görüntülenme">
              <Eye className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-xs text-gray-700 dark:text-gray-300">{news.viewCount || 0}</span>
            </div>
            <div className="flex items-center" title="Yorum">
              <MessageSquare className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-xs text-gray-700 dark:text-gray-300">{news.commentCount || 0}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            <span>{getTimeAgo(news.createdAt)}</span>
          </div>

          <Link
            to={`/editor/${news.author?.id}`}
            className="flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <User className="h-3 w-3 mr-1" />
            Editörün Diğer Yazıları
            <ArrowUpRight className="h-3 w-3 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NewsCard

