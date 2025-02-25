import React, { useState } from 'react';
import Button from '../components/UI/Button';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Bizimle İletişime Geçin!</h1>
      <div className="flex flex-col md:flex-row items-center md:space-x-8">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Adresimiz</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            1234 Tetra Blog Street, Tetra Blog City, BC 12345
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>Email:</strong> info@tetrablog.com
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>Telefon:</strong> (123) 456-7890
          </p>
          <h3 className="text-xl font-semibold mb-4">Konum</h3>
          <div className="w-full h-64 rounded-lg shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153168!3d-37.81627977975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1f9c3b1e0e!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1611819446571!5m2!1sen!2sau"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>
        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                İsim
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#242535] dark:border-[#3B3C4A] dark:text-gray-300"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#242535] dark:border-[#3B3C4A] dark:text-gray-300"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                Mesaj
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#242535] dark:border-[#3B3C4A] dark:text-gray-300"
                rows="5"
                required
                
              ></textarea>
            </div>
            <Button color="#F7A91E" textColor="#231F20" size="lg">
                Mesajı Gönder
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;