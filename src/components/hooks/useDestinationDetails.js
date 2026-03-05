// src/hooks/useDestinationDetails.js

import { useEffect, useState } from "react";

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

        // 1️⃣ Get city info
        const cityRes = await fetch(
          `/api/city?keyword=${iataCode}`
        );
        const cityData = await cityRes.json();

        // 2️⃣ Get hotels
        const hotelRes = await fetch(
          `/api/hotels?cityCode=${iataCode}`
        );
        const hotelData = await hotelRes.json();

        // 3️⃣ Get flights (example: from Accra to selected city)
        const flightRes = await fetch(
          `/api/flights?origin=ACC&destination=${iataCode}&date=2026-06-01`
        );
        const flightData = await flightRes.json();

        setDetails(cityData.data?.[0] || null);
        setHotels(hotelData.data || []);
        setFlights(flightData.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load destination details.");
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [iataCode]);

  return {
    details,
    hotels,
    flights,
    loading,
    error,
  };
}