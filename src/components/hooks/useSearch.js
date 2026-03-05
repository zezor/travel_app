// src/hooks/useSearch.js
import { useState } from "react";
import api from "../services/api";

export default function useSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchDestinations = async (keyword) => {
    if (!keyword) return;

    try {
      setLoading(true);
      setError(false);

      const res = await api.get(
        `/v1/reference-data/locations?keyword=${keyword}&subType=CITY`
      );

      setResults(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searchDestinations };
}