import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log("Invalid user");

      localStorage.removeItem("user");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/";
  };

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

        {/* Navigation */}
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

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* USER NAME */}
              <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                  {user.name ? user.name.charAt(0) : "U"}
                </div>

                <span className="text-sm font-medium text-gray-700">
                  {user.name || user.username}
                </span>
              </div>

              {/* CREATE QUIZ */}
              <Link
                to="/create-quiz"
                className="bg-emerald-500 text-white px-5 py-2 rounded-full font-medium hover:bg-emerald-600 transition"
              >
                Create Quiz
              </Link>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="text-red-500 font-medium hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* LOGIN */}
              <Link
                to="/login"
                className="text-emerald-600 font-medium hover:underline"
              >
                Login
              </Link>

              {/* SIGNUP */}
              <Link
                to="/signup"
                className="bg-emerald-500 text-white px-5 py-2 rounded-full font-medium hover:bg-emerald-600 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
