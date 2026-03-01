// src/components/itinerary/ItineraryItem.jsx

export default function ItineraryItem({ item, removeItem }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
      <div>
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-gray-500">
          Type: {item.type}
        </p>
      </div>

      <button
        onClick={() => removeItem(item.id)}
        className="text-red-500"
      >
        Remove
      </button>
    </div>
  );
}