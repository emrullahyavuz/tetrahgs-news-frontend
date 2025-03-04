export default function Sidebar({ categories }) {
  const popularPosts = [
    {
      id: 1,
      title: "Quantum Computing Breakthrough Could Revolutionize Data Processing",
      date: "28 Şubat 2025",
      views: 1542,
    },
    {
      id: 2,
      title: "New Wearable Tech Monitors Health Metrics with Unprecedented Accuracy",
      date: "27 Şubat 2025",
      views: 1203,
    },
    {
      id: 3,
      title: "Blockchain Technology Finds New Applications in Supply Chain Management",
      date: "26 Şubat 2025",
      views: 987,
    },
    {
      id: 4,
      title: "5G Networks Expand to Rural Areas, Bridging the Digital Divide",
      date: "25 Şubat 2025",
      views: 854,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h3 className="text-lg text-[#F7A91E] font-bold mb-4">Kategoriler</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <a
                href="#"
                className="flex justify-between items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <span>{category}</span>
                {index > 0 && <span className="text-sm text-gray-400">{Math.floor(Math.random() * 50) + 10}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h3 className="text-lg text-[#F7A91E] font-bold mb-4">Popüler Haberler</h3>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <div key={post.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <a href="#" className="block">
                <h4 className="font-medium text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.views} görüntülenme</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  )
}

