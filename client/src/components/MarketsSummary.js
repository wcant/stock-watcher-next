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

  const [data, setData] = useState({
    value: "US",
    type: "stocks",
    tickers: {
      DIA: { price: null, change: null, percentChange: null },
      SPY: { price: null, change: null, percentChange: null },
      QQQ: { price: null, change: null, percentChange: null },
      IWM: { price: null, change: null, percentChange: null },
    },
  });

  useEffect(() => {
    async function getData(queryUrl) {
      try {
        const response = await axios.get(queryUrl);
        const { todaysChange, todaysChangePerc, min, ticker } =
          response.data.ticker;

        setData((prevData) => {
          return {
            ...prevData,
            tickers: {
              ...prevData.tickers,
              [ticker]: {
                price: min.c,
                change: todaysChange,
                percentChange: todaysChangePerc,
              },
            },
          };
        });
      } catch (error) {
        console.log(error);
      }
    }

    for (const key of Object.keys(data.tickers)) {
      const queryUrl = apiUrl + `/stocks/snapshot/${key}`;
      getData(queryUrl);
    }
  }, []);

  //   if (market.type === "crypto") {
  //     Object.entries(market.tickers).forEach((ticker) => {
  //       const tickSplit = ticker.split("-");
  //       const baseCurrency = tickSplit[0];
  //       const quoteCurrency = tickSplit[1];
  //       const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
  //       const queryUrl =
  //         apiUrl +
  //         `/crypto/open-close/${baseCurrency}/${quoteCurrency}/${yesterday}`;
  //       const resData = getData(queryUrl);
  //       market.tickers[ticker].price = resData["close"];
  //       market.tickers[ticker].price = resData["close"] - resData["open"];
  //       market.tickers[ticker].price =
  //         ((resData["close"] - resData["open"]) / resData["open"]) * 100;
  //     });
  //   }

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

  const tabPanelElements = createMiniTickerCards(data.tickers);

  return (
    <Tabs
      value="us"
      id="tabs"
      className="border-blue-gray-50 grid min-h-[140px] w-full scroll-mt-48 place-items-center overflow-x-scroll rounded-lg border bg-[#f8fafc] p-6 lg:overflow-visible"
    >
      <TabsHeader className="">
        <Tab
          key={data.value}
          value={data.value}
          className="text-left inline-block"
        >
          {data.value}
        </Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel key={data.value} value={data.value}>
          {tabPanelElements}
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}
