import { useState } from "react";
import React from "react";
import { Trash2, Calendar, MapPin, Save, X } from "lucide-react";

import { toast } from "sonner";
import Navbar from "../components/Navbar";
import { useItinerary } from "../context/ItineraryContext";
import { useNavigate } from "react-router-dom";





export default function Itinerary() {
  const { itinerary, removeFromItinerary, clearItinerary, organizeByDays } =
    useItinerary();
  const [tripName, setTripName] = useState("My Trip");
  const organizedItinerary = organizeByDays();

  const navigate = useNavigate();

  const { addToItinerary } = useItinerary();
  // const handleSave = () => {
  //   toast.success("Itinerary saved successfully!");
  // };

  const handleAddTrip = (e) => {
  e.preventDefault();

  const newItem = {
    id: Date.now(),
    name: activityName,
    destination: destination,
    day: selectedDay,
  };
  if (itinerary.some(item => item.name === activityName && item.destination === destination && item.day === selectedDay)) {
    toast.error("This activity is already in your itinerary for the selected day and destination!");
    return;
  }
  addToItinerary(newItem);
  toast.success(`Added "${activityName}" to itinerary!`);

  // Reset form fields
  setActivityName("");
  setDestination("");
  setSelectedDay(1);
};


  const handleClear = () => {
    if (
      window.confirm("Are you sure you want to clear your entire itinerary?")
    ) {
      clearItinerary();
      toast.success("Itinerary cleared");
    }
  };

  const handleRemove = (id, name) => {
    removeFromItinerary(id);
    toast.success(`Removed "${name}" from itinerary`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl mb-4">My Itinerary</h1>

            {/* Trip Name Input */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1">
                <input
                  className="w-full file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  placeholder="Enter trip name..."
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddTrip}
                  className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>

                {itinerary.length > 0 && (
                  <button
                    onClick={handleClear}
                    className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Itinerary Content */}
          {itinerary.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl mb-2">Your itinerary is empty</h2>
              <p className="text-gray-600 mb-6">
                Start adding attractions from destinations to plan your trip!
              </p>
              <button onClick={() =>  navigate("/")} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                Explore Destinations
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl text-blue-600 mb-1">
                      {itinerary.length}
                    </div>
                    <div className="text-gray-600 text-sm">Activities</div>
                  </div>

                  <div>
                    <div className="text-3xl text-blue-600 mb-1">
                      {Object.keys(organizedItinerary).length}
                    </div>
                    <div className="text-gray-600 text-sm">Days</div>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <div className="text-3xl text-blue-600 mb-1">
                      {new Set(itinerary.map((item) => item.destination)).size}
                    </div>
                    <div className="text-gray-600 text-sm">Destinations</div>
                  </div>
                </div>
              </div>

              {/* Day by Day Itinerary */}
              {Object.entries(organizedItinerary).map(([day, items]) => (
                <div
                  key={day}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="bg-blue-600 text-white px-6 py-4">
                    <h2 className="text-xl flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Day {day}
                    </h2>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg mb-1">{item.name}</h3>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{item.destination}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleRemove(item.id, item.name)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 self-start sm:self-center"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
