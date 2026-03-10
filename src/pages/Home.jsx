import Navbar from "../components/layout/Navbar";
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

      <div className="max-w-6xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-semibold mb-6">Popular Destinations</h2>
        <DestinationList destinations={popular} />

        {/* <h2 className="text-2xl font-semibold mt-12 mb-6">Search Results</h2>
        {loading && <p>Loading...</p>}
        <DestinationList onSearch={searchDestinations} /> */}
        {error && <p className="text-red-600">Failed to fetch destinations</p>}
        <DestinationList destinations={results} />
      </div>
    </>
  );
}