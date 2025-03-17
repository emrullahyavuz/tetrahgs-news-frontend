import { Link } from "react-router-dom"
import { Calendar, MessageCircle, ArrowRight } from "lucide-react"

const FeaturedNewsCard = ({ news }) => {
  // Destructure news properties with fallbacks for safety
  const {
    id,
    title,
    slug,
    summary,
    content,
    imageUrl,
    category,
    categorySlug,
    author,
    createdAt,
    commentsCount = 0,
    views = 0,
  } = news

  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Calculate read time (roughly 200 words per minute)
  const readTime = content ? Math.max(1, Math.ceil(content.split(/\s+/).length / 200)) : 1

  return (
    <div className="bg-white dark:bg-[#181A2A] rounded-xl overflow-hidden shadow-md h-full">
      <div className="md:flex">
        {/* Image Container - Takes full width on mobile, half on larger screens */}
        <div className="md:w-1/2 h-64 md:h-auto relative">
          <img
            src={imageUrl || "/placeholder.svg?height=600&width=800"}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Link
              to={`/news?category=${categorySlug}`}
              className="px-3 py-1 bg-white/90 dark:bg-[#181A2A]/90 text-[#4B6BFB] rounded-lg text-sm font-medium hover:bg-white dark:hover:bg-[#181A2A]"
            >
              {category}
            </Link>
          </div>
        </div>

        {/* Content Container */}
        <div className="md:w-1/2 p-6 flex flex-col">
          {/* Featured Badge */}
          <div className="mb-3">
            <span className="px-3 py-1 bg-[#F7A91E]/10 text-[#F7A91E] rounded-full text-sm font-medium">Öne Çıkan</span>
          </div>

          {/* Title */}
          <Link to={`/news/${id}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 hover:text-[#4B6BFB] dark:hover:text-[#4B6BFB] transition-colors">
              {title}
            </h2>
          </Link>

          {/* Summary */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 md:line-clamp-4 flex-grow">{summary}</p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formattedDate}
              </span>
              <span className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {commentsCount}
              </span>
            </div>
            <span>{readTime} dk okuma</span>
          </div>

          {/* Read More Link */}
          <Link
            to={`/news/${id}`}
            className="mt-4 inline-flex items-center px-4 py-2 bg-[#F7A91E]/10 text-[#F7A91E] hover:bg-[#F7A91E] hover:text-white rounded-lg transition-colors"
          >
            Devamını Oku
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FeaturedNewsCard

