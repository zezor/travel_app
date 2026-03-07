import axios from "axios";

const API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;

let token = null;
let tokenExpires = 0;

const api = axios.create({
  baseURL: "https://test.api.amadeus.com",
});

// Get OAuth Token
async function getToken() {
  const now = Date.now();
  if (token && tokenExpires > now) return token;

  const res = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: API_KEY,
      client_secret: API_SECRET,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  token = res.data.access_token;
  tokenExpires = now + res.data.expires_in * 1000 - 60000;

  return token;
}

// Attach token automatically
api.interceptors.request.use(async (config) => {
  const accessToken = await getToken();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});



/* =========================
   AMADEUS API FUNCTIONS
========================= */

// Search city / airport
export async function searchCities(keyword) {
  const res = await api.get(
    `/v1/reference-data/locations`,
    {
      params: {
        keyword,
        subType: "CITY",
      },
    }
  );

  return res.data.data;
}


// Flight offers
export async function getFlightOffers(origin, destination, date) {
  const res = await api.get(
    `/v2/shopping/flight-offers`,
    {
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: date,
        adults: 1,
      },
    }
  );

  return res.data.data;
}


// Hotel offers
export async function getHotelOffers(cityCode) {
  try {
    const res = await api.get("/v3/shopping/hotel-offers", {
      params: { cityCode },
    });

    return res.data.data || [];
  } catch (err) {
    console.warn("Hotel API failed for city:", cityCode);
    return [];
  }
}

export default api;