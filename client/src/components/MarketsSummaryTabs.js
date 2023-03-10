import { useState, useEffect } from "react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "components/Tabs";
import MiniTickerCard from "components/MiniTickerCard";

import axios from "axios";
import { DELAY_1_MINUTE, API_URL } from "utils/constants";

function createMiniTickerCards(tickers) {
  const tabPanels = [];
  for (const [key, value] of Object.entries(tickers)) {
    tabPanels.push(
      <MiniTickerCard
        key={key}
        ticker={key}
        price={value.price}
        change={value.change}
        percentChange={value.percentChange}
      />
    );
  }
  return tabPanels;
}

export default function MarketsSummaryTabs(props) {
  // US data is the only one that's live at the moment due to API limitations
  const [usData, setUsData] = useState({
    label: "US",
    type: "stocks",
    tickers: {
      DIA: { price: null, change: null, percentChange: null },
      SPY: { price: null, change: null, percentChange: null },
      QQQ: { price: null, change: null, percentChange: null },
      IWM: { price: null, change: null, percentChange: null },
    },
  });

  // Using static data here for demo purposes, API has too many restrictions
  const [euroData, setEuroData] = useState({
    label: "Europe",
    type: "stocks",
    tickers: {
      DAX: { price: 12114.36, change: 138.81, percentChange: 1.16 },
      FTSE100: { price: 6893.81, change: 12.22, percentChange: 0.18 },
      CAC40: { price: 5762.34, change: 85.47, percentChange: 1.51 },
      IBEX35: { price: 7366.8, change: 66.7, percentChange: 0.91 },
      STOXX50: { price: 3318.2, change: 39.16, percentChange: 1.19 },
    },
  });
  const [asiaData, setAsiaData] = useState({
    label: "Asia",
    type: "stocks",
    tickers: {
      Nikkei225: { price: 25937.21, change: -484.81, percentChange: -1.83 },
      SSE: { price: 3024.39, change: -16.81, percentChange: -0.55 },
      HSI: { price: 17222.83, change: 56.96, percentChange: 0.33 },
      SENSEX: { price: 57426.92, change: 1016.96, percentChange: 1.8 },
      NIFTY50: { price: 17094.35, change: 276.25, percentChange: 1.64 },
    },
  });
  const [forexData, setForexData] = useState({
    label: "Currencies",
    type: "forex",
    tickers: {
      EURUSD: { price: 0.9802, change: null, percentChange: -1.83 },
      USDJPY: { price: 144.739, change: null, percentChange: -0.55 },
      GBPUSD: { price: 1.115, change: null, percentChange: 0.33 },
      USDCAD: { price: 1.3833, change: null, percentChange: 1.8 },
      AUDUSD: { price: 0.6399, change: null, percentChange: 1.64 },
    },
  });
  const [cryptoData, setCryptoData] = useState({
    label: "Crypto",
    type: "crypto",
    tickers: {
      BTCUSD: { price: 19301.6, change: -150.6, percentChange: -0.77 },
      ETHUSD: { price: 1313.8, change: -14.87, percentChange: -1.12 },
      DOGEUSD: { price: 0.0607, change: -0.00096, percentChange: -1.56 },
    },
  });

  useEffect(() => {
    async function getUsData() {
      const endpoints = Object.keys(usData.tickers).map((ticker) => {
        return API_URL + `/stocks/snapshot/${ticker}`;
      });

      Promise.all(
        endpoints.map((endpoint) => {
          return axios.get(endpoint).catch((error) => console.log(error));
        })
      )
        .then((data) => {
          const newTickers = { ...usData.tickers };
          data.forEach((result) => {
            const { ticker, todaysChange, todaysChangePerc, min } =
              result.data.ticker;
            newTickers[ticker].price = min.c.toFixed(2);
            newTickers[ticker].change = todaysChange.toFixed(2);
            newTickers[ticker].percentChange = todaysChangePerc.toFixed(2);
          });
          setUsData((prevData) => {
            return {
              ...prevData,
              tickers: newTickers,
            };
          });
        })
        .catch((error) => console.log(error));
    }

    const interval = setInterval(() => {
      getUsData();
    }, DELAY_1_MINUTE);

    getUsData();

    return () => clearInterval(interval);
  }, []);

  return (
    <Tabs label="US">
      <TabsHeader>
        {[usData, euroData, asiaData, forexData, cryptoData].map((market) => {
          return (
            <Tab key={market.label} label={market.label}>
              {market.label}
            </Tab>
          );
        })}
      </TabsHeader>
      <TabsBody>
        {[usData, euroData, asiaData, forexData, cryptoData].map((market) => {
          return (
            <TabPanel key={market.label} label={market.label}>
              {createMiniTickerCards(market.tickers)}
            </TabPanel>
          );
        })}
      </TabsBody>
    </Tabs>
  );
}
