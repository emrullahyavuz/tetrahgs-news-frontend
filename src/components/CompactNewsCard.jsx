import { Link } from "react-router-dom"
import { Calendar } from "lucide-react"

const CompactNewsCard = ({ news }) => {
  // Destructure news properties with fallbacks for safety
  const { id, title, imageUrl, category, categorySlug, createdAt } = news

  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex items-center gap-3 mb-4 group">
      {/* Thumbnail */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <Link to={`/news/${id}`}>
          <img
            src={imageUrl || "/placeholder.svg?height=200&width=200"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Category */}
        <Link to={`/news?category=${categorySlug}`} className="text-xs text-[#4B6BFB] font-medium hover:underline">
          {category}
        </Link>

        {/* Title */}
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#4B6BFB] transition-colors">
          <Link to={`/news/${id}`}>{title}</Link>
        </h4>

        {/* Date */}
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <Calendar className="w-3 h-3 mr-1" />
          {formattedDate}
        </div>
      </div>
    </div>
  )
}

export default CompactNewsCard

