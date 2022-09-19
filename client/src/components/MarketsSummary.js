import { useState, useEffect } from "react";
import MiniTickerCard from "./MiniTickerCard";
import axios from "axios";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import moment from "moment";

export default function MarketsSummary(props) {
  const { apiUrl } = props;

  const [data, setData] = useState([
    {
      value: "US",
      type: "stocks",
      tickers: ["DIA", "SPY", "QQQ", "IWM"],
    },
    {
      value: "Crypto",
      type: "crypto",
      tickers: ["BTC-USD", "ETH-USD", "LTC-USD", "DOGE-USD"],
    },
  ]);

  useEffect(() => {
    const newData = [...data].map((market) => {
      if (market.type === "stocks") {
        for (const [key, value] of Object.entries(market.tickers)) {
          const queryUrl = apiUrl + `/stocks/snapshot/${key}`;
          const resData = getData(queryUrl);
          console.log(resData);
          market.tickers[key].price = resData["ticker"]["lastQuote"];
          market.tickers[key].price = resData["ticker"]["todaysChange"];
          market.tickers[key].price = resData["ticker"]["todaysChangePerc"];
        }
      }
      if (market.type === "crypto") {
        Object.entries(market.tickers).forEach((ticker) => {
          const tickSplit = ticker.split("-");
          const baseCurrency = tickSplit[0];
          const quoteCurrency = tickSplit[1];
          const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
          const queryUrl =
            apiUrl +
            `/crypto/open-close/${baseCurrency}/${quoteCurrency}/${yesterday}`;
          const resData = getData(queryUrl);
          market.tickers[ticker].price = resData["close"];
          market.tickers[ticker].price = resData["close"] - resData["open"];
          market.tickers[ticker].price =
            ((resData["close"] - resData["open"]) / resData["open"]) * 100;
        });
      }
      console.log(market);
      return market;
    });
  }, []);

  useEffect(() => {
    // const newData =
  }, []);

  return (
    <Tabs value="us" className="">
      <TabsHeader className="">
        {data.map(({ value }) => (
          <Tab key={value} value={value} className="">
            {value}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ type, value, tickers }) => (
          <TabPanel key={value} value={value}>
            {tickers.map((ticker) => (
              <MiniTickerCard key={ticker} ticker={ticker} type={type} />
            ))}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
