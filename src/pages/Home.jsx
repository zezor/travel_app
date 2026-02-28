import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import DestinationCard from "../components/DestinationCard";
import Hero from "../components/Hero";
import PopularDestinations from "../components/PopularDestinations";

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [destinationCode, setDestinationCode] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const handleSelectDestination = (destination) => {
    setDestinationCode(destination.iataCode);
  };

  // 🔎 SEARCH DESTINATIONS
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

  // ✈ SEARCH FLIGHTS
  const handleFlightSearch = async () => {
    if (!destinationCode || !departureDate) {
      alert("Please select a destination and date");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/flights?origin=ACC&destination=${destinationCode}&departureDate=${departureDate}`
      );

      const data = await response.json();
      setFlights(data.data || []);
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
      <Hero />
      <PopularDestinations
    onSelect={(code) => setDestinationCode(code)}
  />

 

  {/* Dynamic API Results */}
  <div className="max-w-6xl mx-auto mt-12 px-6">
    <h2 className="text-2xl font-semibold mb-6">
      Search Results
    </h2>

    {destinations.map((dest) => (
      <DestinationCard
        key={dest.id}
        city={dest.name}
        country={dest.address?.countryName}
        code={dest.iataCode}
        onSelect={() => handleSelectDestination(dest)}
      />
    ))}
  </div>
</>
  );
}