const fs = require("fs");
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

// Data provider URLs - not used for demo
// const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${ALPHA_API_KEY}`;
// const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${ALPHA_API_KEY}`;

const dataDir = __dirname + "/data";

const openClose = require(dataDir + "/day-open-close.json");
const prevClose = require(dataDir + "/prev-close.json");
// const intradayData = fs
//   .readdirSync(dataDir + "/intraday")
//   .filter((name) => path.extname(name) === ".json")
//   .map((name) => require(path.join(dataDir + "/intraday", name)));

async function getData() {
  try {
    const result = await axios.get(url);
    return result.data;
  } catch (err) {
    console.error(err);
  }
}

function makeError(message, status) {
  let err = message instanceof Error ? message : new Error(message);
  err.status = status;
  return err;
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

app.get("/api/day-open-close/:symbol", async (req, res) => {
  const { symbol } = req.params;
  // responding with saved data for demo purposes
  // const data = await getData();

  for (let i = 0; i < openClose.length; i++) {
    if (openClose[i].symbol === symbol) {
      res.json(openClose[i]);
      break;
    }
  }
  if (!res.headersSent) res.json({ message: "Symbol data not available." });
});

app.get("/api/prev-close/:symbol", async (req, res) => {
  const { symbol } = req.params;
  // responding with saved data for demo purposes
  // const data = await getData();
  for (let i = 0; i < prevClose.length; i++) {
    if (prevClose[i].ticker === symbol) {
      res.json(prevClose[i]);
      break;
    }
  }
  if (!res.headersSent) res.json({ message: "Symbol data not available." });
});

app.get("/api/intraday/:symbol", async (req, res) => {
  // responding with saved data for demo purposes
  // const data = await getData();
  res.json(data);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`proxy listening on ${PORT}`);
});
