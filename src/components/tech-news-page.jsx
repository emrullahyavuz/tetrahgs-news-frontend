"use client"

import { useState } from "react"
import { Search, Bell, Menu, X } from "lucide-react"
import NewsCard from "./news-card"
import FeaturedNews from "./featured-news"
import Sidebar from "./sidebar"

export default function TechNewsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const newsItems = [
    {
      id: 1,
      title: "Apple Announces New M3 MacBook Pro with Enhanced Performance",
      summary:
        "Apple's latest MacBook Pro features the new M3 chip, promising up to 40% better performance than previous models.",
      category: "Hardware",
      date: "1 Mart 2025",
      imageUrl: "/placeholder.svg?height=200&width=300",
      author: "Mehmet Yılmaz",
    },
    {
      id: 2,
      title: "Google Unveils Advanced AI Features for Search",
      summary:
        "Google's new AI-powered search features aim to provide more contextual and personalized results to users.",
      category: "Artificial Intelligence",
      date: "28 Şubat 2025",
      imageUrl: "/placeholder.svg?height=200&width=300",
      author: "Ayşe Kaya",
    },
    {
      id: 3,
      title: "Tesla Releases Software Update for Full Self-Driving Beta",
      summary:
        "Tesla's latest update brings significant improvements to its Full Self-Driving capabilities with enhanced navigation.",
      category: "Automotive",
      date: "27 Şubat 2025",
      imageUrl: "/placeholder.svg?height=200&width=300",
      author: "Ali Demir",
    },
    {
      id: 4,
      title: "Microsoft Announces Windows 12 Release Date",
      summary:
        "Microsoft has officially announced the release date for Windows 12, featuring a redesigned interface and AI integration.",
      category: "Software",
      date: "26 Şubat 2025",
      imageUrl: "/placeholder.svg?height=200&width=300",
      author: "Zeynep Şahin",
    },
    {
      id: 5,
      title: "Samsung Unveils New Foldable Smartphone Technology",
      summary:
        "Samsung's latest innovation in foldable display technology promises more durable and versatile smartphones.",
      category: "Mobile",
      date: "25 Şubat 2025",
      imageUrl: "/placeholder.svg?height=200&width=300",
      author: "Emre Yıldız",
    },
    {
      id: 6,
      title: "SpaceX Successfully Launches Starship for Mars Mission Test",
      summary:
        "SpaceX's Starship completed its first successful orbital test flight, marking a significant step toward Mars missions.",
      category: "Space",
      date: "24 Şubat 2025",
      imageUrl: "/placeholder.svg?height=200&width=300",
      author: "Deniz Kara",
    },
  ]

  const featuredNews = {
    id: 0,
    title: "Yapay Zeka Devriminde Yeni Adım: GPT-5 Duyuruldu",
    summary:
      "OpenAI'nin yeni dil modeli GPT-5, önceki versiyonlardan çok daha gelişmiş yeteneklerle tanıtıldı. Yeni model, karmaşık problemleri çözme, çoklu dil desteği ve görsel anlama konularında çığır açıyor.",
    category: "Yapay Zeka",
    date: "1 Mart 2025",
    imageUrl: "/placeholder.svg?height=400&width=800",
    author: "Prof. Dr. Ahmet Yılmaz",
  }

  const categories = [
    "Tüm Haberler",
    "Yapay Zeka",
    "Donanım",
    "Yazılım",
    "Mobil",
    "Oyun",
    "Siber Güvenlik",
    "Uzay Teknolojileri",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button className="md:hidden mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold text-blue-600">TeknoHaber</h1>
          </div>

          <div className="hidden md:flex space-x-6">
            {categories.slice(0, 5).map((category, index) => (
              <a key={index} href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                {category}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <Search size={20} />
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <Bell size={20} />
            </button>
            <button className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Abone Ol
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-2">
            {categories.map((category, index) => (
              <a
                key={index}
                href="#"
                className="block py-2 text-gray-600 hover:text-blue-600 transition-colors border-b border-gray-100 last:border-0"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-6">
        {/* Featured News */}
        <FeaturedNews news={featuredNews} />

        <div className="mt-10 flex flex-col md:flex-row gap-6">
          {/* Main Content */}
          <div className="md:w-3/4">
            <h2 className="text-2xl font-bold mb-6">Son Teknoloji Haberleri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-colors">
                Daha Fazla Göster
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/4 mt-8 md:mt-0">
            <Sidebar categories={categories} />
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-10 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TeknoHaber</h3>
              <p className="text-gray-300">
                En güncel teknoloji haberleri, incelemeler ve analizler için güvenilir kaynağınız.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Kategoriler</h4>
              <ul className="space-y-2">
                {categories.slice(1).map((category, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Bağlantılar</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Hakkımızda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    İletişim
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Gizlilik Politikası
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Kullanım Şartları
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Abone Olun</h4>
              <p className="text-gray-300 mb-2">En son haberleri almak için bültenimize abone olun.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="px-3 py-2 text-gray-800 rounded-l-md w-full"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
                  Gönder
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© 2025 TeknoHaber. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

