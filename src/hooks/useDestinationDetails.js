import { useEffect, useState } from "react";
import api from "../services/api";

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

        const [cityRes, hotelRes, flightRes] = await Promise.all([
          api.get(
            `/v1/reference-data/locations?keyword=${iataCode}&subType=CITY`
          ),
          api.get(
            `/v1/shopping/hotel-offers?cityCode=${iataCode}`
          ),
          api.get(
            `/v2/shopping/flight-offers?originLocationCode=ACC&destinationLocationCode=${iataCode}&departureDate=2026-06-01&adults=1`
          ),
        ]);

        setDetails(cityRes.data.data?.[0] || null);
        setHotels(hotelRes.data.data || []);
        setFlights(flightRes.data.data || []);
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