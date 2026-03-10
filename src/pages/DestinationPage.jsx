import { useParams } from "react-router-dom";
import useDestinationDetails from "../hooks/useDestinationDetails";
import FlightOffers from "../components/flights/FlightOffers";
import HotelOffers from "../components/hotels/HotelOffers";
// import WeatherCard from "../components/weather/WeatherCard";

export default function DestinationPage() {
  const { iataCode } = useParams();

  const { details, flights, hotels, loading } =
    useDestinationDetails(iataCode);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold">
        {details?.name}
      </h1>

      {/* <WeatherCard city={details?.name} /> */}

      <FlightOffers flights={flights} />

      <HotelOffers hotels={hotels} />
    </div>
  );
}