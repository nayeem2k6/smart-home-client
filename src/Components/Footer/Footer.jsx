

import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaCalendarAlt, FaClock } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Details */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-400" />
              <span>Address: Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-blue-400" />
              <span>Phone: +880 1407038855</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-400" />
              <span>Email: nayeembabu2k6@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
          <div className="flex flex-col space-y-3">
            <a 
              href="https://www.facebook.com/profile.php?id=61572239922475" 
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-blue-500" />
              <span>Facebook</span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 hover:text-pink-400 transition-colors"
            >
              <FaInstagram className="text-pink-500" />
              <span>Instagram</span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 hover:text-red-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-red-500" />
              <span>YouTube</span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 hover:text-blue-300 transition-colors"
            >
              <FaLinkedin className="text-blue-700" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Business Hours */}
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <FaCalendarAlt className="text-blue-400" />
            Working Hours
          </h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaClock className="text-green-400" />
              <span>Saturday - Thursday: 9 AM - 8 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-red-400" />
              <span>Friday: Closed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 py-4 text-center text-sm">
        © {new Date().getFullYear()} NaYEeM. All Rights Reserved.
      </div>
    </footer>
  );
}