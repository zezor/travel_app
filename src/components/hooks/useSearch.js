import { useState } from "react";
import api from "../../services/api";

export default function useSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (keyword) => {
    try {
      setLoading(true);
      const res = await api.get(`/search-destinations/?keyword=${keyword}`);
      setResults(res.data);
    } catch (err) {
      setError("No destinations found.");
    } finally {
      setLoading(false);
    }
  };

  return { results, search, loading, error };
}