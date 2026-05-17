import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
            Q
          </div>
          <span className="text-xl font-bold text-emerald-600">QuizUp</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <a href="#home" className="hover:text-emerald-600">Home</a>
          <a href="#features" className="hover:text-emerald-600">Features</a>
          <a href="#how-it-works" className="hover:text-emerald-600">How It Works</a>
          <a href="#about" className="hover:text-emerald-600">About Us</a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="text-emerald-600 font-medium">Login</button>
          <button className="bg-emerald-500 text-white px-5 py-2 rounded-full font-medium hover:bg-emerald-600 transition">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}