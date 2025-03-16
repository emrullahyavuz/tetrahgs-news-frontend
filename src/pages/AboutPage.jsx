import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUsers, FaInfoCircle, FaBullseye } from "react-icons/fa";
import tetraHGS from "../assets/tetrahgs.png";

const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        const filterUsers = response.data.users.filter(
          (user) => user.userType === "admin" || user.userType === "business"
        );
        setTeamMembers(filterUsers);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchTeamMembers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Title Section */}
      <motion.h1
        className="text-4xl text-[#231F20] font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Hakkımızda
      </motion.h1>

      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center md:space-x-8">
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://intetra.com.tr/wp-content/uploads/2022/11/degerlerimiz-stratejilerimiz.jpg"
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </motion.div>
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Blogumuza hoş geldiniz! Düşüncelerimizi, fikirlerimizi ve
            deneyimlerimizi dünyayla paylaşmayı seven tutkulu yazarlardan ve
            meraklılardan oluşan bir ekibiz.
          </p>
        </motion.div>
      </div>

      {/* Mission Section */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaBullseye className="text-4xl mx-auto text-[#231F20] mb-4" />
        <h2 className="text-3xl font-bold text-[#231F20] mb-4">Misyonumuz</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Misyonumuz, bireyleri ve kuruluşları anlayışlı ve ilgi çekici içerikle
          güçlendirmektir.
        </p>
      </motion.div>

      {/* Team Section */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaUsers className="text-4xl mx-auto text-[#231F20] mb-4" />
        <h2 className="text-3xl font-bold text-[#231F20] mb-8">Ekibimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className="flex flex-col items-center p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={member.profileImage || tetraHGS}
                alt={member.fullName}
                className="w-32 h-32 rounded-full mb-4 border-4 border-gray-300"
              />
              <h3 className="text-xl font-semibold">{member.fullName}</h3>
              <p className="text-gray-700 dark:text-gray-300">{member.userType}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;