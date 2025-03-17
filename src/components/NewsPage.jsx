import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Search, Filter, ChevronDown, ChevronUp, Loader } from "lucide-react"
import NewsCard from "../components/NewsCard"
import FeaturedNewsCard from "../components/FeaturedNewsCard"
import CompactNewsCard from "../components/CompactNewsCard"
import { getAllNews, getFeaturedNews, getNewsByCategory, getPopularNews } from "../services/newsService"
import { getAllCategories } from "../services/categoryServices"

const NewsPage = () => {
  // State for news data
  const [news, setNews] = useState([])
  const [featuredNews, setFeaturedNews] = useState(null)
  const [popularNews, setPopularNews] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [limit] = useState(6)

  // Loading and error states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Search state
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Router hooks
  const location = useLocation()
  const navigate = useNavigate()

  // Parse query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const categoryParam = queryParams.get("category")
    const searchParam = queryParams.get("search")
    const pageParam = queryParams.get("page")

    if (categoryParam) {
      setSelectedCategory(categoryParam)
    } else {
      setSelectedCategory(null)
    }

    if (searchParam) {
      setSearchQuery(searchParam)
    } else {
      setSearchQuery("")
    }

    if (pageParam) {
      setCurrentPage(Number.parseInt(pageParam, 10))
    } else {
      setCurrentPage(1)
    }
  }, [location.search])

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories()
        setCategories(response.categories)
      } catch (err) {
        console.error("Kategoriler yüklenirken hata:", err)
      }
    }

    fetchCategories()
  }, [])

  // Fetch news data
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true)
        setError(null)

        let newsResponse

        // Fetch news based on selected category or search query
        if (selectedCategory) {
          newsResponse = await getNewsByCategory(selectedCategory, currentPage, limit)
        } else if (searchQuery) {
          // Implement search functionality when backend supports it
          newsResponse = await getAllNews(currentPage, limit, searchQuery)
        } else {
          newsResponse = await getAllNews(currentPage, limit)
        }

        setNews(newsResponse.news)
        setTotalPages(newsResponse.totalPages)
        setTotalItems(newsResponse.totalItems)

        // Only fetch featured and popular news on the first page and when no filters are applied
        if (currentPage === 1 && !selectedCategory && !searchQuery) {
          // Fetch featured news
          const featuredResponse = await getFeaturedNews()
          setFeaturedNews(featuredResponse.news)

          // Fetch popular news
          const popularResponse = await getPopularNews(4)
          setPopularNews(popularResponse.news)
        }
      } catch (err) {
        console.error("Haberler yüklenirken hata:", err)
        setError("Haberler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.")
      } finally {
        setLoading(false)
      }
    }

    fetchNewsData()
  }, [selectedCategory, currentPage, limit, searchQuery])

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault()

    // Update URL with search query
    const params = new URLSearchParams()
    if (searchQuery) {
      params.set("search", searchQuery)
    }
    if (selectedCategory) {
      params.set("category", selectedCategory)
    }

    // Reset to first page when searching
    setCurrentPage(1)
    navigate(`/news?${params.toString()}`)
  }

  // Handle category selection
  const handleCategorySelect = (categorySlug) => {
    // If clicking the already selected category, clear the filter
    if (categorySlug === selectedCategory) {
      setSelectedCategory(null)
      navigate("/news")
    } else {
      setSelectedCategory(categorySlug)

      // Update URL with category
      const params = new URLSearchParams()
      params.set("category", categorySlug)

      // Reset to first page when changing category
      setCurrentPage(1)
      navigate(`/news?${params.toString()}`)
    }
  }

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page)

    // Update URL with page number
    const params = new URLSearchParams(location.search)
    params.set("page", page.toString())
    navigate(`/news?${params.toString()}`)

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null)
    setSearchQuery("")
    setCurrentPage(1)
    navigate("/news")
  }

  return (
    <div className="bg-gray-50 dark:bg-[#0D1117] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {selectedCategory
              ? `${categories.find((c) => c.slug === selectedCategory)?.name || "Kategori"} Haberleri`
              : searchQuery
                ? `"${searchQuery}" için Arama Sonuçları`
                : "Teknoloji Haberleri"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {selectedCategory
              ? `${categories.find((c) => c.slug === selectedCategory)?.description || "Bu kategorideki en güncel haberler"}`
              : "Teknoloji dünyasındaki en son gelişmeler ve haberler"}
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-[#181A2A] rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Haberlerde ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-[#4B6BFB] focus:border-transparent dark:bg-[#0D1117] dark:text-white"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-600"
                  size={18}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4B6BFB] hover:text-[#3A54C4]"
                >
                  Ara
                </button>
              </div>
            </form>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#4B6BFB] dark:hover:text-[#4B6BFB] transition-colors"
            >
              <Filter size={18} className="mr-2" />
              Filtreler
              {showFilters ? <ChevronUp size={18} className="ml-1" /> : <ChevronDown size={18} className="ml-1" />}
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-700 dark:text-gray-300 mr-2 pt-1">Kategoriler:</span>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.slug)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      selectedCategory === category.slug
                        ? "bg-[#4B6BFB] text-white"
                        : "bg-gray-100 dark:bg-[#0D1117] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                    } transition-colors`}
                  >
                    {category.name}
                  </button>
                ))}

                {(selectedCategory || searchQuery) && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1 rounded-lg text-sm bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors ml-auto"
                  >
                    Filtreleri Temizle
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* News Feed */}
          <div className="lg:col-span-8">
            {/* Featured News - Only show on first page with no filters */}
            {currentPage === 1 && !selectedCategory && !searchQuery && featuredNews && (
              <div className="mb-8">
                <FeaturedNewsCard news={featuredNews} />
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4B6BFB]"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* No Results */}
            {!loading && news.length === 0 && (
              <div className="bg-white dark:bg-[#181A2A] rounded-xl shadow-sm p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Sonuç Bulunamadı</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchQuery
                    ? `"${searchQuery}" için arama sonucu bulunamadı.`
                    : selectedCategory
                      ? "Bu kategoride haber bulunamadı."
                      : "Henüz haber bulunmuyor."}
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-[#4B6BFB] text-white rounded-lg hover:bg-[#3A54C4] transition-colors"
                >
                  Tüm Haberleri Göster
                </button>
              </div>
            )}

            {/* News Grid */}
            {!loading && news.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {news.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === 1
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                        : "bg-white dark:bg-[#181A2A] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    Önceki
                  </button>

                  {/* Page Numbers */}
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1
                    // Only show a few page numbers around the current page
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`w-10 h-10 rounded-lg ${
                            currentPage === pageNumber
                              ? "bg-[#4B6BFB] text-white"
                              : "bg-white dark:bg-[#181A2A] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )
                    } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                      return (
                        <span key={pageNumber} className="text-gray-500">
                          ...
                        </span>
                      )
                    }
                    return null
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                        : "bg-white dark:bg-[#181A2A] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    Sonraki
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Popular News */}
            <div className="bg-white dark:bg-[#181A2A] rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-2 h-6 bg-[#F7A91E] rounded-full mr-2"></span>
                Popüler Haberler
              </h3>

              {popularNews.length > 0 ? (
                <div className="space-y-4">
                  {popularNews.map((item) => (
                    <CompactNewsCard key={item.id} news={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  {loading ? (
                    <div className="flex justify-center">
                      <Loader className="animate-spin h-6 w-6" />
                    </div>
                  ) : (
                    "Popüler haber bulunamadı."
                  )}
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-[#181A2A] rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-2 h-6 bg-[#4B6BFB] rounded-full mr-2"></span>
                Kategoriler
              </h3>

              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.slug)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.slug
                        ? "bg-[#4B6BFB]/10 text-[#4B6BFB]"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#0D1117]"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-gradient-to-r from-[#4B6BFB]/80 to-[#6B8AFB]/80 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Bültenimize Abone Olun</h3>
              <p className="text-white/80 text-sm mb-4">
                En son teknoloji haberlerini ve güncellemelerini e-posta kutunuza alın.
              </p>

              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-white text-[#4B6BFB] rounded-lg font-medium hover:bg-white/90 transition-colors"
                >
                  Abone Ol
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsPage

