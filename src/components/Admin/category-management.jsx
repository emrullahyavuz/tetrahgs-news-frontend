import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, AlertTriangle } from "lucide-react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/adminService";
import { useToast } from "../../context/ToastContext";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toast = useToast();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      
      setCategories(data.categories);
     
      setError(null);
    } catch (err) {
      setError("Kategorileri yüklerken bir hata oluştu.");
      console.error(err);
      toast.error(err.message || "Kategorileri yüklerken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }

    // Slug otomatik oluştur
    if (name === "name" && !selectedCategory) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  // Form doğrulama
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Kategori adı zorunludur";
    }

    if (!formData.slug.trim()) {
      errors.slug = "Slug zorunludur";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      errors.slug = "Slug sadece küçük harf, rakam ve tire içerebilir";
    }

    return errors;
  };

  // Kategori düzenleme
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
    });
    setIsAddModalOpen(true);
  };

  // Kategori silme modalını aç
  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  // Kategori silme işlemi
  const handleDeleteConfirm = async () => {
    if (!selectedCategory) return;

    try {
      setIsSubmitting(true);
      await deleteCategory(selectedCategory.id);

      // Kategori listesini güncelle
      setCategories(categories.filter((cat) => cat.id !== selectedCategory.id));

      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
      toast.success("Kategori başarıyla silindi.");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Kategori silinirken bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form gönderme
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form doğrulama
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (selectedCategory) {
        // Kategori güncelleme
        const response = await updateCategory(selectedCategory.id, formData);

        // Kategori listesini güncelle
        setCategories(
          categories.map((cat) =>
            cat.id === selectedCategory.id
              ? { ...cat, ...formData, newsCount: cat.newsCount }
              : cat
          )
        );

        toast.success("Kategori başarıyla güncellendi.");
      } else {
        // Yeni kategori oluşturma
        const response = await createCategory(formData);

        // Yeni kategoriyi listeye ekle
        const newCategory = response.category;
        setCategories([...categories, { ...newCategory, newsCount: 0 }]);

        toast.success("Kategori başarıyla oluşturuldu.");
      }
      // Modalı kapat ve formu sıfırla
      setIsAddModalOpen(false);
      setSelectedCategory(null);
      setFormData({
        name: "",
        slug: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "İşlem sırasında bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(Array.isArray(categories))
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kategori Yönetimi</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          onClick={() => {
            setSelectedCategory(null);
            setFormData({
              name: "",
              slug: "",
              description: "",
            });
            setFormErrors({});
            setIsAddModalOpen(true);
          }}
        >
          <Plus size={18} className="mr-1" />
          Yeni Kategori
        </button>
      </div>

      {/* Kategoriler Tablosu */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64">
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Bir hata oluştu
            </h3>
            <p className="text-gray-500">{error}</p>
          </div>
        ) : categories.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kategori Adı
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Slug
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Açıklama
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Haber Sayısı
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
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {category.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {category.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {category.description || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {category.newsCount ? category.newsCount : 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteClick(category)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Henüz kategori yok
            </h3>
            <p className="text-gray-500 mb-4">
              İlk kategorinizi eklemek için "Yeni Kategori" butonuna tıklayın.
            </p>
          </div>
        )}
      </div>

      {/* Kategori Ekleme/Düzenleme Modalı */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={() => !isSubmitting && setIsAddModalOpen(false)}
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
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {selectedCategory
                          ? "Kategoriyi Düzenle"
                          : "Yeni Kategori Ekle"}
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Kategori Adı
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full border ${
                              formErrors.name
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          />
                          {formErrors.name && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="slug"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Slug
                          </label>
                          <input
                            type="text"
                            id="slug"
                            name="slug"
                            value={formData.slug}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full border ${
                              formErrors.slug
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          />
                          {formErrors.slug && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.slug}
                            </p>
                          )}
                          <p className="mt-1 text-xs text-gray-500">
                            URL'de görünecek olan kısım. Boş bırakırsanız
                            kategori adından otomatik oluşturulur.
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Açıklama
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={formData.description}
                            onChange={handleInputChange}
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
                    disabled={isSubmitting}
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        İşleniyor...
                      </span>
                    ) : selectedCategory ? (
                      "Güncelle"
                    ) : (
                      "Ekle"
                    )}
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => !isSubmitting && setIsAddModalOpen(false)}
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Silme Onay Modalı */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={() => !isSubmitting && setIsDeleteModalOpen(false)}
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
                      Kategoriyi Sil
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        <strong>{selectedCategory?.name}</strong> kategorisini
                        silmek istediğinizden emin misiniz?
                        {selectedCategory?.newsCount > 0 && (
                          <span className="block mt-2 text-red-600">
                            Bu kategoriye ait {selectedCategory.newsCount} haber
                            bulunmaktadır. Kategoriyi silmeden önce haberleri
                            başka bir kategoriye taşımanız gerekebilir.
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  disabled={isSubmitting}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleDeleteConfirm}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      İşleniyor...
                    </span>
                  ) : (
                    "Sil"
                  )}
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => !isSubmitting && setIsDeleteModalOpen(false)}
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
