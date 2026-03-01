let cachedToken = null;
let tokenExpiry = 0;

export default async function handler(req, res) {
  const now = Date.now();

  if (cachedToken && now < tokenExpiry) {
    return res.status(200).json({ access_token: cachedToken });
  }

  const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_API_KEY,
      client_secret: process.env.AMADEUS_API_SECRET
    })
  });

  const data = await response.json();
  cachedToken = data.access_token;
  tokenExpiry = now + (data.expires_in - 60) * 1000; // expire 1 min early

  return res.status(200).json({ access_token: cachedToken });
}