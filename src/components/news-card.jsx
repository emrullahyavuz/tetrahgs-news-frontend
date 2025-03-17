import { Link } from "react-router-dom"

export default function NewsCard({ news }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={news.imageUrl || "/placeholder.svg"} alt={news.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Link
            to={`/news?category=${news.categorySlug}`}
            className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
          >
            {news.category}
          </Link>
          <span className="text-xs text-gray-500">{news.date}</span>
        </div>
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{news.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{news.summary}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Yazar: {news.author}</span>
          <Link
            to={`/news/${news.id}`}
            className="text-[#F7A91E] text-sm font-medium hover:text-blue-800 transition-colors"
          >
            Devamını Oku →
          </Link>
        </div>
      </div>
    </div>
  )
}

