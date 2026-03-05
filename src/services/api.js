// src/components/destinations/DestinationCard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function DestinationCard({ city, country, iataCode, image, price }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform"
    >
      <img
        src={image || `https://source.unsplash.com/400x300/?${city}`}
        alt={city}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{city}</h3>
        <p className="text-gray-600">{country}</p>

        {price && (
          <p className="mt-2 text-blue-600 font-bold">
            From {price}
          </p>
        )}

        <Link
          to={`/destination/${iataCode}`}
          className="mt-3 inline-block text-blue-600 font-medium hover:underline"
        >
          View Details →
        </Link>
      </div>
    </motion.div>
  );
}