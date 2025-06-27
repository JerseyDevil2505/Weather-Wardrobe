// api/weather.js - Vercel serverless function
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { location, type = 'current' } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location parameter is required' });
  }

  // API key stored securely in Vercel environment variables
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'Weather service unavailable' });
  }

  try {
    // Fix for US zip codes
    let searchQuery = location;
    if (/^\d{5}(-\d{4})?$/.test(location.trim())) {
      searchQuery = `${location.trim()},US`;
    }

    let apiUrl;
    if (type === 'forecast') {
      apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(searchQuery)}&appid=${API_KEY}&units=imperial`;
    } else {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchQuery)}&appid=${API_KEY}&units=imperial`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: data.message || 'Weather data unavailable' 
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error('Weather API error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch weather data' 
    });
  }
}
