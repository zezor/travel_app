export default function FlightCard({
  airline,
  price,
  departure,
  onAdd
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{airline}</h3>
      <p className="text-gray-600 mt-2">Departure: {departure}</p>
      <p className="text-blue-600 font-bold mt-2">{price}</p>

      <button
        onClick={onAdd}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add to Itinerary
      </button>
    </div>
  );
}
