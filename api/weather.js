// api/weather.js - Vercel serverless function
// Securely proxies OpenWeather API requests, keeping the API key server-side.
//
// Supported endpoints (pass via ?endpoint=):
//   geocode    - geocoding lookup           params: q, limit (default 5)
//   current    - current weather            params: q OR (lat, lon), units (default imperial)
//   forecast   - 5-day / 3-hour forecast    params: q OR (lat, lon), units (default imperial)
//
// Examples:
//   /api/weather?endpoint=geocode&q=Denver,US&limit=5
//   /api/weather?endpoint=current&q=08075&units=imperial
//   /api/weather?endpoint=current&lat=39.74&lon=-105.0&units=metric
//   /api/weather?endpoint=forecast&q=Denver,US&units=imperial

export default async function handler(req, res) {
    // Only allow GET requests
  if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
  }

  // API key stored securely in Vercel environment variables
  const API_KEY = process.env.OPENWEATHER_API_KEY;
    if (!API_KEY) {
          return res.status(500).json({ error: 'Weather service unavailable' });
    }

  const { endpoint = 'current', q, lat, lon, units = 'imperial', limit = '5' } = req.query;

  // Validate units
  const validUnits = ['imperial', 'metric', 'standard'];
    const safeUnits = validUnits.includes(units) ? units : 'imperial';

  try {
        let apiUrl;

      if (endpoint === 'geocode') {
              // Geocoding: city/zip name -> lat/lon results
          if (!q) {
                    return res.status(400).json({ error: 'q parameter is required for geocoding' });
          }
              const safeLimit = Math.min(parseInt(limit, 10) || 5, 10);
              apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=${safeLimit}&appid=${API_KEY}`;

      } else if (endpoint === 'current') {
              // Current weather: by city query OR coordinates
          if (lat && lon) {
                    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&units=${safeUnits}&appid=${API_KEY}`;
          } else if (q) {
                    // Auto-fix US zip codes (5 digits or 5+4 format)
                let searchQuery = q;
                    if (/^\d{5}(-\d{4})?$/.test(q.trim())) {
                                searchQuery = `${q.trim()},US`;
                    }
                    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchQuery)}&units=${safeUnits}&appid=${API_KEY}`;
          } else {
                    return res.status(400).json({ error: 'Either q or (lat, lon) is required for current weather' });
          }

      } else if (endpoint === 'forecast') {
              // 5-day / 3-hour forecast: by city query OR coordinates
          if (lat && lon) {
                    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&units=${safeUnits}&appid=${API_KEY}`;
          } else if (q) {
                    let searchQuery = q;
                    if (/^\d{5}(-\d{4})?$/.test(q.trim())) {
                                searchQuery = `${q.trim()},US`;
                    }
                    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(searchQuery)}&units=${safeUnits}&appid=${API_KEY}`;
          } else {
                    return res.status(400).json({ error: 'Either q or (lat, lon) is required for forecast' });
          }

      } else {
              return res.status(400).json({ error: `Unknown endpoint: ${endpoint}` });
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
        return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
