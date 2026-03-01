// src/pages/ItineraryPage.jsx

import { useItineraryStore } from "../components/store/itineraryStore";
import ItineraryItem from "../components/itinerary/ItineraryItem";

export default function ItineraryPage() {
  const { items, removeItem } = useItineraryStore();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">
        My Travel Itinerary
      </h1>

      {items.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <ItineraryItem
              key={item.id}
              item={item}
              removeItem={removeItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}