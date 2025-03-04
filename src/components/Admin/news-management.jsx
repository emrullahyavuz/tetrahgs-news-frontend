import { useState } from "react";
import { Search, Plus, Edit, Trash2, Eye, Filter } from "lucide-react";

export default function NewsManagement() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Mock data for news items
  const newsItems = [
    {
      id: 1,
      title: "Apple Announces New M3 MacBook Pro with Enhanced Performance",
      summary:
        "Apple's latest MacBook Pro features the new M3 chip, promising up to 40% better performance than previous models.",
      category: "Donanım",
      status: "published",
      author: "Mehmet Yılmaz",
      date: "1 Mart 2025",
      views: 1245,
    },
    {
      id: 2,
      title: "Google Unveils Advanced AI Features for Search",
      summary:
        "Google's new AI-powered search features aim to provide more contextual and personalized results to users.",
      category: "Yapay Zeka",
      status: "published",
      author: "Ayşe Kaya",
      date: "28 Şubat 2025",
      views: 987,
    },
    {
      id: 3,
      title: "Tesla Releases Software Update for Full Self-Driving Beta",
      summary:
        "Tesla's latest update brings significant improvements to its Full Self-Driving capabilities with enhanced navigation.",
      category: "Otomotiv",
      status: "draft",
      author: "Ali Demir",
      date: "27 Şubat 2025",
      views: 0,
    },
    {
      id: 4,
      title: "Microsoft Announces Windows 12 Release Date",
      summary:
        "Microsoft has officially announced the release date for Windows 12, featuring a redesigned interface and AI integration.",
      category: "Yazılım",
      status: "published",
      author: "Zeynep Şahin",
      date: "26 Şubat 2025",
      views: 756,
    },
    {
      id: 5,
      title: "Samsung Unveils New Foldable Smartphone Technology",
      summary:
        "Samsung's latest innovation in foldable display technology promises more durable and versatile smartphones.",
      category: "Mobil",
      status: "review",
      author: "Emre Yıldız",
      date: "25 Şubat 2025",
      views: 432,
    },
    {
      id: 6,
      title: "SpaceX Successfully Launches Starship for Mars Mission Test",
      summary:
        "SpaceX's Starship completed its first successful orbital test flight, marking a significant step toward Mars missions.",
      category: "Uzay Teknolojileri",
      status: "published",
      author: "Deniz Kara",
      date: "24 Şubat 2025",
      views: 1089,
    },
    {
      id: 7,
      title:
        "New Quantum Computing Breakthrough Could Revolutionize Data Processing",
      summary:
        "Scientists have achieved a significant breakthrough in quantum computing that could transform how we process complex data.",
      category: "Quantum Bilişim",
      status: "published",
      author: "Prof. Dr. Ahmet Yılmaz",
      date: "23 Şubat 2025",
      views: 876,
    },
  ];

  const handleEdit = (news) => {
    setSelectedNews(news);
    setIsAddModalOpen(true);
  };

  const handleDelete = (news) => {
    setSelectedNews(news);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Haber Yönetimi</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          onClick={() => {
            setSelectedNews(null);
            setIsAddModalOpen(true);
          }}
        >
          <Plus size={18} className="mr-1" />
          Yeni Haber
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Haber ara..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Tüm Kategoriler</option>
              <option value="hardware">Donanım</option>
              <option value="software">Yazılım</option>
              <option value="ai">Yapay Zeka</option>
              <option value="mobile">Mobil</option>
            </select>

            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Tüm Durumlar</option>
              <option value="published">Yayında</option>
              <option value="draft">Taslak</option>
              <option value="review">İncelemede</option>
            </select>

            <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
              <Filter size={18} className="mr-1" />
              Filtrele
            </button>
          </div>
        </div>
      </div>

      {/* News Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Başlık
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Kategori
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Durum
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Yazar
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tarih
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Görüntülenme
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {newsItems.map((news) => (
                <tr key={news.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {news.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{news.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        news.status === "published"
                          ? "bg-green-100 text-green-800"
                          : news.status === "draft"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {news.status === "published"
                        ? "Yayında"
                        : news.status === "draft"
                        ? "Taslak"
                        : "İncelemede"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{news.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{news.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{news.views}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => handleEdit(news)}
                    >
                      <Edit size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 mr-3">
                      <Eye size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(news)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Toplam <span className="font-medium">7</span> haberden{" "}
                <span className="font-medium">1</span> ile{" "}
                <span className="font-medium">7</span> arası gösteriliyor
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  &laquo;
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  3
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  &raquo;
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit News Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {selectedNews ? "Haberi Düzenle" : "Yeni Haber Ekle"}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Başlık
                        </label>
                        <input
                          type="text"
                          id="title"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          defaultValue={selectedNews?.title || ""}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="summary"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Özet
                        </label>
                        <textarea
                          id="summary"
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          defaultValue={selectedNews?.summary || ""}
                        ></textarea>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Kategori
                          </label>
                          <select
                            id="category"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            defaultValue={selectedNews?.category || ""}
                          >
                            <option value="">Kategori Seçin</option>
                            <option value="Donanım">Donanım</option>
                            <option value="Yazılım">Yazılım</option>
                            <option value="Yapay Zeka">Yapay Zeka</option>
                            <option value="Mobil">Mobil</option>
                            <option value="Otomotiv">Otomotiv</option>
                            <option value="Uzay Teknolojileri">
                              Uzay Teknolojileri
                            </option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Durum
                          </label>
                          <select
                            id="status"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            defaultValue={selectedNews?.status || "draft"}
                          >
                            <option value="draft">Taslak</option>
                            <option value="review">İncelemede</option>
                            <option value="published">Yayında</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="image"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Görsel
                        </label>
                        <div className="mt-1 flex items-center">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Görsel Seç
                          </button>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="content"
                          className="block text-sm font-medium text-gray-700"
                        >
                          İçerik
                        </label>
                        <textarea
                          id="content"
                          rows={6}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          defaultValue={selectedNews?.content || ""}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  {selectedNews ? "Güncelle" : "Ekle"}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Haberi Sil
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Bu haberi silmek istediğinizden emin misiniz? Bu işlem
                        geri alınamaz.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Sil
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
