import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import NewsCard from "../components/news-card"
import FeaturedNews from "../components/featured-news"
import Sidebar from "../components/sidebar"
import { getAllNews, getFeaturedNews, getNewsByCategory } from "../services/newsService"
import { getAllCategories } from "../services/categoryServices"

export default function NewsPage() {
  const [searchParams] = useSearchParams()
  const categorySlug = searchParams.get("category")

  const [newsItems, setNewsItems] = useState([])
  const [featuredNews, setFeaturedNews] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [currentCategory, setCurrentCategory] = useState(null)

  // Kategorileri yükle
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories()
        // "Tüm Haberler" kategorisini ekle
        setCategories([{ id: 0, name: "Tüm Haberler", slug: "" }, ...response.categories])
      } catch (err) {
        console.error("Kategoriler yüklenirken hata:", err)
      }
    }

    fetchCategories()
  }, [])

  // Haberleri yükle
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      setError(null)
      setPage(1)
      setHasMore(true)

      try {
        let response

        if (categorySlug) {
          // Kategoriye göre haberleri getir
          response = await getNewsByCategory(categorySlug, 1, 6)
          // Kategori bilgisini güncelle
          const category = categories.find((cat) => cat.slug === categorySlug)
          setCurrentCategory(category || null)
        } else {
          // Tüm haberleri getir
          response = await getAllNews(1, 6)
          setCurrentCategory(null)
        }

        setNewsItems(response.news || [])
        setHasMore(response.hasMore || false)

        // Öne çıkan haberi getir (sadece ana sayfada)
        if (!categorySlug) {
          const featuredResponse = await getFeaturedNews()
          setFeaturedNews(featuredResponse.news || null)
        }
      } catch (err) {
        console.error("Haberler yüklenirken hata:", err)
        setError("Haberler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.")
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [categorySlug, categories])

  // Daha fazla haber yükle
  const loadMoreNews = async () => {
    if (!hasMore || loading) return

    try {
      setLoading(true)
      const nextPage = page + 1

      let response
      if (categorySlug) {
        response = await getNewsByCategory(categorySlug, nextPage, 6)
      } else {
        response = await getAllNews(nextPage, 6)
      }

      setNewsItems((prev) => [...prev, ...(response.news || [])])
      setHasMore(response.hasMore || false)
      setPage(nextPage)
    } catch (err) {
      console.error("Daha fazla haber yüklenirken hata:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container max-w-7xl mx-auto px-4 py-6">
      {/* Featured News - Sadece ana sayfada göster */}
      {!categorySlug && featuredNews && <FeaturedNews news={featuredNews} />}

      {/* Kategori başlığı - Kategori sayfasında göster */}
      {currentCategory && (
        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{currentCategory.name}</h1>
          <p className="text-gray-600 mt-2">
            {currentCategory.description || `${currentCategory.name} kategorisindeki en güncel teknoloji haberleri`}
          </p>
        </div>
      )}

      <div className="mt-10 flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="md:w-3/4">
          <h2 className="text-2xl font-bold mb-6">
            {categorySlug ? `${currentCategory?.name || "Kategori"} Haberleri` : "Son Teknoloji Haberleri"}
          </h2>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

          {loading && newsItems.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : newsItems.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-700">Haber bulunamadı</h3>
              <p className="text-gray-500 mt-2">Bu kategoride henüz haber bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                className="bg-[#F7A91E] text-[#231F20] px-6 py-2 rounded-md hover:bg-blue-50 transition-colors disabled:opacity-50"
                onClick={loadMoreNews}
                disabled={loading}
              >
                {loading ? "Yükleniyor..." : "Daha Fazla Göster"}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="md:w-1/4 mt-8 md:mt-0">
          <Sidebar categories={categories} currentCategory={categorySlug || ""} />
        </div>
      </div>
    </main>
  )
}

