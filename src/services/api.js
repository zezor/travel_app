import axios from "axios";

const API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;

let token = null;
let tokenExpires = 0;

const api = axios.create({
  baseURL: "https://test.api.amadeus.com",
});

// =======================
// OAuth Token
// =======================
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

// attach token automatically
api.interceptors.request.use(async (config) => {
  const accessToken = await getToken();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});


/* =========================
   AMADEUS API FUNCTIONS
========================= */

// Search cities
export async function searchCities(keyword) {
  try {
    const res = await api.get("/v1/reference-data/locations", {
      params: {
        keyword,
        subType: "CITY",
      },
    });

    return res.data.data || [];
  } catch (error) {
    console.error("City search failed:", error);
    return [];
  }
}


// Flight offers
export async function getFlightOffers(origin, destination, date) {
  try {
    if (!origin || !destination) return [];

    const res = await api.get("/v2/shopping/flight-offers", {
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: date,
        adults: 1,
      },
    });

    return res.data.data || [];

  } catch (error) {

    if (error.response?.status === 429) {
      console.warn("Amadeus rate limit reached. Retrying in 2 seconds...");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      return getFlightOffers(origin, destination, date);
    }

    console.error("Flight API failed:", error);
    return [];
  }
}


// Step 1: get hotels in city
export async function getHotelsByCity(cityCode) {
  try {
    if (!cityCode || cityCode.length !== 3) return [];

    const res = await api.get(
      "/v1/reference-data/locations/hotels/by-city",
      {
        params: { cityCode },
      }
    );

    return res.data.data || [];

  } catch (error) {

    if (error.response?.status === 400) {
      console.warn("Hotels not supported for city:", cityCode);
      return [];
    }

    console.error("Hotel city lookup failed:", error);
    return [];
  }
}


// Step 2: get hotel offers
export async function getHotelOffers(cityCode) {
  try {
    const hotels = await getHotelsByCity(cityCode);

    if (!hotels.length) return [];

    const hotelIds = hotels.slice(0, 10).map((h) => h.hotelId);

    const res = await api.get("/v3/shopping/hotel-offers", {
      params: {
        hotelIds: hotelIds.join(","),
      },
    });

    return res.data.data || [];

  } catch (error) {
    console.warn("Hotel offers failed:", cityCode);
    return [];
  }
}



export async function getCityImage(city) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_KEY}`
  );

  const data = await res.json();

  return data.results[0]?.urls?.regular;
}

export default api;