import { useState, useEffect } from "react"
import { Search, Filter, Calendar, Eye, Tag, ChevronRight, ChevronLeft, AlertCircle } from "lucide-react"
import newsApi from "../services/newsService"
import { Link } from "react-router-dom"

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [featuredNews, setFeaturedNews] = useState(null)

  // Filtreleme ve arama state'leri
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    page: 1,
    limit: 9,
    sortBy: "createdAt",
    sortOrder: "desc",
    status: "published", // Sadece yayında olan haberleri göster
  })

  // Pagination state'i
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    totalItems: 0,
    totalPages: 0,
  })

  // Haberleri getir
  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await newsApi.getNews(filters)

      // Eğer ilk sayfadaysak ve haberler varsa, ilk haberi öne çıkan haber olarak ayarla
      if (filters.page === 1 && response.data.length > 0) {
        setFeaturedNews(response.data[0])
        setNewsItems(response.data.slice(1)) // İlk haber hariç diğerlerini listele
      } else {
        setNewsItems(response.data)
      }

      setPagination(response.pagination)
      setLoading(false)
    } catch (err) {
      setError(err.message || "Haberler getirilirken bir hata oluştu")
      setLoading(false)
    }
  }

  // Kategorileri getir
  const fetchCategories = async () => {
    try {
      const response = await newsApi.getCategories()
      setCategories(response.data)
    } catch (err) {
      console.error("Kategoriler getirilirken bir hata oluştu:", err)
    }
  }

  // Component mount olduğunda haberleri ve kategorileri getir
  useEffect(() => {
    fetchNews()
    fetchCategories()
  }, [])

  // Filtreler değiştiğinde haberleri yeniden getir
  useEffect(() => {
    fetchNews()
  }, [filters.page, filters.limit, filters.category, filters.sortBy, filters.sortOrder, filters.search])

  // Arama formunu handle et
  const handleSearch = (e) => {
    e.preventDefault()
    setFilters({
      ...filters,
      search: e.target.search.value,
      page: 1, // Arama yapıldığında ilk sayfaya dön
    })
  }

  // Filtre değişikliklerini handle et
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
      page: 1, // Filtre değiştiğinde ilk sayfaya dön
    })
  }

  // Sayfa değişikliğini handle et
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setFilters({
        ...filters,
        page: newPage,
      })
      // Sayfa değiştiğinde sayfanın üstüne kaydır
      window.scrollTo(0, 0)
    }
  }

  // Sıralama değişikliğini handle et
  const handleSortChange = (e) => {
    const { value } = e.target
    const [sortBy, sortOrder] = value.split("-")
    setFilters({
      ...filters,
      sortBy,
      sortOrder,
      page: 1, // Sıralama değiştiğinde ilk sayfaya dön
    })
  }

  // Tarih formatını düzenle
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("tr-TR", options)
  }

  // Özeti kısalt
  const truncateSummary = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength) + "..."
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Teknoloji Haberleri</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <span className="flex items-center">
            <AlertCircle size={18} className="mr-2" />
            {error}
          </span>
          <button className="absolute top-0 right-0 mt-3 mr-4" onClick={() => setError(null)}>
            &times;
          </button>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <form onSubmit={handleSearch} className="relative flex-1">
            <input
              type="text"
              name="search"
              placeholder="Haber ara..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <button type="submit" className="hidden">
              Ara
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              onChange={handleSortChange}
              value={`${filters.sortBy}-${filters.sortOrder}`}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="createdAt-desc">En Yeni</option>
              <option value="createdAt-asc">En Eski</option>
              <option value="viewCount-desc">En Çok Okunan</option>
              <option value="title-asc">Başlık (A-Z)</option>
              <option value="title-desc">Başlık (Z-A)</option>
            </select>

            <button
              onClick={() => {
                setFilters({
                  search: "",
                  category: "",
                  page: 1,
                  limit: 9,
                  sortBy: "createdAt",
                  sortOrder: "desc",
                  status: "published",
                })
              }}
              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
            >
              <Filter size={18} className="mr-1" />
              Filtreleri Temizle
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Featured News */}
      {!loading && featuredNews && filters.page === 1 && (
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/2">
                <img
                  className="h-64 w-full object-cover md:h-full"
                  src={featuredNews.imageUrl || `/placeholder.svg?height=400&width=600`}
                  alt={featuredNews.title}
                />
              </div>
              <div className="p-8 md:w-1/2">
                <div className="flex items-center mb-2">
                  <Tag size={16} className="text-blue-500 mr-2" />
                  <span className="text-sm text-blue-500 font-medium">{featuredNews.category}</span>
                </div>
                <Link to={`/news/${featuredNews.id}`} className="block mt-1">
                  <h2 className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {featuredNews.title}
                  </h2>
                </Link>
                <p className="mt-3 text-gray-600">{featuredNews.summary}</p>
                <div className="mt-6 flex items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-1" />
                    <span>{formatDate(featuredNews.createdAt)}</span>
                  </div>
                  <div className="ml-6 flex items-center text-sm text-gray-500">
                    <Eye size={16} className="mr-1" />
                    <span>{featuredNews.viewCount} görüntülenme</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    to={`/news/${featuredNews.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Devamını Oku
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      {!loading && newsItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Haber Bulunamadı</h3>
          <p className="mt-2 text-gray-500">
            Arama kriterlerinize uygun haber bulunamadı. Lütfen filtrelerinizi değiştirin.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link to={`/news/${news.id}`}>
                <img
                  className="h-48 w-full object-cover"
                  src={news.imageUrl || `/placeholder.svg?height=300&width=400`}
                  alt={news.title}
                />
              </Link>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <Tag size={16} className="text-blue-500 mr-2" />
                  <span className="text-sm text-blue-500 font-medium">{news.category}</span>
                </div>
                <Link to={`/news/${news.id}`} className="block mt-1">
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {news.title}
                  </h3>
                </Link>
                <p className="mt-3 text-gray-600">{truncateSummary(news.summary)}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-1" />
                    <span>{formatDate(news.createdAt)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye size={16} className="mr-1" />
                    <span>{news.viewCount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center space-x-1 py-4">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <ChevronLeft size={16} className="mr-1" />
            Önceki
          </button>

          <div className="hidden md:flex">
            {[...Array(pagination.totalPages).keys()].map((x) => {
              // Çok fazla sayfa varsa, sadece belirli sayfaları göster
              if (
                pagination.totalPages <= 7 ||
                x === 0 ||
                x === pagination.totalPages - 1 ||
                (x >= pagination.page - 2 && x <= pagination.page + 2)
              ) {
                return (
                  <button
                    key={x + 1}
                    onClick={() => handlePageChange(x + 1)}
                    className={`px-4 py-2 border text-sm font-medium rounded-md mx-1 ${
                      pagination.page === x + 1
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {x + 1}
                  </button>
                )
              } else if (
                (x === 1 && pagination.page > 4) ||
                (x === pagination.totalPages - 2 && pagination.page < pagination.totalPages - 3)
              ) {
                return (
                  <span key={x} className="px-2">
                    ...
                  </span>
                )
              }
              return null
            })}
          </div>

          <div className="md:hidden">
            <span className="text-sm text-gray-700">
              Sayfa {pagination.page} / {pagination.totalPages}
            </span>
          </div>

          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            Sonraki
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      )}
    </div>
  )
}

