import { useState } from "react";
import StockCard from "components/StockCard";
import TickerInput from "components/TickerInput";

export default function ChartGrid() {
  const [tickers, setTickers] = useState([]);

  // handles populating TickerCards
  // function handleKeyUp(e) {
  //     if (e.key === "Enter") {
  //       setTickers((prevTickers) => {
  //         // this prevents duplicates
  //         // could add something to popup a message that it's duplicate
  //         return prevTickers.includes(search)
  //           ? [...prevTickers]
  //           : [...prevTickers, search];
  //       });
  //       setSearch("");
  //     }
  //     if (e.key === "Escape") {
  //       console.log("you hit escape");
  //       setShowDropdown(false);
  //     }
  //   }

  const handleSubmit = () => {
    setTickers((prevTickers) => {
      // this prevents duplicates
      // could add something to popup a message that it's duplicate
      return prevTickers.includes(tickers)
        ? [...prevTickers]
        : [...prevTickers, tickers];
    });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <TickerInput handleSubmit={handleSubmit} />
      </div>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3 p-4">
        {tickers.map((ticker) => {
          return (
            <StockCard key={ticker} ticker={ticker} setTickers={setTickers} />
          );
        })}
      </div>
    </>
  );
}

// AAPL CAT MSFT GOOGL CMG MRNA MCD GE SBUX AMZN AMD BAC INTC
