export default function SearchBar({ onSearch }) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 flex">
      <input
        type="text"
        placeholder="Search destination..."
        className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onSearch}
        className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  );
}
