import { useState } from "react";
import useSearch from "../hooks/useSearch";
import DestinationList from "../destinations/DestinationList";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const { results, search } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    search(query);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Search city..."
          className="p-3 rounded-l-lg w-full text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-blue-600 px-6 rounded-r-lg">
          Search
        </button>
      </form>

      <DestinationList destinations={results} />
    </div>
  );
}