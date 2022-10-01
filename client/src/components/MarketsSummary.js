import { useState, useEffect } from "react";
import MiniTickerCard from "components/MiniTickerCard";

// import useApiRequest from "../hooks/useApiRequest";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import axios from "axios";
import useApiRequest from "../hooks/useApiRequest";

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
    <div className="bg-white rounded-lg">
      <Tabs
        value="US"
        id="tabs"
        // className="border-blue-gray-50 grid min-h-[140px] w-full scroll-mt-48 overflow-x-scroll rounded-lg border bg-[#babdbf8f] p-2 lg:overflow-visible"
      >
        <TabsHeader className="pl-6 flex flex-row items-start">
          <Tab key={data.value} value={data.value} className="">
            {data.value}
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel
            key={data.value}
            value={data.value}
            className="flex flex-row overflow-x-scroll"
          >
            {tabPanelElements}
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
