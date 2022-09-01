const path = require("path");
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

const app = express();

// const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${REACT_APP_API_KEY}`;
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

app.get("/api", (req, res) => {
  res.json({ message: "hello from server" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`proxy listening on ${PORT}`);
});
