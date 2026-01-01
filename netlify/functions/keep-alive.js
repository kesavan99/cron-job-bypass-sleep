const fetch = require("node-fetch");

// Timeout utility function
const fetchWithTimeout = (url, timeout = 10000) => {
  return Promise.race([
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
};

exports.handler = async () => {
  const results = {
    server: { status: 'pending', data: null, error: null },
    ats: { status: 'pending', data: null, error: null }
  };

  try {
    // Hit SkillMint Server API
    console.log("Pinging SkillMint Server...");
    try {
      const serverRes = await fetchWithTimeout("https://skill-mint-server.onrender.com/", 10000);
      const serverData = await serverRes.json();
      results.server.status = serverRes.status;
      results.server.data = serverData;
      console.log("Server responded:", serverRes.status);
    } catch (err) {
      console.error("Server ping error:", err.message);
      results.server.status = 'error';
      results.server.error = err.message;
    }

    // Hit ATS API Health Check
    console.log("Pinging ATS API...");
    try {
      const atsRes = await fetchWithTimeout("https://ats-analysis.onrender.com/api/v1/health", 10000);
      const atsData = await atsRes.json();
      results.ats.status = atsRes.status;
      results.ats.data = atsData;
      console.log("ATS responded:", atsRes.status);
    } catch (err) {
      console.error("ATS ping error:", err.message);
      results.ats.status = 'error';
      results.ats.error = err.message;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
        results: results
      })
    };
  } catch (err) {
    console.error("General error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: err.message,
        results: results
      })
    };
  }
};
