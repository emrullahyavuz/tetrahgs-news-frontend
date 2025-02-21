

// components/HeroSection.jsx
export default function Hero() {
    return (
      <div className="relative w-full bg-gray-900 text-white overflow-hidden rounded-lg h-[450px]">
        <div className="relative h-[450px]">
          <img
            width={900}
            height={450}
            src="/images/blog-pictures/hero-image.png"
            alt="Hero Background"
            className="absolute inset-0 object-cover w-full h-full opacity-70"
          />
          <div className="relative z-10 flex h-full items-center px-8 md:pl-10 md:pb-10 md:pt-[226px]">
            <div className="max-w-3xl">
              <span className="inline-block mb-4 text-sm font-light text-white bg-[#4B6BFB] px-3 py-1 rounded-lg w-[97px] h-[28px]">
                Technology
              </span>
              <h1 className="text-3xl md:text-4xl font-medium leading-tight">
                <p>The Impact of Technology on the </p>
                <p>Workplace: How Technology is Changing</p>
              </h1>
              <div className="flex items-center mt-6 space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-8 h-8 bg-gray-700 rounded-full">
                    <img
                    width={36}
                    height={36}
                    src="/images/blog-pictures/no-user.png"
                    alt="Author Image"
                    className="w-full h-full object-cover"
                  />
                  </span>
                  <span>Tracey Wilson</span>
                </div>
                <span className="text-gray-300">August 20, 2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  