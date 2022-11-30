import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { restClient } from "@polygon.io/client-js";

import { open } from "node:fs/promises";

const snpTickers = [];
(async function myFileReader() {
  const file = await open("./constituents_symbols.txt");
  for await (const line of file.readLines()) {
    snpTickers.push(line);
  }
})();

const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
const rest = restClient(POLYGON_API_KEY);
const app = express();

const PORT = process.env.PORT || 4005;

app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`);
});

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "stock_demo",
// });

// connection.connect();

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// connection.end();
