import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
            Q
          </div>
          <span className="text-xl font-bold text-emerald-600">QuizUp</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-emerald-600 transition">
            Home
          </Link>
          <Link to="/features" className="hover:text-emerald-600 transition">
            Features
          </Link>
          <Link to="/about" className="hover:text-emerald-600 transition">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-emerald-600 transition">
            Contact
          </Link>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-emerald-600 font-medium hover:underline"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-emerald-500 text-white px-5 py-2 rounded-full font-medium hover:bg-emerald-600 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}