import { useItineraryStore } from "../store/itineraryStore";

export default function HotelOffers({ hotels }) {
  const addItem = useItineraryStore((state) => state.addItem);

  if (!hotels?.length) return <p>No hotels found.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Hotel Accommodations
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {hotels.map((hotel) => (
          <div
            key={hotel.hotel.hotelId}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h3 className="font-semibold">
              {hotel.hotel.name}
            </h3>

            <p>Rating: {hotel.hotel.rating || "N/A"}</p>

            <p className="text-blue-600 font-bold">
              {hotel.offers?.[0]?.price?.currency}{" "}
              {hotel.offers?.[0]?.price?.total}
            </p>

            <button
              onClick={() =>
                addItem({
                  id: Date.now(),
                  type: "hotel",
                  name: hotel.hotel.name,
                })
              }
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
            >
              Add to Itinerary
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}