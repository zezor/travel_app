// src/components/flights/FlightOffers.jsx

import { useItineraryStore } from "../store/itineraryStore";

export default function FlightOffers({ flights }) {
  const addItem = useItineraryStore((state) => state.addItem);

  if (!flights?.length) {
    return <p>No flight offers available.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Flight Offers
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {flights.map((flight, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow"
          >
            <p className="font-semibold">
              {flight.airline}
            </p>
            <p>
              {flight.departure} → {flight.arrival}
            </p>
            <p className="text-blue-600 font-bold">
              GHS {flight.price}
            </p>

            <button
              onClick={() =>
                addItem({
                  id: Date.now(),
                  type: "flight",
                  name: `${flight.airline} Flight`,
                })
              }
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add to Itinerary
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}