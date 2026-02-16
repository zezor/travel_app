import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import DestinationCard from "../components/DestinationCard";

export default function Home() {
  const mockDestinations = [
    { city: "Paris", country: "France", code: "PAR" },
    { city: "Tokyo", country: "Japan", code: "TYO" },
    { city: "New York", country: "USA", code: "NYC" },
    { city: "Bali", country: "Indonesia", code: "DPS" },
  ];

  return (
    <>
      <Navbar />

      <div className="bg-gray-200 min-h-screen pb-12">
        <div className="text-center pt-12">
          <h1 className="text-4xl font-bold text-gray-800">
            Plan Your Next Trip
          </h1>
          <p className="text-gray-600 mt-3">
            Discover destinations, flights and hotels
          </p>
        </div>

        <SearchBar />

        <div className="max-w-6xl mx-auto mt-12 px-6">
          <h2 className="text-2xl font-semibold mb-6">
            Popular Destinations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDestinations.map((dest) => (
              <DestinationCard
                key={dest.code}
                city={dest.city}
                country={dest.country}
                code={dest.code}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
