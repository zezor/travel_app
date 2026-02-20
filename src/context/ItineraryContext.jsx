// import { createContext, useContext, useState } from "react";

// const ItineraryContext = createContext();

// export function ItineraryProvider({ children }) {
//   const [itinerary, setItinerary] = useState([]);

//   const addToItinerary = (id, name, destination) => {
//     // Prevent duplicates
//     if (itinerary.some((item) => item.id === id)) {
//       return;
//     }

//     // Group 3 activities per day
//     const day = Math.floor(itinerary.length / 3) + 1;

//     setItinerary([
//       ...itinerary,
//       { id, name, destination, day }
//     ]);
//   };

//   const removeFromItinerary = (id) => {
//     const newItinerary = itinerary.filter((item) => item.id !== id);

//     // Reorganize days after removal
//     const reorganized = newItinerary.map((item, index) => ({
//       ...item,
//       day: Math.floor(index / 3) + 1,
//     }));

//     setItinerary(reorganized);
//   };

//   const clearItinerary = () => {
//     setItinerary([]);
//   };

//   const isInItinerary = (id) => {
//     return itinerary.some((item) => item.id === id);
//   };

//   const organizeByDays = () => {
//     const organized = {};

//     itinerary.forEach((item) => {
//       if (!organized[item.day]) {
//         organized[item.day] = [];
//       }
//       organized[item.day].push(item);
//     });

//     return organized;
//   };

//   return (
//     <ItineraryContext.Provider
//       value={{
//         itinerary,
//         addToItinerary,
//         removeFromItinerary,
//         clearItinerary,
//         isInItinerary,
//         organizeByDays,
//       }}
//     >
//       {children}
//     </ItineraryContext.Provider>
//   );
// }

// export function useItinerary() {
//   const context = useContext(ItineraryContext);

//   if (!context) {
//     throw new Error("useItinerary must be used within an ItineraryProvider");
//   }

//   return context;
// }


// export default ItineraryContext;

import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const ItineraryContext = createContext();

export function ItineraryProvider({ children }) {
  const [itinerary, setItinerary] = useState([]);


  useEffect(() => {
  localStorage.setItem("itinerary", JSON.stringify(itinerary));
}, [itinerary]);

useEffect(() => {
  const saved = localStorage.getItem("itinerary");
  if (saved) setItinerary(JSON.parse(saved));
}, []);


  const addToItinerary = (item) => {
    setItinerary((prev) => [...prev, item]);
  };

  const removeFromItinerary = (id) => {
    setItinerary((prev) => prev.filter((item) => item.id !== id));
  };

  const clearItinerary = () => {
    setItinerary([]);
  };

  const organizeByDays = () => {
    const grouped = {};

    itinerary.forEach((item) => {
      if (!grouped[item.day]) {
        grouped[item.day] = [];
      }
      grouped[item.day].push(item);
    });

    return grouped;
  };

  return (
    <ItineraryContext.Provider
      value={{
        itinerary,
        addToItinerary,
        removeFromItinerary,
        clearItinerary,
        organizeByDays,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
}

export function useItinerary() {
  return useContext(ItineraryContext);
}
