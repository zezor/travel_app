import { Link } from "react-router-dom";

export default function DestinationCard({ city, country, code }) {
  return (
    <div className="bg-white rounded-xl shadow-md d:hover:shadow-lg p-4 flex flex-col overflow-hidden transform transition duration-300 hover:scale-105 lg:hover:shadow-xl">
      <img
        src="https://via.placeholder.com/400x250"
        alt={city}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold">{city}</h3>
        <p className="text-gray-500">{country}</p>

        <Link
          to={`/destination/${code}`}
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
