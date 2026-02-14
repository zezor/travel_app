import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import DestinationDetails from "../pages/DestinationDetails";
import Itinerary from "../pages/Itinerary";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/destination/:code" element={<DestinationDetails />} />
      <Route path="/itinerary" element={<Itinerary />} />
    </Routes>
  );
}
