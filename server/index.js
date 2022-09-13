const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 4000;
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;

const app = express();

const POLY_API = `https://api.polygon.io/v2`;

const dataDir = __dirname + "/data";
const openClose = require(dataDir + "/day-open-close.json");
const prevClose = require(dataDir + "/prev-close.json");

// async function getData() {
//   try {
//     const result = await axios.get(url);
//     return result.data;
//   } catch (err) {
//     console.error(err);
//   }
// }

// function makeError(message, status) {
//   let err = message instanceof Error ? message : new Error(message);
//   err.status = status;
//   return err;
// }

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
  // responding with saved data for demo purposes
  const { symbol } = req.params;
  for (let i = 0; i < openClose.length; i++) {
    if (openClose[i].symbol === symbol) {
      res.json(openClose[i]);
      break;
    }
  }
  if (!res.headersSent) res.json({ message: "Symbol data not available." });
});

app.get("/api/prev-close/:symbol", async (req, res) => {
  // responding with saved data for demo purposes
  const { symbol } = req.params;
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
  const { symbol } = req.params;
  const intradayData = require(dataDir + `/intraday/${symbol}.json`);

  res.json(intradayData);
  if (!res.headersSent) res.json({ message: "Symbol data not available." });
});

app.get("/api/quote/:symbol", async (req, res) => {
  const { symbol } = req.params;
  try {
    const quoteResponse = await axios.get(
      quoteUrl + `&symbol=${symbol}&apikey=${ALPHA_API_KEY}`
    );
    res.json(quoteResponse.data);
  } catch (error) {
    console.log(error);
  }
  if (!res.headersSent) res.json({ message: "Symbol data not available." });
});

app.get("/api/stocks/:direction", async (req, res) => {
  const { direction } = req.params;
  try {
    const response = await axios.get(
      POLY_API +
        `/snapshot/locale/us/markets/stocks/${direction}?apiKey=${POLYGON_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`);
});
