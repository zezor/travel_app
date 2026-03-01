import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import DestinationCard from "../components/DestinationCard";
import Hero from "../components/Hero";
import PopularDestinations from "../components/PopularDestinations";

export default function Home() {
  // ==============================
  // STATE
  // ==============================
  const [destinations, setDestinations] = useState([]);
  const [flights, setFlights] = useState([]);
  const [popular, setPopular] = useState([]);

  const [destinationCode, setDestinationCode] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingFlights, setLoadingFlights] = useState(false);
  const [error, setError] = useState(null);

  // ==============================
  // FETCH POPULAR DESTINATIONS
  // ==============================
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch("/api/popular");

        if (!res.ok) throw new Error("Failed to fetch popular");

        const data = await res.json();
        setPopular(data?.data?.slice(0, 6) || []);
      } catch (err) {
        console.error("Popular fetch error:", err);
      }
    };

    fetchPopular();
  }, []);

  // ==============================
  // SEARCH DESTINATIONS
  // ==============================
  const handleSearch = async (keyword) => {
    if (!keyword) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/destinations?keyword=${keyword}`
      );

      if (!response.ok) throw new Error("Destination search failed");

      const data = await response.json();
      setDestinations(data?.data || []);
    } catch (err) {
      console.error(err);
      setError("Could not fetch destinations.");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // SELECT DESTINATION
  // ==============================
  const handleSelectDestination = (destination) => {
    setDestinationCode(destination.iataCode);

    // Smooth scroll to search section
    const el = document.getElementById("search-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ==============================
  // SEARCH FLIGHTS
  // ==============================
  const handleFlightSearch = async () => {
    if (!destinationCode || !departureDate) {
      alert("Please select a destination and departure date.");
      return;
    }

    try {
      setLoadingFlights(true);
      setError(null);

      const response = await fetch(
        `/api/flights?origin=ACC&destination=${destinationCode}&departureDate=${departureDate}`
      );

      if (!response.ok) throw new Error("Flight search failed");

      const data = await response.json();
      setFlights(data?.data || []);
    } catch (err) {
      console.error(err);
      setError("Could not fetch flights.");
    } finally {
      setLoadingFlights(false);
    }
  };

  // ==============================
  // UI
  // ==============================
  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <Hero
        selectedDestination={destinationCode}
        popular={popular}
      />

      {/* ================= POPULAR ================= */}
      <PopularDestinations
        onSelect={(code) => {
          setDestinationCode(code);
          const el = document.getElementById("search-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* ================= SEARCH SECTION ================= */}
      <div
        id="search-section"
        className="max-w-6xl mx-auto mt-16 px-6"
      >
        <SearchBar onSearch={handleSearch} />

        {/* Date + Flight Button */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
          <input
            type="date"
            value={departureDate}
            onChange={(e) =>
              setDepartureDate(e.target.value)
            }
            className="p-3 rounded-lg border w-full md:w-auto"
          />

          <button
            onClick={handleFlightSearch}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Search Flights
          </button>
        </div>

        {/* ================= DESTINATIONS RESULTS ================= */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">
            Destination Results
          </h2>

          {loading && (
            <p className="text-blue-600">Searching...</p>
          )}

          {error && (
            <p className="text-red-600">{error}</p>
          )}

          {!loading &&
            destinations.length === 0 && (
              <p className="text-gray-500">
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
                onSelect={() =>
                  handleSelectDestination(dest)
                }
              />
            ))}
          </div>
        </div>

        {/* ================= FLIGHT RESULTS ================= */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">
            Flight Results
          </h2>

          {loadingFlights && (
            <p className="text-blue-600">
              Fetching flights...
            </p>
          )}

          {!loadingFlights &&
            flights.length === 0 &&
            destinationCode && (
              <p className="text-gray-500">
                No flights found.
              </p>
            )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flights.map((flight) => {
              const segment =
                flight.itineraries?.[0]?.segments?.[0];

              return (
                <div
                  key={flight.id}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <h3 className="text-lg font-bold">
                    {flight.validatingAirlineCodes?.[0]}
                  </h3>

                  <p className="mt-2 text-gray-600">
                    Departure:{" "}
                    {new Date(
                      segment?.departure?.at
                    ).toLocaleString()}
                  </p>

                  <p className="mt-2 text-blue-600 font-semibold">
                    ${flight.price?.total}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}