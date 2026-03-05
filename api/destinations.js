export default async function handler(req, res) {
  const { keyword } = req.query;


  const { access_token } = await tokenRes.json();

  const response = await fetch(
    `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${keyword}&subType=CITY`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}