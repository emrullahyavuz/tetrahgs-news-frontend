import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  AlertCircle,
} from "lucide-react";
import newsApi from "../../services/newsService";

export default function NewsManagement() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    categoryId: "",
    status: "draft",
    imageUrl: "",
  });

  // Filtreleme ve arama state'leri
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    page: 1,
    limit: 10,
  });

  // Pagination state'i
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
  });

  // Haberleri getir
  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await newsApi.getNews(filters);
      setNewsItems(response.data);
      setPagination(response.pagination);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Haberler getirilirken bir hata oluştu");
      setLoading(false);
    }
  };

  // Kategorileri getir
  const fetchCategories = async () => {
    try {
      const response = await newsApi.getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error("Kategoriler getirilirken bir hata oluştu:", err);
    }
  };

  // Component mount olduğunda haberleri ve kategorileri getir
  useEffect(() => {
    fetchNews();
    fetchCategories();
  }, []);

  // Filtreler değiştiğinde haberleri yeniden getir
  useEffect(() => {
    fetchNews();
  }, [filters.page, filters.limit, filters.category, filters.status]);

  // Form input değişikliklerini handle et
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Arama formunu handle et
  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({
      ...filters,
      search: e.target.search.value,
      page: 1, // Arama yapıldığında ilk sayfaya dön
    });
  };

  // Filtre değişikliklerini handle et
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
      page: 1, // Filtre değiştiğinde ilk sayfaya dön
    });
  };

  // Sayfa değişikliğini handle et
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setFilters({
        ...filters,
        page: newPage,
      });
    }
  };

  // Düzenleme modalını aç
  const handleEdit = (news) => {
    setSelectedNews(news);
    setFormData({
      title: news.title,
      summary: news.summary,
      content: news.content || "",
      categoryId: news.categoryId,
      status: news.status,
      imageUrl: news.imageUrl || "",
    });
    setIsAddModalOpen(true);
  };

  // Silme modalını aç
  const handleDelete = (news) => {
    setSelectedNews(news);
    setIsDeleteModalOpen(true);
  };

  // Yeni haber ekle
  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (selectedNews) {
        // Haber güncelleme
        await newsApi.updateNews(selectedNews.id, formData);
      } else {
        // Yeni haber ekleme
        await newsApi.createNews(formData);
      }

      // Modalı kapat ve haberleri yenile
      setIsAddModalOpen(false);
      setSelectedNews(null);
      setFormData({
        title: "",
        summary: "",
        content: "",
        categoryId: "",
        status: "draft",
        imageUrl: "",
      });
      fetchNews();
    } catch (err) {
      setError(err.message || "Haber kaydedilirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  // Haberi sil
  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await newsApi.deleteNews(selectedNews.id);

      // Modalı kapat ve haberleri yenile
      setIsDeleteModalOpen(false);
      setSelectedNews(null);
      fetchNews();
    } catch (err) {
      setError(err.message || "Haber silinirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  // Haber durumunu güncelle
  const handleStatusChange = async (id, status) => {
    try {
      await newsApi.updateNewsStatus(id, status);
      fetchNews();
    } catch (err) {
      setError(err.message || "Durum güncellenirken bir hata oluştu");
    }
  };

  // Haber detayını görüntüle
  const handleViewNews = (id) => {
    window.open(`/news/${id}`, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Haber Yönetimi</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          onClick={() => {
            setSelectedNews(null);
            setFormData({
              title: "",
              summary: "",
              content: "",
              categoryId: "",
              status: "draft",
              imageUrl: "",
            });
            setIsAddModalOpen(true);
          }}
        >
          <Plus size={18} className="mr-1" />
          Yeni Haber
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="flex items-center">
            <AlertCircle size={18} className="mr-2" />
            {error}
          </span>
          <button
            className="absolute top-0 right-0 mt-3 mr-4"
            onClick={() => setError(null)}
          >
            &times;
          </button>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <form onSubmit={handleSearch} className="relative flex-1">
            <input
              type="text"
              name="search"
              placeholder="Haber ara..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <button type="submit" className="hidden">
              Ara
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tüm Durumlar</option>
              <option value="published">Yayında</option>
              <option value="draft">Taslak</option>
              <option value="review">İncelemede</option>
            </select>

            <button
              onClick={() => {
                setFilters({
                  search: "",
                  category: "",
                  status: "",
                  page: 1,
                  limit: 10,
                });
              }}
              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
            >
              <Filter size={18} className="mr-1" />
              Filtreleri Temizle
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
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    Yükleniyor...
                  </td>
                </tr>
              ) : newsItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    Haber bulunamadı
                  </td>
                </tr>
              ) : (
                newsItems.map((news) => (
                  <tr key={news.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {news.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {news.category}
                      </div>
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
                      <div className="text-sm text-gray-500">
                        {news.createdAt}
                      </div>
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
                      <button
                        className="text-gray-600 hover:text-gray-900 mr-3"
                        onClick={() => handleViewNews(news.id)}
                      >
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Toplam{" "}
                <span className="font-medium">{pagination.totalItems}</span>{" "}
                haberden{" "}
                <span className="font-medium">
                  {(pagination.page - 1) * pagination.limit + 1}
                </span>{" "}
                ile{" "}
                <span className="font-medium">
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.totalItems
                  )}
                </span>{" "}
                arası gösteriliyor
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  &laquo;
                </button>

                {[...Array(pagination.totalPages).keys()].map((x) => (
                  <button
                    key={x + 1}
                    onClick={() => handlePageChange(x + 1)}
                    aria-current={
                      pagination.page === x + 1 ? "page" : undefined
                    }
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      pagination.page === x + 1
                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {x + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  &raquo;
                </button>
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
              <form onSubmit={handleAddNews}>
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
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                            name="summary"
                            rows={3}
                            value={formData.summary}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          ></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="categoryId"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Kategori
                            </label>
                            <select
                              id="categoryId"
                              name="categoryId"
                              value={formData.categoryId}
                              onChange={handleInputChange}
                              required
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Kategori Seçin</option>
                              {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              ))}
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
                              name="status"
                              value={formData.status}
                              onChange={handleInputChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="draft">Taslak</option>
                              <option value="review">İncelemede</option>
                              <option value="published">Yayında</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="imageUrl"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Görsel URL
                          </label>
                          <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
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
                            name="content"
                            rows={6}
                            value={formData.content}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    disabled={loading}
                  >
                    {loading
                      ? "İşleniyor..."
                      : selectedNews
                      ? "Güncelle"
                      : "Ekle"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    İptal
                  </button>
                </div>
              </form>
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
                  onClick={handleConfirmDelete}
                  disabled={loading}
                >
                  {loading ? "Siliniyor..." : "Sil"}
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
