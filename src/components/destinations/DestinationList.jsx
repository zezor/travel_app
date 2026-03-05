// src/components/destinations/DestinationList.jsx

import DestinationCard from "./DestinationCard";
import { Link } from "react-router-dom";

export default function DestinationList({ destinations }) {
  if (!destinations?.length) return null;

  return (
    <div
      id="destinations"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
    >
      {destinations.map((dest) => (
        <Link
          key={dest.id || dest.iataCode}
          to={`/destination/${dest.iataCode}`}
          className="hover:scale-105 transition-transform"
        >
          <DestinationCard
            city={dest.name}
            country={dest.address?.countryName || dest.country}
            iataCode={dest.iataCode}
            image={dest.image || "/placeholder.jpg"} // optional fallback
          />
        </Link>
      ))}
    </div>
  );
}