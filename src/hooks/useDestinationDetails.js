import { useEffect, useState } from "react";
import { searchCities, getFlightOffers, getHotelOffers } from "../services/api";

export default function useDestinationDetails(iataCode) {
  const [details, setDetails] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!iataCode) return;

    async function fetchDetails() {
      try {
        setLoading(true);
        setError(null);

        const [cityData, flightData] = await Promise.all([
          searchCities(iataCode),
          getFlightOffers("ACC", iataCode, "2026-06-01"),
        ]);

        setDetails(cityData?.[0] || null);
        setFlights(flightData || []);

        // fetch hotels separately
        const hotelData = await getHotelOffers(iataCode);
        setHotels(hotelData);
      } catch (err) {
        console.error(err);
        setError("Failed to load destination details.");
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [iataCode]);

  return { details, hotels, flights, loading, error };
}
