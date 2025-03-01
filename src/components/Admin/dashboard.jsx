import { Users, Eye, Newspaper, ArrowUp, ArrowDown, BarChart3, TrendingUp, Clock } from "lucide-react"

export default function Dashboard() {
  // Mock data for statistics
  const stats = [
    {
      id: 1,
      title: "Toplam Haberler",
      value: "248",
      change: "+12%",
      isPositive: true,
      icon: <Newspaper className="text-blue-500" size={20} />,
    },
    {
      id: 2,
      title: "Toplam Görüntülenme",
      value: "1.2M",
      change: "+18%",
      isPositive: true,
      icon: <Eye className="text-green-500" size={20} />,
    },
    {
      id: 3,
      title: "Kullanıcılar",
      value: "5,248",
      change: "+7%",
      isPositive: true,
      icon: <Users className="text-purple-500" size={20} />,
    },
    {
      id: 4,
      title: "Haber Etkileşimi",
      value: "24%",
      change: "-2%",
      isPositive: false,
      icon: <TrendingUp className="text-orange-500" size={20} />,
    },
  ]

  // Mock data for recent news
  const recentNews = [
    {
      id: 1,
      title: "Apple Announces New M3 MacBook Pro with Enhanced Performance",
      status: "published",
      views: 1245,
      date: "1 Mart 2025",
    },
    {
      id: 2,
      title: "Google Unveils Advanced AI Features for Search",
      status: "published",
      views: 987,
      date: "28 Şubat 2025",
    },
    {
      id: 3,
      title: "Tesla Releases Software Update for Full Self-Driving Beta",
      status: "draft",
      views: 0,
      date: "27 Şubat 2025",
    },
    {
      id: 4,
      title: "Microsoft Announces Windows 12 Release Date",
      status: "published",
      views: 756,
      date: "26 Şubat 2025",
    },
    {
      id: 5,
      title: "Samsung Unveils New Foldable Smartphone Technology",
      status: "review",
      views: 432,
      date: "25 Şubat 2025",
    },
  ]

  // Mock data for popular categories
  const popularCategories = [
    { name: "Yapay Zeka", count: 45, percentage: 70 },
    { name: "Mobil", count: 38, percentage: 60 },
    { name: "Yazılım", count: 32, percentage: 50 },
    { name: "Donanım", count: 28, percentage: 45 },
    { name: "Oyun", count: 25, percentage: 40 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm">
          <Clock size={16} />
          <span>Son güncelleme: 1 Mart 2025, 17:35</span>
        </div>
      </div>

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
            <select className="text-sm border rounded-md px-2 py-1">
              <option>Son 7 Gün</option>
              <option>Son 30 Gün</option>
              <option>Son 3 Ay</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="flex flex-col items-center text-gray-400">
              <BarChart3 size={48} />
              <p className="mt-2">Görüntülenme grafiği burada gösterilecek</p>
              <p className="text-sm">Gerçek verilerle entegre edildiğinde otomatik oluşturulacak</p>
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-bold mb-6">Popüler Kategoriler</h2>
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
        </div>
      </div>

      {/* Recent News */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold">Son Haberler</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">Tümünü Gör</button>
        </div>
        <div className="overflow-x-auto">
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
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{news.views}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{news.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">
                      Düzenle
                    </a>
                    <a href="#" className="text-red-600 hover:text-red-900">
                      Sil
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

