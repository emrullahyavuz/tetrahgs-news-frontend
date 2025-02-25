import React from "react";

const AboutPage = () => {
    const teamMembers = [
        { id: 1, name: "John Doe", position: "Frontend Developer", image: "https://randomuser.me/api/portraits/men/1.jpg" },
        { id: 2, name: "Ahmet Demir", position: "Backend Developer", image: "https://randomuser.me/api/portraits/men/2.jpg" },
        { id: 3, name: "Zeynep Kaya", position: "UI/UX Designer", image: "https://randomuser.me/api/portraits/women/3.jpg" },
        { id: 4, name: "Mert Aksoy", position: "Project Manager", image: "https://randomuser.me/api/portraits/men/4.jpg" },
        { id: 5, name: "Selin Çelik", position: "Full Stack Developer", image: "https://randomuser.me/api/portraits/women/5.jpg" },
        { id: 6, name: "Burak Şahin", position: "Mobile Developer", image: "https://randomuser.me/api/portraits/men/6.jpg" },
        { id: 7, name: "Elif Yıldız", position: "Data Scientist", image: "https://randomuser.me/api/portraits/women/7.jpg" },
        { id: 8, name: "Can Ersoy", position: "DevOps Engineer", image: "https://randomuser.me/api/portraits/men/8.jpg" },
        { id: 9, name: "Deniz Güneş", position: "Software Tester", image: "https://randomuser.me/api/portraits/women/9.jpg" },
      ];
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl text-[#231F20] font-bold text-center mb-8">
        Hakkımızda
      </h1>
      <div className="flex flex-col md:flex-row items-center md:space-x-8">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src="https://intetra.com.tr/wp-content/uploads/2022/11/degerlerimiz-stratejilerimiz.jpg"
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Blogumuza hoş geldiniz! Düşüncelerimizi, fikirlerimizi ve
            deneyimlerimizi dünyayla paylaşmayı seven tutkulu yazarlardan ve
            meraklılardan oluşan bir ekibiz. Misyonumuz okuyucularımızı
            bilgilendiren, ilham veren ve eğlendiren değerli içerikler
            sunmaktır.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Blogumuz teknoloji, yaşam tarzı, seyahat, iş ve daha fazlasını
            içeren çok çeşitli konuları kapsamaktadır. Hikaye anlatmanın gücüne
            inanıyoruz ve hedef kitlemizde yankı uyandıracak ilgi çekici ve
            düşündürücü makaleler yaratmaya çalışıyoruz.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Blogumuzu ziyaret ettiğiniz için teşekkür ederiz. Bizim içeriğimizi
            oluştururken keyif aldığımız kadar sizin de içeriğimizi okumaktan
            keyif alacağınızı umuyoruz. Herhangi bir sorunuz, geri bildiriminiz
            veya öneriniz varsa bizimle iletişime geçmekten çekinmeyin. İyi
            okumalar!
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl text-[#231F20] font-bold text-center mb-8">
          Misyonumuz
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Misyonumuz, bireyleri ve kuruluşları anlayışlı ve ilgi çekici içerikle
          güçlendirmektir. Okurlarımızın kişisel ve profesyonel yaşamlarında
          bilgi sahibi olmalarına ve motive olmalarına yardımcı olarak güvenilir
          bir bilgi ve ilham kaynağı olmayı hedefliyoruz.
        </p>

        <h2 className="text-3xl text-[#231F20] font-bold text-center mb-8">
          Ekibimiz
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-700 dark:text-gray-300">{member.position}</p>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
