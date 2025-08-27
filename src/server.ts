import { app } from "./app";
import env = require("./env");

app.listen({ 
  port: env.PORT,
  host: "0.0.0.0"
}).then(() => {
  console.log("🚀 HTTP Server running!");
});