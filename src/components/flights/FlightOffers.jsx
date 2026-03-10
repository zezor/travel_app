import { useItineraryStore } from "../store/itineraryStore";

export default function FlightOffers({ flights }) {
  const addItem = useItineraryStore((state) => state.addItem);

  if (!flights?.length) return <p>No flight offers available.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Flight Offers</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {flights.map((flight) => {
          const segment = flight.itineraries?.[0]?.segments?.[0];

          return (
            <div
              key={flight.id}
              className="bg-white p-4 rounded-xl shadow"
            >
              <p className="font-semibold">
                {segment?.carrierCode}
              </p>

              <p>
                {segment?.departure?.iataCode} →{" "}
                {segment?.arrival?.iataCode}
              </p>

              <p className="text-blue-600 font-bold">
                {flight.price?.currency} {flight.price?.total}
              </p>

              <button
                onClick={() =>
                  addItem({
                    id: Date.now(),
                    type: "flight",
                    name: `${segment?.carrierCode} Flight`,
                  })
                }
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add to Itinerary
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}