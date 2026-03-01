import { useItineraryStore } from "../../store/itineraryStore";

export default function ItineraryPlanner() {
  const { items, removeItem } = useItineraryStore();

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">
        My Itinerary
      </h2>

      {items.map((item) => (
        <div key={item.id} className="bg-white p-4 shadow mb-4">
          <p>{item.name}</p>
          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}