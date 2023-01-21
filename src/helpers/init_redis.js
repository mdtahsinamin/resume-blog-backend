const { createClient } = require("redis");
const client = createClient({
  port: 6379,
  host: "127.0.0.1",
});
const connectRedis = async () => {
  try {
    await client.connect();
  } catch (error) {}
};
client.on("connect", () => {
  console.log("Client connected to redis...");
});
client.on("ready", () => {
  console.log("Client connected to redis and ready to use...");
});

client.on("error", (err) => console.log("Redis Client Error", err));

client.on("end", () => {
  console.log("Client disconnected from redis");
});

process.on("SIGINT", () => {
  client.quit();
});
module.exports = { connectRedis, client };
