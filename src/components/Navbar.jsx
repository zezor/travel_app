import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl text-blue-600">
          Travel Planner
        </h1>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <div className="hidden md:flex space-x-6">
          <Link to="/">Home</Link>
          <Link to="/itinerary">Itinerary</Link>
        </div>
      </div>

      {open && (
        <div className="mt-4 flex flex-col space-y-2 md:hidden">
          <Link to="/">Home</Link>
          <Link to="/itinerary">Itinerary</Link>
        </div>
      )}
    </nav>
  );
}
