import DestinationCard from "./DestinationCard";
import { Link } from "react-router-dom";

export default function DestinationList({ destinations }) {
  if (!destinations?.length) return null;

  return (
    <div
      id="destinations"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
    >
      {destinations.map((dest, index) => (
        <Link
          key={dest.iataCode || dest.id || index}
          to={`/destination/${dest.iataCode || dest.id}`}
          className="hover:scale-105 transition-transform"
        >
          <DestinationCard
          key={dest.iataCode}
          city={dest.city}
          country={dest.country}
          iataCode={dest.iataCode}
          image={`https://source.unsplash.com/400x300/?${dest.city}`}
        />
        </Link>
      ))}
    </div>
  );
}