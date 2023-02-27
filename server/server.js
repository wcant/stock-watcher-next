import {
  polygonClient,
  restClient,
  websocketClient,
} from "@polygon.io/client-js";
import path from "path";
import * as dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
import express from "express";
import { nextTick } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4000;
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
const rest = restClient(POLYGON_API_KEY);
const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(cors());

app.get(
  "/api/aggregates/:ticker/range/:multiplier/:timespan/:from/:to",
  (req, res, next) => {
    const { ticker, multiplier, timespan, from, to } = req.params;

    rest.stocks
      .aggregates(ticker, multiplier, timespan, from, to, {
        adjusted: true,
        sort: "asc",
      })
      .then((data) => res.json(data))
      .catch((err) => next(err));
  }
);

// Get Snapshot of single ticker pricing info
app.get("/api/:market/snapshot/:ticker", (req, res, next) => {
  const { market, ticker } = req.params;

  if (market === "stocks") {
    rest.stocks
      .snapshotTicker(ticker)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  }
  if (market === "options") {
    res.json({ error: `${market} data not available.` });
  }
  if (market === "forex") {
    res.json({ error: `${market} data not available.` });
  }
  if (market === "crypto") {
    res.json({ error: `${market} data not available.` });
  }
});

// Requests first 5 tickers that match the ticker string
// Used for the TickerInput/Dropdown component
app.get("/api/reference/tickers/:ticker/:limit/:range?", (req, res, next) => {
  // ref: https://github.com/polygon-io/client-js/blob/master/src/rest/reference/tickers.ts
  const { ticker, limit, range } = req.params;
  const queryType = range ? `ticker.${range}` : "ticker";

  rest.reference
    .tickers({
      [queryType]: ticker,
      limit: limit,
    })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

app.get("/api/reference/tickernews/:ticker/:limit", async (req, res, next) => {
  const { ticker, limit } = req.params;
  rest.reference
    .tickerNews({
      ticker: ticker,
      limit: limit,
    })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

app.get("/api/reference/tickerdetails/:ticker", async (req, res, next) => {
  const { ticker } = req.params;
  rest.reference
    .tickerDetails(ticker)
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`);
});
