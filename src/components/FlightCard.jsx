export default function FlightCard({ flight, onAdd }) {
  const segment = flight.itineraries[0].segments[0];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold">
        {flight.validatingAirlineCodes[0]}
      </h3>

      <p className="text-gray-600 mt-2">
        Departure: {new Date(segment.departure.at).toLocaleString()}
      </p>

      <p className="text-blue-600 font-bold mt-2">
        ${flight.price.total}
      </p>

      <button
        onClick={() => onAdd(flight)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Add to Itinerary
      </button>
    </div>
  );
}