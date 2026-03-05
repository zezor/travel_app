// src/pages/Home.jsx

import { useEffect, useState } from "react";
import Hero from "../components/hero/Hero";
import DestinationList from "../components/destinations/DestinationList";
import useSearch from "../hooks/useSearch";
import usePopularDestinations from "../hooks/usePopularDestinations";

export default function Home() {
  const { results, loading, error, searchDestinations } = useSearch();
  const { popular } = usePopularDestinations();

  return (
    <>
      <Hero popular={popular} />

      <section className="p-8">
        <h2 className="text-3xl font-bold mb-6">
          Popular Destinations
        </h2>

        <DestinationList destinations={popular} />

        <h2 className="text-2xl font-semibold mt-12 mb-6">Search Results</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">Failed to fetch destinations</p>}
        <DestinationList destinations={results} />
      </div>
    </>
  );
}