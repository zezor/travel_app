export default async function handler(req, res) {
  const { keyword } = req.query;

  try {
    // Get token
    const tokenResponse = await fetch(
      `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5173"}/api/token`
    );

    const tokenData = await tokenResponse.json();

    const response = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${keyword}&subType=CITY`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Destination search failed" });
  }
}