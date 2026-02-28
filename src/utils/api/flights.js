export default async function handler(req, res) {
  const { origin, destination, departureDate } = req.query;

  const tokenRes = await fetch(
  `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"}/api/token`
);
  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  const response = await fetch(
    `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=1`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  res.status(200).json(data);
}