const BASE_URL = "http://localhost:8000/api/amadeus"; 
// Change to production backend URL when deployed

export async function searchDestinations(keyword) {
  const response = await fetch(
    `${BASE_URL}/locations?keyword=${keyword}&subType=CITY`
  );
  return response.json();
}

export async function searchFlights(origin, destination, date) {
  const response = await fetch(
    `${BASE_URL}/flights?origin=${origin}&destination=${destination}&departureDate=${date}&adults=1`
  );
  return response.json();
}

export async function searchHotels(cityCode) {
  const response = await fetch(
    `${BASE_URL}/hotels?cityCode=${cityCode}`
  );
  return response.json();
}

export async function getCityInfo(keyword) {
  const response = await fetch(
    `${BASE_URL}/cities?keyword=${keyword}`
  );
  return response.json();
}