const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://stock-watcher-wcant.herokuapp.com/api"
    : "http://localhost:4000/api";
const DELAY_1_MINUTE = 60000;
const DELAY_15_MINUTES = 900000;

export { DELAY_1_MINUTE, DELAY_15_MINUTES, API_URL };
