const cron = require("node-cron");
const axios = require("axios");

// URL of your heartbeat endpoint
const heartbeatUrl = process.env.PRODUCTION_SERVICE_ALIVE_URL;

// Schedule cron job to hit the endpoint every 5 minutes
cron.schedule("*/14 * * * *", async () => {
  try {
    const response = await axios.get(heartbeatUrl);
    console.log(`Heartbeat sent to ${heartbeatUrl}: ${response.data.message}`);
  } catch (error) {
    console.error(
      `Error sending heartbeat to ${heartbeatUrl}: ${error.message}`
    );
  }
});
