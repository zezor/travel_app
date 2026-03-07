export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="bg-blue-100 p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-2">
        Current Weather
      </h2>

      <p>🌡 Temperature: {weather.temperature}°C</p>
      <p>☁ Condition: {weather.description}</p>
    </div>
  );
}