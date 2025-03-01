export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Site Ayarları</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Değişiklikleri Kaydet
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Genel Ayarlar</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="site-title" className="block text-sm font-medium text-gray-700 mb-1">
              Site Başlığı
            </label>
            <input
              type="text"
              id="site-title"
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              defaultValue="TeknoHaber"
            />
          </div>
          <div>
            <label htmlFor="site-description" className="block text-sm font-medium text-gray-700 mb-1">
              Site Açıklaması
            </label>
            <textarea
              id="site-description"
              rows={3}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              defaultValue="En güncel teknoloji haberleri, incelemeler ve analizler için güvenilir kaynağınız."
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                İletişim E-postası
              </label>
              <input
                type="email"
                id="contact-email"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                defaultValue="info@teknohaber.com"
              />
            </div>
            <div>
              <label htmlFor="posts-per-page" className="block text-sm font-medium text-gray-700 mb-1">
                Sayfa Başına Haber Sayısı
              </label>
              <input
                type="number"
                id="posts-per-page"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                defaultValue="12"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Sosyal Medya</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">
                Facebook
              </label>
              <input
                type="text"
                id="facebook"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                defaultValue="https://facebook.com/teknohaber"
              />
            </div>
            <div>
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                Twitter
              </label>
              <input
                type="text"
                id="twitter"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                defaultValue="https://twitter.com/teknohaber"
              />
            </div>
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <input
                type="text"
                id="instagram"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                defaultValue="https://instagram.com/teknohaber"
              />
            </div>
            <div>
              <label htmlFor="youtube" className="block text-sm font-medium text-gray-700 mb-1">
                YouTube
              </label>
              <input
                type="text"
                id="youtube"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                defaultValue="https://youtube.com/teknohaber"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">SEO Ayarları</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="meta-keywords" className="block text-sm font-medium text-gray-700 mb-1">
              Meta Anahtar Kelimeler
            </label>
            <input
              type="text"
              id="meta-keywords"
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              defaultValue="teknoloji, haber, yazılım, donanım, yapay zeka, mobil, oyun"
            />
            <p className="mt-1 text-sm text-gray-500">
              Virgülle ayırarak birden fazla anahtar kelime ekleyebilirsiniz.
            </p>
          </div>
          <div>
            <label htmlFor="google-analytics" className="block text-sm font-medium text-gray-700 mb-1">
              Google Analytics Takip Kodu
            </label>
            <input
              type="text"
              id="google-analytics"
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="UA-XXXXXXXXX-X"
            />
          </div>
          <div className="flex items-center">
            <input
              id="sitemap"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="sitemap" className="ml-2 block text-sm text-gray-900">
              Otomatik site haritası oluştur
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">E-posta Bildirimleri</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="new-comment"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="new-comment" className="ml-2 block text-sm text-gray-900">
              Yeni yorum bildirimlerini al
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="new-user"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="new-user" className="ml-2 block text-sm text-gray-900">
              Yeni kullanıcı kayıtlarını bildir
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="contact-form"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="contact-form" className="ml-2 block text-sm text-gray-900">
              İletişim formu mesajlarını bildir
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="newsletter"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-900">
              Bülten abonelik bildirimlerini al
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

