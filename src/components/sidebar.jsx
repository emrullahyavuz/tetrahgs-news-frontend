import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getPopularNews } from "../services/newsService"

export default function Sidebar({ categories, currentCategory }) {
  const [popularPosts, setPopularPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopularNews = async () => {
      try {
        setLoading(true)
        const response = await getPopularNews(4)
        setPopularPosts(response.news || [])
      } catch (err) {
        console.error("Popüler haberler yüklenirken hata:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularNews()
  }, [])

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h3 className="text-lg text-[#F7A91E] font-bold mb-4">Kategoriler</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={category.slug ? `/news?category=${category.slug}` : "/news"}
                className={`flex justify-between items-center py-2 transition-colors ${
                  currentCategory === category.slug ? "text-[#F7A91E] font-medium" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <span>{category.name}</span>
                {category.count !== undefined && <span className="text-sm text-gray-400">{category.count}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h3 className="text-lg text-[#F7A91E] font-bold mb-4">Popüler Haberler</h3>
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {popularPosts.map((post) => (
              <div key={post.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <Link to={`/news/${post.id}`} className="block">
                  <h4 className="font-medium text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span>{post.views} görüntülenme</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

