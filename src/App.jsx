import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ItineraryProvider } from "./context/ItineraryContext";

function App() {
  return (
    <ItineraryProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ItineraryProvider>
  );
}

export default App;
