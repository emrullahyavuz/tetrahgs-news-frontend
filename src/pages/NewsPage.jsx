import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Search,
  Filter,
  Calendar,
  Eye,
  Tag,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Star,
  Clock,
  TrendingUp,
  MessageSquare,
  Bookmark,
  Share2,
  ThumbsUp,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react"
import newsApi from "../services/newsService"
import CategoryBadge from "../components/CategoryBadge"
import NewsCard from "../components/NewsCard"
import CompactNewsCard from "../components/CompactNewsCard"

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [featuredNews, setFeaturedNews] = useState(null)
  const [popularNews, setPopularNews] = useState([])
  const [activeTab, setActiveTab] = useState("latest")

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

  // Popüler haberleri getir
  const fetchPopularNews = async () => {
    try {
      const response = await newsApi.getNews({
        limit: 5,
        sortBy: "viewCount",
        sortOrder: "desc",
        status: "published",
      })
      setPopularNews(response.data)
    } catch (err) {
      console.error("Popüler haberler getirilirken bir hata oluştu:", err)
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
    fetchPopularNews()
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

  // Tab değişikliğini handle et
  const handleTabChange = (tab) => {
    setActiveTab(tab)

    if (tab === "latest") {
      setFilters({
        ...filters,
        sortBy: "createdAt",
        sortOrder: "desc",
        page: 1,
      })
    } else if (tab === "popular") {
      setFilters({
        ...filters,
        sortBy: "viewCount",
        sortOrder: "desc",
        page: 1,
      })
    } else if (tab === "trending") {
      setFilters({
        ...filters,
        sortBy: "commentCount", // Varsayalım ki yorum sayısına göre trend belirlensin
        sortOrder: "desc",
        page: 1,
      })
    }
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teknoloji Haberleri</h1>

          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <button
              onClick={() => fetchNews()}
              className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <RefreshCw size={16} className="mr-1" />
              Yenile
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
              <Bookmark size={16} className="mr-1" />
              Takip Et
            </button>
          </div>
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

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <form onSubmit={handleSearch} className="relative flex-1">
              <input
                type="text"
                name="search"
                placeholder="Haber ara..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
              <button type="submit" className="hidden">
                Ara
              </button>
            </form>

            <div className="flex flex-wrap gap-2">
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="createdAt-desc">En Yeni</option>
                <option value="createdAt-asc">En Eski</option>
                <option value="viewCount-desc">En Çok Okunan</option>
                <option value="rating-desc">En Yüksek Puanlı</option>
                <option value="commentCount-desc">En Çok Yorumlanan</option>
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
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center text-gray-700 dark:text-gray-300"
              >
                <Filter size={16} className="mr-1" />
                Filtreleri Temizle
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilters({ ...filters, category: "", page: 1 })}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filters.category === ""
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Tümü
          </button>

          {categories.slice(0, 8).map((category) => (
            <button
              key={category.id}
              onClick={() => setFilters({ ...filters, category: category.name, page: 1 })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filters.category === category.name
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {category.name}
            </button>
          ))}

          {categories.length > 8 && (
            <div className="relative group">
              <button className="px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Daha Fazla
              </button>
              <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                <div className="py-1 max-h-60 overflow-y-auto">
                  {categories.slice(8).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setFilters({ ...filters, category: category.name, page: 1 })}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
          <button
            onClick={() => handleTabChange("latest")}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === "latest"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Calendar size={16} className="inline mr-1" />
            En Yeni
          </button>
          <button
            onClick={() => handleTabChange("popular")}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === "popular"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Eye size={16} className="inline mr-1" />
            En Çok Okunan
          </button>
          <button
            onClick={() => handleTabChange("trending")}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === "trending"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <TrendingUp size={16} className="inline mr-1" />
            Trend
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Main Content */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* News Content - 2/3 width */}
            <div className="lg:col-span-2">
              {/* Featured News */}
              {featuredNews && filters.page === 1 && (
                <div className="mb-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        className="h-80 w-full object-cover"
                        src={featuredNews.imageUrl || `/placeholder.svg?height=400&width=800`}
                        alt={featuredNews.title}
                      />
                      <div className="absolute top-4 left-4 flex space-x-2">
                        <CategoryBadge category={featuredNews.category} />
                        {featuredNews.isBreaking && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-600 text-white">
                            Son Dakika
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <Link to={`/news/${featuredNews.id}`} className="block mt-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {featuredNews.title}
                        </h2>
                      </Link>
                      <p className="mt-3 text-gray-600 dark:text-gray-300">{featuredNews.summary}</p>

                      <div className="mt-6 flex items-center">
                        <Link to={`/editor/${featuredNews.author?.id}`} className="flex items-center">
                          <img
                            src={featuredNews.author?.avatar || `/placeholder.svg?height=40&width=40`}
                            alt={featuredNews.author?.name}
                            className="h-10 w-10 rounded-full object-cover mr-3"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {featuredNews.author?.name || "Anonim"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {featuredNews.author?.title || "Editör"}
                            </p>
                          </div>
                        </Link>

                        <div className="ml-auto flex items-center space-x-4">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-500 mr-1" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {featuredNews.rating?.toFixed(1) || "4.5"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-5 w-5 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {featuredNews.viewCount || 0}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-5 w-5 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {featuredNews.commentCount || 0}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{getTimeAgo(featuredNews.createdAt)}</span>
                          {featuredNews.updatedAt && featuredNews.updatedAt !== featuredNews.createdAt && (
                            <span className="ml-2">(Güncellendi: {getTimeAgo(featuredNews.updatedAt)})</span>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                            <Share2 size={18} />
                          </button>
                          <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                            <Bookmark size={18} />
                          </button>
                          <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                            <ThumbsUp size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Link
                          to={`/news/${featuredNews.id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          Devamını Oku
                          <ChevronRight size={16} className="ml-1" />
                        </Link>

                        <Link
                          to={`/editor/${featuredNews.author?.id}`}
                          className="inline-flex items-center px-4 py-2 ml-3 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          Editörün Diğer Yazıları
                          <ArrowUpRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* News Grid */}
              {!loading && newsItems.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Haber Bulunamadı</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Arama kriterlerinize uygun haber bulunamadı. Lütfen filtrelerinizi değiştirin.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {newsItems.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!loading && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center space-x-1 py-6 mt-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
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
                            className={`px-4 py-2 border text-sm font-medium rounded-lg mx-1 transition-colors ${
                              pagination.page === x + 1
                                ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-700 dark:border-blue-700"
                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
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
                          <span key={x} className="px-2 py-2 text-gray-500 dark:text-gray-400">
                            ...
                          </span>
                        )
                      }
                      return null
                    })}
                  </div>

                  <div className="md:hidden">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Sayfa {pagination.page} / {pagination.totalPages}
                    </span>
                  </div>

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
                  >
                    Sonraki
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar - 1/3 width */}
            <div className="lg:col-span-1 space-y-8">
              {/* Popular News */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <TrendingUp size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
                  Popüler Haberler
                </h3>
                <div className="space-y-4">
                  {popularNews.map((news) => (
                    <CompactNewsCard key={news.id} news={news} />
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Tag size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
                  Kategoriler
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">
                        {category.newsCount || 0}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

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

              {/* Tags Cloud */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Popüler Etiketler</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Yapay Zeka",
                    "Blockchain",
                    "Mobil",
                    "Yazılım",
                    "Donanım",
                    "Oyun",
                    "Siber Güvenlik",
                    "Robotik",
                    "Uzay",
                    "Elektrikli Araçlar",
                    "Metaverse",
                    "NFT",
                  ].map((tag) => (
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
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

