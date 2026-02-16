export default function HotelCard({ name, price, rating }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600 mt-2">Rating: ⭐ {rating}</p>
      <p className="text-blue-600 font-bold mt-2">{price}</p>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        Add to Itinerary
      </button>
    </div>
  );
}
