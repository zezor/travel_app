import { Link } from "react-router-dom";

export default function DestinationCard({ destination }) {
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <img
        src={`https://source.unsplash.com/400x300/?${destination.city}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">
          {destination.city}
        </h3>
        <p>{destination.country}</p>

        <Link
          to={`/destination/${destination.iataCode}`}
          className="text-blue-600 mt-3 inline-block"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}