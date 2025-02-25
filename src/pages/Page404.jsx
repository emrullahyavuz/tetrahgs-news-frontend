import { useNavigate } from "react-router-dom";

const Page404 = () => {

  const navigate = useNavigate();
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-xl px-8 py-12 text-center">
          <div className="text-6xl font-bold text-[#F7A91E]">404</div>
          <div className="mt-4">
            <div className="mb-4">
              <h1 className="text-4xl font-bold text-[#231F20] mb-2">
              Sayfa Bulunamadı
              </h1>
              <p className="text-gray-600">
              Üzgünüz, aradığınız sayfa mevcut değil veya taşınmış.
              </p>
            </div>
  
            {/* Simple 404 illustration */}
            <div className="my-8 text-[#231F20] text-9xl font-bold select-none">
              ¯\_(ツ)_/¯
            </div>
  
            <button
              onClick={() => navigate("/") }
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-[#231F20] bg-[#F7A91E] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Ana Sayfaya Geri Dön
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Page404;