const fetch = require("node-fetch");

async function pingRender() {
  try {
    console.log("Starting ping to Render...");
    const res = await fetch("https://skill-mint-server.onrender.com/skill-mint/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "dummy@gmail.com",
        password: "efrgdhngfgf",
        newOne: false
      })
    });

    const data = await res.json();
    console.log("Ping response:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data })
    };
  } catch (err) {
    console.error("Ping error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}

exports.handler = pingRender;
