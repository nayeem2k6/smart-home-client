
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Details */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="mb-1">📍 Address: Dhaka, Bangladesh</p>
          <p className="mb-1">📞 Phone: +880 1407038855</p>
          <p className="mb-1">✉️ Email: nayeembabu2k6@gmail.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
          <ul className="space-y-2">
            <li><a className="hover:text-blue-400" href="https://www.facebook.com/profile.php?id=61572239922475">Facebook</a></li>
            <li><a className="hover:text-blue-400" href="#">Instagram</a></li>
            <li><a className="hover:text-blue-400" href="https://www.youtube.com/@bangla-code">YouTube</a></li>
            <li><a className="hover:text-blue-400" href="#">LinkedIn</a></li>
          </ul>
        </div>

        {/* Business Hours */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Working Hours</h2>
          <p className="mb-1">Saturday - Thursday: 9 AM - 8 PM</p>
          <p className="mb-1">Friday: Closed</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 py-4 text-center text-sm">
        © {new Date().getFullYear()} Your Business Name. All Rights Reserved.
      </div>
    </footer>
  );
}