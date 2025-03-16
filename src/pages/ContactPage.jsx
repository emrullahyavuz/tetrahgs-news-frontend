import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Mail, Phone, MapPin } from "lucide-react";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().min(10, "Message should be at least 10 characters").required("Message is required"),
});

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      {/* Contact Info */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300">We'd love to hear from you! Get in touch with us.</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2"><Mail /> contact@example.com</div>
            <div className="flex items-center gap-2"><Phone /> +123 456 7890</div>
            <div className="flex items-center gap-2"><MapPin /> 123 Main Street, City, Country</div>
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
      >
        <input type="text" placeholder="Your Name" {...register("name")} className="w-full p-2 border rounded" />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>

        <input type="email" placeholder="Your Email" {...register("email")} className="w-full p-2 border rounded" />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <textarea placeholder="Your Message" {...register("message")} className="w-full p-2 border rounded h-32"></textarea>
        <p className="text-red-500 text-sm">{errors.message?.message}</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send Message
        </motion.button>
      </motion.form>

      {/* Map */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-64 rounded-lg overflow-hidden"
      >
        <MapContainer center={[51.505, -0.09]} zoom={13} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>Our Office Location</Popup>
          </Marker>
        </MapContainer>
      </motion.div>
    </div>
  );
}
