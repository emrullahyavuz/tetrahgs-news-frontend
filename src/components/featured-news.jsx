import { Link } from "react-router-dom"

export default function FeaturedNews({ news }) {
  if (!news) return null

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-2/3">
          <img
            src={news.imageUrl || "/placeholder.svg"}
            alt={news.title}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="md:w-1/3 p-6 flex flex-col justify-center">
          <div className="flex items-center mb-3">
            <Link
              to={`/news?category=${news.categorySlug}`}
              className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
            >
              {news.category}
            </Link>
            <span className="text-sm text-gray-500 ml-3">{news.date}</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">{news.title}</h2>
          <p className="text-gray-600 mb-6">{news.summary}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Yazar: {news.author}</span>
            <Link
              to={`/news/${news.id}`}
              className="bg-[#F7A91E] text-[#231F20] px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
            >
              Haberi Oku
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

