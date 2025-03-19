import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Calendar, Eye, Tag, ChevronLeft, AlertCircle, User, Clock } from "lucide-react"
import newsApi from "../services/newsService"

export default function NewsDetailPage() {
  const { id } = useParams()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [relatedNews, setRelatedNews] = useState([])

  // Haberi getir
  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await newsApi.getNewsById(id)
      setNews(response.data)

      // İlgili haberleri getir (aynı kategoriden)
      if (response.data.category) {
        const relatedResponse = await newsApi.getNews({
          category: response.data.category,
          limit: 3,
          // status: "published",
        })

        // Mevcut haberi ilgili haberlerden çıkar
        setRelatedNews(relatedResponse.data.filter((item) => item.id !== Number.parseInt(id)))
      }

      setLoading(false)
    } catch (err) {
      setError(err.message || "Haber getirilirken bir hata oluştu")
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [id])

  // Tarih formatını düzenle
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("tr-TR", options)
  }

  // Tarih ve saat formatını düzenle
  const formatDateTime = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleString("tr-TR", options)
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <span className="flex items-center">
            <AlertCircle size={18} className="mr-2" />
            {error}
          </span>
        </div>
        <div className="text-center mt-6">
          <Link
            to="/news"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
          >
            <ChevronLeft size={16} className="mr-1" />
            Haberlere Dön
          </Link>
        </div>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Haber Bulunamadı</h3>
          <p className="mt-2 text-gray-500">Aradığınız haber bulunamadı veya kaldırılmış olabilir.</p>
          <div className="mt-6">
            <Link
              to="/news"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
            >
              <ChevronLeft size={16} className="mr-1" />
              Haberlere Dön
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/news" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ChevronLeft size={16} className="mr-1" />
          Haberlere Dön
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Haber Başlığı ve Meta Bilgileri */}
        <div className="p-6 md:p-8">
          <div className="flex items-center mb-4">
            <Tag size={16} className="text-blue-500 mr-2" />
            <span className="text-sm text-blue-500 font-medium">{news.category}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{news.title}</h1>

          <div className="flex flex-wrap items-center text-gray-500 text-sm mb-6">
            <div className="flex items-center mr-6 mb-2">
              <User size={16} className="mr-1" />
              <span>{news.author || "Anonim"}</span>
            </div>
            <div className="flex items-center mr-6 mb-2">
              <Calendar size={16} className="mr-1" />
              <span>{formatDate(news.createdAt)}</span>
            </div>
            <div className="flex items-center mr-6 mb-2">
              <Clock size={16} className="mr-1" />
              <span>
                Son Güncelleme: {news.updatedAt ? formatDateTime(news.updatedAt) : formatDateTime(news.createdAt)}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <Eye size={16} className="mr-1" />
              <span>{news.views} görüntülenme</span>
            </div>
          </div>

          {/* Haber Görseli */}
          <div className="mb-8">
            <img
              src={news.imageUrl || `/placeholder.svg?height=600&width=1200`}
              alt={news.title}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Haber Özeti */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Özet</h2>
            <p className="text-gray-700 text-lg italic">{news.summary}</p>
          </div>

          {/* Haber İçeriği */}
          <div className="prose prose-lg max-w-none">
            {/* HTML içeriğini güvenli bir şekilde render et */}
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>
        </div>
      </div>

      {/* İlgili Haberler */}
      {relatedNews.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">İlgili Haberler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link to={`/news/${item.id}`}>
                  <img
                    className="h-48 w-full object-cover"
                    src={item.imageUrl || `/placeholder.svg?height=300&width=400`}
                    alt={item.title}
                  />
                </Link>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <Tag size={16} className="text-blue-500 mr-2" />
                    <span className="text-sm text-blue-500 font-medium">{item.category}</span>
                  </div>
                  <Link to={`/news/${item.id}`} className="block mt-1">
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-1" />
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye size={16} className="mr-1" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

