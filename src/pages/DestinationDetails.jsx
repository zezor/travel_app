import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import FlightCard from "../components/FlightCard";
import HotelCard from "../components/HotelCard";
import { useItinerary } from "../context/ItineraryContext";
import { toast } from "sonner";

export default function DestinationDetails() {
  const { code } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const { addToItinerary } = useItinerary();

  const handleAddToItinerary = (item) => {
    const newItem = {
      id: Date.now(),
      name: item.name || item.airline,
      destination: code,
      day: 1, // default for now
      type: item.airline ? "flight" : "hotel",

    };

   
    addToItinerary(newItem);

    toast.success(`${newItem.name} added to itinerary`);
  };

  const handleAddFlight = (flight) => {
    const newItem = {
      id: Date.now(),
      name: flight.airline,
      destination: code,
      day: 1,
      type: "flight",
      price: flight.price,
      departure: flight.departure,
    };

     if (newItem.some(item => item.name === flight.airline)) {
  toast.error("Already added!");
  return;
}

    addToItinerary(newItem);
    toast.success(`${flight.airline} added to itinerary`);
  };

  const mockFlights = [
    { airline: "Air France", price: "$450", departure: "08:00 AM" },
    { airline: "British Airways", price: "$520", departure: "11:30 AM" },
  ];

  const mockHotels = [
    { name: "Grand Hotel Paris", price: "$220/night", rating: "4.5" },
    { name: "City Comfort Inn", price: "$150/night", rating: "4.2" },
  ];

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen pb-12">
        <div className="max-w-6xl mx-auto px-6 pt-10">
          <h1 className="text-4xl font-bold mb-4">Destination: {code}</h1>

          <img
            src="https://via.placeholder.com/1200x400"
            alt="Destination"
            className="w-full h-72 object-cover rounded-xl mb-6"
          />

          {/* Tabs */}
          <div className="flex space-x-6 border-b mb-6">
            {["overview", "flights", "hotels"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 capitalize ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div>
              <p className="text-gray-600">
                Explore amazing attractions, book flights and find the best
                hotels in this destination.
              </p>
            </div>
          )}

          {activeTab === "flights" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockFlights.map((flight, index) => (
                <FlightCard
                  key={index}
                  {...flight}
                  onAdd={() => handleAddFlight(flight)}
                />
              ))}
            </div>
          )}

          {activeTab === "hotels" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockHotels.map((hotel, index) => (
              <HotelCard
                  key={index}
                  {...hotel}
                  onAdd={() => handleAddToItinerary(hotel)}
                />

              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
