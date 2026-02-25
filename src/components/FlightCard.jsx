import { useState } from "react";

export default function FlightCard({
  airline,
  price,
  departure,
  onAdd
}) {
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{airline}</h3>
      <p className="text-gray-600 mt-2">Departure: {departure}</p>
      <p className="text-blue-600 font-bold mt-2">{price}</p>

      {/* Day Selector */}
      <div className="mt-4">
        <label className="block text-sm mb-1">Select Day</label>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(Number(e.target.value))}
          className="w-full border rounded-md p-2"
        >
          {[1,2,3,4,5,6,7].map(day => (
            <option key={day} value={day}>
              Day {day}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => onAdd(selectedDay)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
      >
        Add to Itinerary
      </button>
    </div>
  );
}
