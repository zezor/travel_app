// src/services/api.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;

let token = null;
let tokenExpires = 0;

const api = axios.create({
  baseURL: "https://test.api.amadeus.com",
});

// Function to get OAuth token
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
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  token = res.data.access_token;
  tokenExpires = now + res.data.expires_in * 1000 - 60000; // refresh 1 min before expiry
  return token;
}

// Request wrapper
api.interceptors.request.use(async (config) => {
  const accessToken = await getToken();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default api;