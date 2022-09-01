const path = require("path");
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

const app = express();

// const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${REACT_APP_API_KEY}`;
app.use(cors());

app.disable("x-powered-by");

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.json({ message: "hello from server" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`proxy listening on ${PORT}`);
});
