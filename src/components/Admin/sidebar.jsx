import { LayoutDashboard, Newspaper, Tag, Users, Settings, LogOut, ExternalLink } from "lucide-react"

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "news", label: "Haberler", icon: <Newspaper size={18} /> },
    { id: "categories", label: "Kategoriler", icon: <Tag size={18} /> },
    { id: "users", label: "Kullanıcılar", icon: <Users size={18} /> },
    { id: "settings", label: "Ayarlar", icon: <Settings size={18} /> },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <div className="flex items-center justify-center p-2 mb-6">
          <h2 className="text-xl font-bold text-blue-600">TeknoHaber</h2>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                activeTab === item.id ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t">
        <a
          href="/"
          className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
        >
          <ExternalLink size={18} />
          <span>Siteye Git</span>
        </a>
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
          <LogOut size={18} />
          <span>Çıkış Yap</span>
        </button>
      </div>
    </div>
  )
}

