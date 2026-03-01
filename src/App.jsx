import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import DestinationPage from "./pages/DestinationPage";
import ItineraryPage from "./pages/ItineraryPage";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination/:iataCode" element={<DestinationPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}