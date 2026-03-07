import { useState, useEffect } from "react";
import api from "../services/api";

export default function usePopularDestinations() {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPopular() {
      try {
        setLoading(true);
        // Example: Top 6 cities
        const cities = ["PAR", "NYC", "LON", "TYO", "DUB", "BKK"];
        const data = [];

        for (const code of cities) {
          const res = await api.get(`/v1/reference-data/locations/cities?keyword=${code}`);
          if (res.data.data?.[0]) {
            const city = res.data.data[0];
            data.push({
              iataCode: city.iataCode,
              city: city.name,
              country: city.address?.countryName,
              // Optional: random price preview
              price: `$${Math.floor(Math.random() * 500 + 100)}`,
            });
          }
        }

        setPopular(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPopular();
  }, []);

  return { popular, loading };
}