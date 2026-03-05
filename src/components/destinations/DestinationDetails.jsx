import { useParams } from "react-router-dom";
import useDestinationDetails from "../../hooks/useDestinationDetails";
import FlightOffers from "../components/flights/FlightOffers";
import HotelOffers from "../components/hotels/HotelOffers";
import WeatherCard from "../components/weather/WeatherCard";

export default function DestinationPage() {
  const { iataCode } = useParams();
  const { details } = useDestinationDetails(iataCode);

  if (!details) return <div>Loading...</div>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold">
        {details.city}
      </h1>

      <WeatherCard weather={details.weather} />
      <FlightOffers flights={details.flights} />
      <HotelOffers hotels={details.hotels} />
    </div>
  );
}