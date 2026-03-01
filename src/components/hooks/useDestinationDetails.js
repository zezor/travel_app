// src/hooks/useDestinationDetails.js

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function useDestinationDetails(iataCode) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!iataCode) return;

    async function fetchDetails() {
      try {
        setLoading(true);

        const res = await api.get(
          `/destination-details/?iataCode=${iataCode}`
        );

        setDetails(res.data);
      } catch (err) {
        setError("Failed to load destination details.");
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [iataCode]);

  return { details, loading, error };
}