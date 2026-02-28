const popular = [
  {
    city: "Dubai",
    country: "UAE",
    code: "DXB",
    image: "https://source.unsplash.com/400x300/?dubai",
  },
  {
    city: "London",
    country: "United Kingdom",
    code: "LON",
    image: "https://source.unsplash.com/400x300/?london",
  },
  {
    city: "Paris",
    country: "France",
    code: "PAR",
    image: "https://source.unsplash.com/400x300/?paris",
  },
];

export default function PopularDestinations({ onSelect }) {
  return (
    <div className="max-w-6xl mx-auto mt-12 px-6">
      <h2 className="text-2xl font-semibold mb-6">
        Popular Destinations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popular.map((item) => (
          <div
            key={item.code}
            onClick={() => onSelect(item.code)}
            className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.city}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="text-lg font-bold">{item.city}</h3>
              <p className="text-gray-500">{item.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}