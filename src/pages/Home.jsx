// src/pages/Home.jsx

import { useEffect, useState } from "react";
import Hero from "../components/hero/Hero";
import DestinationList from "../components/destinations/DestinationList";
import api from "../services/api";

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPopular() {
      try {
        const res = await api.get("/popular-destinations/");
        setPopular(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPopular();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Hero popular={popular} />

      <section className="p-8">
        <h2 className="text-3xl font-bold mb-6">
          Popular Destinations
        </h2>

        <DestinationList destinations={popular} />
      </section>
    </>
  );
}