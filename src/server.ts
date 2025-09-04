import { app } from "./app.ts";
import { env } from "./env/index.ts";
import { logger } from "./lib/logger.ts";

app.listen({ 
  port: env.PORT,
  host: "0.0.0.0"
}).then(() => {
  logger.info("HTTP Server started successfully", {
    port: env.PORT,
    environment: env.NODE_ENV,
    url: `http://localhost:${env.PORT}`,
  });
});