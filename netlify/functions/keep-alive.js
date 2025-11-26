const fetch = require("node-fetch");

exports.handler = async () => {
  try {
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
      body: "Ping sent successfully"
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: "Ping failed"
    };
  }
};
