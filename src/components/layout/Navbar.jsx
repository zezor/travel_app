import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold text-blue-600">
        TravelAI
      </Link>

      <div className="space-x-6">
        <Link to="/">Home</Link>
        <Link to="/itinerary">My Itinerary</Link>
      </div>
    </nav>
  );
}