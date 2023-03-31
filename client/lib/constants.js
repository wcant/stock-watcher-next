const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://stock-watcher-wcant.herokuapp.com/api"
    : "http://localhost:4000/api";
const DELAY_1_MINUTE = 60000;
const DELAY_15_MINUTES = 900000;
const DELAY_30_MINUTES = 1800000;
const DELAY_1_HOUR = 3600000;

const placeholderTickers = [
  "AAPL",
  "MSFT",
  "AMZN",
  "META",
  "GM",
  "BAC",
  "GS",
  "GE",
  "TSLA",
  "JPM",
  "MRNA",
  "SQ",
  "BA",
  "F",
  "GOOGL",
  "INTC",
  "AMD",
  "CCL",
  "DAL",
  "WMT",
  "DIS",
  "MCD",
  "NFLX",
  "NVDA",
  "XOM",
  "MU",
  "T",
  "TGT",
  "HD",
  "BBY",
  "PFE",
  "PEP",
  "WM",
];

export {
  DELAY_1_MINUTE,
  DELAY_15_MINUTES,
  DELAY_30_MINUTES,
  DELAY_1_HOUR,
  API_URL,
  placeholderTickers,
};
