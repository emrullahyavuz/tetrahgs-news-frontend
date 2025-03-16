import NewsCard from "./news-card";
import FeaturedNews from "./featured-news";
import Sidebar from "./sidebar";

export default function NewsPage() {
  

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
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
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
  ];

  const featuredNews = {
    id: 0,
    title: "Yapay Zeka Devriminde Yeni Adım: GPT-5 Duyuruldu",
    summary:
      "OpenAI'nin yeni dil modeli GPT-5, önceki versiyonlardan çok daha gelişmiş yeteneklerle tanıtıldı. Yeni model, karmaşık problemleri çözme, çoklu dil desteği ve görsel anlama konularında çığır açıyor.",
    category: "Yapay Zeka",
    date: "1 Mart 2025",
    imageUrl: "/placeholder.svg?height=400&width=800",
    author: "Prof. Dr. Ahmet Yılmaz",
  };

  const categories = [
    "Tüm Haberler",
    "Yapay Zeka",
    "Donanım",
    "Yazılım",
    "Mobil",
    "Oyun",
    "Siber Güvenlik",
    "Uzay Teknolojileri",
  ];

  return (
    <main className="container max-w-7xl mx-auto px-4 py-6">
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
            <button className="bg-[#F7A91E] border text-[#231F20] px-6 py-2 rounded-md hover:bg-blue-50 transition-colors">
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
  );
}
