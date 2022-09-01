const path = require("path");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 4000;
const ALPHA_API_KEY = process.env.ALPHA_API_KEY;

const app = express();

// const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${ALPHA_API_KEY}`;
const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${ALPHA_API_KEY}`;

async function getData() {
  try {
    const result = await axios.get(url);
    return result.data;
  } catch (err) {
    console.error(err);
  }
}

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(cors());

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/api", async (req, res) => {
  const data = await getData();
  res.json(data);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`proxy listening on ${PORT}`);
});
