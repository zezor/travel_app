// import Navbar from "../components/Navbar";
// import SearchBar from "../components/SearchBar";
// import DestinationCard from "../components/DestinationCard";

// export default function Home() {
//   const mockDestinations = [
//     { city: "Paris", country: "France", code: "PAR" },
//     { city: "Tokyo", country: "Japan", code: "TYO" },
//     { city: "New York", country: "USA", code: "NYC" },
//     { city: "Bali", country: "Indonesia", code: "DPS" },
//   ];

//   return (
//     <>
//       <Navbar />

//       <div className="bg-gray-200 min-h-screen pb-12">
//         <div className="text-center pt-12">
//           <h1 className="text-4xl font-bold text-gray-800">
//             Plan Your Next Trip
//           </h1>
//           <p className="text-gray-600 mt-3">
//             Discover destinations, flights and hotels
//           </p>
//         </div>

//         <SearchBar />

//         <div className="max-w-6xl mx-auto mt-12 px-6">
//           <h2 className="text-2xl font-semibold mb-6">
//             Popular Destinations
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {mockDestinations.map((dest) => (
//               <DestinationCard
//                 key={dest.code}
//                 city={dest.city}
//                 country={dest.country}
//                 code={dest.code}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import DestinationCard from "../components/DestinationCard";

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (keyword) => {
    if (!keyword) return;

    try {
      setLoading(true);
      setError(false);

      const response = await fetch(`/api/destinations?keyword=${keyword}`);
      const data = await response.json();

      setDestinations(data.data || []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

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

        <SearchBar onSearch={handleSearch} />

        <div className="max-w-6xl mx-auto mt-12 px-6">
          <h2 className="text-2xl font-semibold mb-6">
            Search Results
          </h2>

          {loading && (
            <p className="text-center text-blue-600">Loading...</p>
          )}

          {error && (
            <p className="text-center text-red-600">
              Something went wrong. Try again.
            </p>
          )}

          {!loading && !error && destinations.length === 0 && (
            <p className="text-center text-gray-500">
              Search for a city to see results.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                city={dest.name}
                country={dest.address?.countryName}
                code={dest.iataCode}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}