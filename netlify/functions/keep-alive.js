const fetch = require("node-fetch");

async function pingRender() {
for(let i=0;i<10;i++){
  try {
    console.log("Starting ping to Render..."+i);
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
    console.log("Render response status:", res.status);
    console.log("Ping response:", data);
  } catch (err) {
    console.error("Ping error:", err.message);
  }

  setTimeout(function() {
  console.log("This message appears after 1 second.");
}, 4000);

}
}

exports.handler = pingRender;
