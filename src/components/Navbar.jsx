import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // 🔥 Automatically close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

  const linkStyles = "hover:underline transition";

  return (
    <nav className="bg-gray-600 shadow-md p-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl text-blue-400">
          Travel Planner
        </h1>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-white">
          <Link to="/" className={linkStyles}>
            Home
          </Link>
          <Link to="/itinerary" className={linkStyles}>
            Itinerary
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mt-4 flex flex-col space-y-3 md:hidden text-white">
          <Link
            to="/"
            className={linkStyles}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/itinerary"
            className={linkStyles}
            onClick={() => setOpen(false)}
          >
            Itinerary
          </Link>
        </div>
      )}
    </nav>
  );
}
