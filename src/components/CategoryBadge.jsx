import { Link } from "react-router-dom"
import { Tag } from "lucide-react"

// Kategori renklerini tanımlayalım
const categoryColors = {
  Teknoloji: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Bilim: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  Oyun: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Mobil: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  Yazılım: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  Donanım: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "Yapay Zeka": "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  Uzay: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
}

const CategoryBadge = ({ category }) => {
  const colorClass = categoryColors[category] || categoryColors.default

  return (
    <Link
      to={`/category/${category}`}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClass} hover:opacity-90 transition-opacity`}
    >
      <Tag className="h-3 w-3 mr-1" />
      {category}
    </Link>
  )
}

export default CategoryBadge

