import { useState } from "react";
import Sidebar from "./sidebar";
import Dashboard from "./dashboard";
import NewsManagement from "./news-management";
import CategoryManagement from "./category-management";
import UserManagement from "./user-management";
import Settings from "./settings";
import { Menu, X, Bell, User } from "lucide-react";
import AdminHeader from "./AdminHeader";

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
      <AdminHeader />

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
