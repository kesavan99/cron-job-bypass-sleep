const fetch = require("node-fetch");

const ENDPOINTS = [
  {
    name: "SkillMint Server",
    url: "https://skill-mint-server.onrender.com/"
  },
  {
    name: "ATS Analysis API",
    url: "https://ats-analysis.onrender.com/api/v1/health"
  }
];

exports.handler = async () => {
  try {
    console.log("Starting health check for all services...");
    
    const results = await Promise.all(
      ENDPOINTS.map(async (endpoint) => {
        try {
          console.log(`Pinging ${endpoint.name} at ${endpoint.url}...`);
          
          const res = await fetch(endpoint.url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          });

          const data = await res.json();
          console.log(`${endpoint.name} response status:`, res.status);
          console.log(`${endpoint.name} response:`, data);

          return {
            service: endpoint.name,
            url: endpoint.url,
            status: res.status,
            success: res.ok,
            data: data,
            timestamp: new Date().toISOString()
          };
        } catch (err) {
          console.error(`Error pinging ${endpoint.name}:`, err.message);
          return {
            service: endpoint.name,
            url: endpoint.url,
            status: 500,
            success: false,
            error: err.message,
            timestamp: new Date().toISOString()
          };
        }
      })
    );

    const allSuccess = results.every(r => r.success);
    const summary = {
      timestamp: new Date().toISOString(),
      totalServices: ENDPOINTS.length,
      successCount: results.filter(r => r.success).length,
      failureCount: results.filter(r => !r.success).length,
      allSuccess: allSuccess,
      results: results
    };

    console.log("Health check complete:", summary);

    return {
      statusCode: allSuccess ? 200 : 207,
      body: JSON.stringify(summary)
    };
  } catch (err) {
    console.error("Keep-alive function error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: err.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
