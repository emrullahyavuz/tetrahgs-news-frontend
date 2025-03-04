import { useState } from "react";
import Sidebar from "./sidebar";
import Dashboard from "./dashboard";
import NewsManagement from "./news-management";
import CategoryManagement from "./category-management";
import UserManagement from "./user-management";
import Settings from "./settings";
import { Menu, X, Bell, User } from "lucide-react";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "news":
        return <NewsManagement />;
      case "categories":
        return <CategoryManagement />;
      case "users":
        return <UserManagement />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm z-10 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="md:hidden mr-2 p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            >
              {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-bold text-[#F7A91E]">
              TetraBlog Admin
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <User size={18} />
              </div>
              <span className="hidden md:inline text-sm text-[#F7A91E] font-medium">
                Admin Kullanıcı
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Mobile */}
        {isMobileSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <div
              className="w-64 h-full bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar
                activeTab={activeTab}
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setIsMobileSidebarOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Sidebar - Desktop */}
        <div className="hidden md:block w-64 bg-white shadow-sm">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
