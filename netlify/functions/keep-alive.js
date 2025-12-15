const fetch = require("node-fetch");

exports.handler = async () => {
  try {
    console.log("Starting GET request to Render...");
    
    const res = await fetch("https://api.skillhubtools.store/", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    console.log("Render response status:", res.status);
    console.log("Ping response:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, renderStatus: res.status, data })
    };
  } catch (err) {
    console.error("Ping error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
