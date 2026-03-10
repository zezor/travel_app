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

      const [city, flights, hotels] = await Promise.all([
        searchCities(iataCode),
        getFlightOffers("ACC", iataCode, "2026-06-01"),
        getHotelOffers(iataCode),
      ]);

      setDetails(city?.[0] || null);
      setFlights(flights);
      setHotels(hotels);

    } catch (error) {
      console.error(error);
      setError("Failed to load destination data");
    } finally {
      setLoading(false);
    }
  }

  fetchDetails();

}, [iataCode]);

  return { details, hotels, flights, loading, error };
}
