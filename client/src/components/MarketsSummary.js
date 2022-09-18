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

export default function MarketsSummary(props) {
  const { apiUrl } = props;

  const [data, setData] = useState([
    {
      value: "US",
      type: "stocks",
      tickers: {
        DIA: { price: null, change: null, percentChange: null },
        SPY: { price: null, change: null, percentChange: null },
        QQQ: { price: null, change: null, percentChange: null },
        IWM: { price: null, change: null, percentChange: null },
      },
    },
    {
      value: "Crypto",
      type: "crypto",
      tickers: {
        "X:BTCUSD": { price: null, change: null, percentChange: null },
        "X:ETHUSD": { price: null, change: null, percentChange: null },
        "X:LTCUSD": { price: null, change: null, percentChange: null },
        "X:DOGEUSD": { price: null, change: null, percentChange: null },
      },
    },
  ]);

  async function getData(queryUrl) {
    try {
      const response = await axios.get(queryUrl);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const newData = [...data];
    Object.entries(newData.tickers).forEach((ticker) => {
      const queryUrl = apiUrl + `/snapshot/${ticker}`;
      const resData = getData(queryUrl);
      console.log(resData);
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
        {data.map(({ value, tickers }) => (
          <TabPanel key={value} value={value}>
            {Object.entries(tickers).map(([key, value]) => (
              <MiniTickerCard
                key={key}
                ticker={key}
                price={value.price}
                change={value.change}
                percentChange={value.percentChange}
              />
            ))}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
{
  /* <div>
<div role="tablist" tabindex="0">
  <div role="tab" tabindex="0" data-label="us" aria-selected="true">
    US
  </div>
  <div role="tab" tabindex="0" data-label="europe" aria-selected="false">
    Europe
  </div>
  <div role="tab" tabindex="0" data-label="asia" aria-selected="false">
    Asia
  </div>
  <div role="tab" tabindex="0" data-label="crypto" aria-selected="false">
    Crypto
  </div>
</div>
<div></div>
</div> */
}
