// api/news.js
// Vercel supports built-in fetch in Node 18+, so no need for 'node-fetch'
export default async function handler(req, res) {
    // 1. Set CORS headers so your Epsilon frontend can talk to this API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle the preflight request for CORS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. Get the search query from the URL (e.g., ?q=science)
    const { q } = req.query;
    const query = q || 'education';
    
    // 3. Your NewsAPI Key
    // Pro Tip: In Vercel, move this to Environment Variables later!
    const NEWS_API_KEY = 'f5c862c1f83c445da6bece4fd0389df4'; 

    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=12&apiKey=${NEWS_API_KEY}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // 4. Send the data back to your index.html
        return res.status(200).json(data);
    } catch (error) {
        console.error("Vercel Function Error:", error);
        return res.status(500).json({ error: 'Failed to fetch news from Epsilon Servers' });
    }
}
