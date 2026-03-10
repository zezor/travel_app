import { useState } from "react";
import api from "../services/api";

export default function useSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const search = async (keyword) => {
    if (!keyword) return;

    try {
      setLoading(true);
      setError(false);

      const res = await api.get("/v1/reference-data/locations", {
        params: {
          keyword,
          subType: "CITY",
        },
      });

      const cities = res.data.data.map((city) => ({
        city: city.name,
        country: city.address?.countryName,
        iataCode: city.iataCode,
        image: `https://source.unsplash.com/400x300/?${city.name},city`,
      }));

      setResults(cities);

    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
}