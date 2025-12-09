


import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { FcHome } from "react-icons/fc";

export default function Navbar() {
  const { user, logOut, loading } = useContext(AuthContext);
  const isLoggedIn = !!user;

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    setProfileOpen(false);
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FcHome size={32} />
          <span className="text-xl font-bold">Smart-Home</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-lg font-medium">
          <li><Link to="/" className="hover:text-blue-600 transition">Home</Link></li>
          <li><Link to="/services" className="hover:text-blue-600 transition">Services</Link></li>
          <li><Link to="/about" className="hover:text-blue-600 transition">About</Link></li>
          <li><Link to="/contact" className="hover:text-blue-600 transition">Contact</Link></li>
        </ul>

        {/* Right Side Desktop */}
        <div className="hidden md:flex items-center gap-5">
          {!loading && (
            <>
              {isLoggedIn && (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Dashboard
                </Link>
              )}

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="relative">
                      <img
                        src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                        className="w-9 h-9 rounded-full object-cover "
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-600  rounded-full animate-pulse"></span>
                    </div>
                    <span>{user?.displayName || "Profile"}</span>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg border rounded-lg animate-fadeIn">
                      <Link
                        to="/profile"
                        className="px-4 py-2 block hover:bg-gray-100 transition"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 w-full text-left hover:bg-gray-100 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md border-t animate-fadeIn">
          <ul className="flex flex-col p-4 text-lg font-medium gap-2">
            <li><Link to="/" className="py-2 hover:text-blue-600 transition">Home</Link></li>
            <li><Link to="/services" className="py-2 hover:text-blue-600 transition">Services</Link></li>
            <li><Link to="/about" className="py-2 hover:text-blue-600 transition">About</Link></li>
            <li><Link to="/contact" className="py-2 hover:text-blue-600 transition">Contact</Link></li>
          </ul>

          {!loading && (
            <div className="p-4 flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
                    </div>
                    <span className="font-semibold">{user?.displayName}</span>
                  </div>
                  <Link
                    to="/dashboard"
                    className="w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="px-4 py-2 border rounded-lg text-center hover:bg-gray-100 transition"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600 transition">Login</Link>
                  <Link to="/register" className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg text-center hover:bg-blue-50 transition">Register</Link>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
