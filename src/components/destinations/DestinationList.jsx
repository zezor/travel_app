import DestinationCard from "./DestinationCard";
import { Link } from "react-router-dom";


export default function DestinationList({ destinations }) {
  if (!destinations?.length) return null;

  return (
    <div
      id="destinations"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
    >
      {destinations.map((dest, i) => (
        <DestinationCard key={i} destination={dest} />
      ))}
    </div>
  );
}