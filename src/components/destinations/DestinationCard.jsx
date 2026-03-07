export default function DestinationCard({ city, country, iataCode, image }) {
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <img
        src={image || `https://source.unsplash.com/400x300/?${city}`}
        alt={city}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold">{city}</h3>
        <p>{country}</p>
      </div>
    </div>
  );
}