const express = require("express");
const os = require("os");

const app = express();

let logs = [];

app.use((req, res, next) => {
  logs.push({ url: req.url, time: new Date() });
  next();
});

app.get("/", (req, res) => {
  res.send(`
    <h1>DevOps Monitoring Service</h1>
    <p>Status: OK</p>
    <p>Visit /metrics for system info</p>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    memory: process.memoryUsage().rss
  });
});

app.get("/metrics", (req, res) => {
  res.json({
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: os.cpus().length
  });
});

app.get("/logs", (req, res) => {
  res.json(logs);
});

app.listen(3000, () => console.log("Server running on port 3000"));