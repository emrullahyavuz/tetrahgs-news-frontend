import { useState, useEffect } from "react"
import { Users, Eye, Newspaper, ArrowUp, ArrowDown, BarChart3, TrendingUp, Clock, Edit, Trash2 } from "lucide-react"
import newsApi from "../../services/newsService"
import dashboardApi from "../../services/dashboardService"
import { getCurrentUser, getUserId } from "../../services/authService"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const [stats, setStats] = useState([
    {
      id: 1,
      title: "Toplam Haberler",
      value: "0",
      change: "0%",
      isPositive: true,
      icon: <Newspaper className="text-blue-500" size={20} />,
    },
    {
      id: 2,
      title: "Toplam Görüntülenme",
      value: "0",
      change: "0%",
      isPositive: true,
      icon: <Eye className="text-green-500" size={20} />,
    },
    {
      id: 3,
      title: "Kullanıcılar",
      value: "0",
      change: "0%",
      isPositive: true,
      icon: <Users className="text-purple-500" size={20} />,
    },
    {
      id: 4,
      title: "Haber Etkileşimi",
      value: "0%",
      change: "0%",
      isPositive: false,
      icon: <TrendingUp className="text-orange-500" size={20} />,
    },
  ])

  const [recentNews, setRecentNews] = useState([])
  const [popularCategories, setPopularCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString("tr-TR"))
  const [viewsPeriod, setViewsPeriod] = useState("week")
  const [viewsData, setViewsData] = useState([])

  // Kullanıcı rolünü getir
  const fetchUserRole = async () => {
    try {
      const response = await getCurrentUser()
      if (response.success && response.user) {
        setUserRole(response.user.roleId)
      }
    } catch (err) {
      console.error("Kullanıcı bilgileri getirilirken bir hata oluştu:", err)
    }
  }

  // Son haberleri getir
  const fetchRecentNews = async () => {
    try {
      const response = await newsApi.getNews({
        limit: 5,
        sortBy: "createdAt",
        sortOrder: "desc",
      })
      setRecentNews(response.data)
    } catch (err) {
      console.error("Son haberler getirilirken bir hata oluştu:", err)
      setError("Son haberler getirilirken bir hata oluştu")
    }
  }

  // İstatistikleri getir
  const fetchStats = async () => {
    try {
      // Backend'den istatistikleri al
      const response = await dashboardApi.getStats()
      const statsData = response.data

      setStats([
        {
          id: 1,
          title: "Toplam Haberler",
          value: statsData.totalNews.toString(),
          change: `${statsData.newsChangePercent}%`,
          isPositive: statsData.newsChangePercent >= 0,
          icon: <Newspaper className="text-blue-500" size={20} />,
        },
        {
          id: 2,
          title: "Toplam Görüntülenme",
          value: statsData.totalViews.toLocaleString(),
          change: `${statsData.viewsChangePercent}%`,
          isPositive: statsData.viewsChangePercent >= 0,
          icon: <Eye className="text-green-500" size={20} />,
        },
        {
          id: 3,
          title: "Kullanıcılar",
          value: statsData.totalUsers.toLocaleString(),
          change: `${statsData.usersChangePercent}%`,
          isPositive: statsData.usersChangePercent >= 0,
          icon: <Users className="text-purple-500" size={20} />,
        },
        {
          id: 4,
          title: "Haber Etkileşimi",
          value: `${statsData.engagementRate}%`,
          change: `${statsData.engagementChangePercent}%`,
          isPositive: statsData.engagementChangePercent >= 0,
          icon: <TrendingUp className="text-orange-500" size={20} />,
        },
      ])
    } catch (err) {
      console.error("İstatistikler getirilirken bir hata oluştu:", err)

      // Backend henüz hazır değilse, mock data ile devam et
      console.log("Backend hazır değil, mock data kullanılıyor")

      // Toplam haber sayısını al
      try {
        const newsResponse = await newsApi.getNews({ limit: 1 })
        const totalNews = newsResponse.pagination.totalItems

        // İlk istatistiği güncelle
        setStats((prevStats) => {
          const newStats = [...prevStats]
          newStats[0] = {
            ...newStats[0],
            value: totalNews.toString(),
          }
          return newStats
        })
      } catch (newsErr) {
        console.error("Haber sayısı alınamadı:", newsErr)
      }
    }
  }

  // Popüler kategorileri getir
  const fetchPopularCategories = async () => {
    try {
      // Backend'den popüler kategorileri al
      const response = await dashboardApi.getPopularCategories()
      setPopularCategories(response.data)
    } catch (err) {
      console.error("Popüler kategoriler getirilirken bir hata oluştu:", err)

      // Backend henüz hazır değilse, alternatif yöntemle devam et
      console.log("Backend hazır değil, alternatif yöntem kullanılıyor")

      try {
        // Kategorileri getir
        const categoriesResponse = await newsApi.getCategories()
        const categories = categoriesResponse.data

        // Her kategori için haber sayısını getir
        const categoriesWithCount = await Promise.all(
          categories.map(async (category) => {
            try {
              const response = await newsApi.getNews({
                category: category.name,
                limit: 1,
              })
              return {
                name: category.name,
                count: response.pagination.totalItems,
                percentage: 0, // Yüzde hesaplanacak
              }
            } catch (error) {
              console.error(`${category.name} kategorisi için haber sayısı alınamadı:`, error)
              return {
                name: category.name,
                count: 0,
                percentage: 0,
              }
            }
          }),
        )

        // Haber sayısına göre sırala
        categoriesWithCount.sort((a, b) => b.count - a.count)

        // En popüler 5 kategoriyi al
        const topCategories = categoriesWithCount.slice(0, 5)

        // Yüzdeleri hesapla
        const maxCount = Math.max(...topCategories.map((c) => c.count))
        topCategories.forEach((category) => {
          category.percentage = maxCount > 0 ? Math.round((category.count / maxCount) * 100) : 0
        })

        setPopularCategories(topCategories)
      } catch (catErr) {
        console.error("Kategoriler alınamadı:", catErr)
      }
    }
  }

  // Görüntülenme analizini getir
  const fetchViewsAnalytics = async (period) => {
    try {
      // Backend'den görüntülenme analizini al
      const response = await dashboardApi.getViewsAnalytics(period)
      setViewsData(response.data)
    } catch (err) {
      console.error("Görüntülenme analizi getirilirken bir hata oluştu:", err)
      // Hata durumunda boş veri
      setViewsData([])
    }
  }

  // Periyot değiştiğinde görüntülenme analizini güncelle
  useEffect(() => {
    fetchViewsAnalytics(viewsPeriod)
  }, [viewsPeriod])

  // Verileri yükle
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        await fetchUserRole()
        await fetchRecentNews()
        await fetchStats()
        await fetchPopularCategories()
        await fetchViewsAnalytics(viewsPeriod)
        setLastUpdated(new Date().toLocaleString("tr-TR"))
      } catch (err) {
        console.error("Veriler yüklenirken bir hata oluştu:", err)
        setError("Veriler yüklenirken bir hata oluştu")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Haberi düzenleme sayfasına yönlendir
  const handleEdit = (newsId) => {
    // Düzenleme sayfasına yönlendirme
    window.location.href = `/admin/news?edit=${newsId}`
  }

  // Haberi sil
  const handleDelete = async (newsId) => {
    if (window.confirm("Bu haberi silmek istediğinizden emin misiniz?")) {
      try {
        await newsApi.deleteNews(newsId)
        // Haberi sildikten sonra listeyi güncelle
        fetchRecentNews()
      } catch (err) {
        console.error("Haber silinirken bir hata oluştu:", err)
        setError("Haber silinirken bir hata oluştu")
      }
    }
  }

  // Kullanıcının haberi düzenleme yetkisi var mı?
  const canEditNews = (news) => {
    // Admin (roleId=1) her haberi düzenleyebilir
    // Editor (roleId=2) sadece kendi haberlerini düzenleyebilir
    const isAdmin = userRole === 1
    const isEditor = userRole === 2
    const isAuthor = news.authorId === getUserId()

    return isAdmin || (isEditor && isAuthor)
  }

  // Kullanıcının haberi silme yetkisi var mı?
  const canDeleteNews = (news) => {
    // Admin (roleId=1) her haberi silebilir
    // Editor (roleId=2) sadece kendi haberlerini silebilir
    const isAdmin = userRole === 1
    const isEditor = userRole === 2
    const isAuthor = news.authorId === getUserId()

    return isAdmin || (isEditor && isAuthor)
  }

  // Yükleniyor durumu
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm">
          <Clock size={16} />
          <span>Son güncelleme: {lastUpdated}</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
          <button className="absolute top-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            <span className="text-xl">&times;</span>
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className="p-2 bg-gray-50 rounded-md">{stat.icon}</div>
            </div>
            <div className={`flex items-center mt-4 text-sm ${stat.isPositive ? "text-green-600" : "text-red-600"}`}>
              {stat.isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              <span className="ml-1">{stat.change} son 30 günde</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold">Görüntülenme Analizi</h2>
            <select
              className="text-sm border rounded-md px-2 py-1"
              value={viewsPeriod}
              onChange={(e) => setViewsPeriod(e.target.value)}
            >
              <option value="week">Son 7 Gün</option>
              <option value="month">Son 30 Gün</option>
              <option value="quarter">Son 3 Ay</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center">
            {viewsData.length > 0 ? (
              <div className="w-full h-full">
                {/* Burada bir grafik kütüphanesi kullanılabilir (recharts, chart.js vb.) */}
                <div className="flex flex-col items-center text-gray-400">
                  <BarChart3 size={48} />
                  <p className="mt-2">Görüntülenme grafiği burada gösterilecek</p>
                  <p className="text-sm">Grafik kütüphanesi entegre edildiğinde otomatik oluşturulacak</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <BarChart3 size={48} />
                <p className="mt-2">Görüntülenme verisi bulunamadı</p>
              </div>
            )}
          </div>
        </div>

        {/* Popular Categories */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-bold mb-6">Popüler Kategoriler</h2>
          {popularCategories.length === 0 ? (
            <div className="text-center text-gray-500">Kategori bulunamadı</div>
          ) : (
            <div className="space-y-4">
              {popularCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{category.name}</span>
                    <span>{category.count} haber</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${category.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent News */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold">Son Haberler</h2>
          <Link to="/admin/news" className="text-sm text-blue-600 hover:text-blue-800">
            Tümünü Gör
          </Link>
        </div>
        <div className="overflow-x-auto">
          {recentNews.length === 0 ? (
            <div className="text-center text-gray-500 py-4">Haber bulunamadı</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Başlık
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Görüntülenme
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentNews.map((news) => (
                  <tr key={news.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{news.title}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          news.status === "published"
                            ? "bg-green-100 text-green-800"
                            : news.status === "draft"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {news.status === "published" ? "Yayında" : news.status === "draft" ? "Taslak" : "İncelemede"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{news.viewCount}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(news.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      {canEditNews(news) && (
                        <button onClick={() => handleEdit(news.id)} className="text-blue-600 hover:text-blue-900 mr-3">
                          <Edit size={18} />
                        </button>
                      )}
                      <Link to={`/news/${news.id}`} target="_blank" className="text-gray-600 hover:text-gray-900 mr-3">
                        <Eye size={18} />
                      </Link>
                      {canDeleteNews(news) && (
                        <button onClick={() => handleDelete(news.id)} className="text-red-600 hover:text-red-900">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

