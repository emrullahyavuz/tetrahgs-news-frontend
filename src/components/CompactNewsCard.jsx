import { Link } from "react-router-dom"
import { Calendar, Eye, Star } from "lucide-react"

const CompactNewsCard = ({ news }) => {
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

    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("tr-TR", options)
  }

  return (
    <div className="flex items-start space-x-3 group">
      <Link to={`/news/${news.id}`} className="flex-shrink-0">
        <img
          src={news.imageUrl || `/placeholder.svg?height=80&width=80`}
          alt={news.title}
          className="h-20 w-20 object-cover rounded-lg"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/news/${news.id}`} className="block">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {news.title}
          </h4>
        </Link>
        <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-2">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{getTimeAgo(news.createdAt)}</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-3 w-3 mr-1" />
            <span>{news.viewCount || 0}</span>
          </div>
          {news.rating && (
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-500 mr-1" />
              <span>{news.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="mt-1 text-xs">
          <Link
            to={`/editor/${news.author?.id}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            {news.author?.name || "Anonim"}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CompactNewsCard

